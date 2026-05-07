import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const notesDir = path.join(repoRoot, "_notes");
const notesDataPath = path.join(repoRoot, "notes_data.json");
const notesInlineJsonPath = path.join(repoRoot, "notes_inline.json");
const notesInlineJsPath = path.join(repoRoot, "notes_inline.js");

function parseArgs(argv) {
  const args = { _: [] };
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (!arg.startsWith("--")) {
      args._.push(arg);
      continue;
    }
    const key = arg.slice(2);
    const next = argv[i + 1];
    if (!next || next.startsWith("--")) {
      args[key] = true;
    } else {
      args[key] = next;
      i += 1;
    }
  }
  return args;
}

function today() {
  return new Date().toISOString().slice(0, 10);
}

function dateFromFileName(fileName) {
  return fileName.match(/^(\d{4}-\d{2}-\d{2})/)?.[1] ?? today();
}

function titleFromFileName(fileName) {
  const stem = fileName.replace(/\.md$/i, "");
  return stem.replace(/^\d{4}-\d{2}-\d{2}\s*-?\s*/, "").trim() || stem;
}

function splitTags(value) {
  if (Array.isArray(value)) return value;
  if (!value || value === true) return [];
  return String(value)
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);
}

function escapeYamlString(value) {
  return String(value).replaceAll("\\", "\\\\").replaceAll('"', '\\"');
}

function buildFrontMatter({ title, date, tags }) {
  const tagLines = tags.length > 0
    ? tags.map((tag) => `    - ${tag}`).join("\n")
    : "    - ";

  return [
    "---",
    "layout:     post",
    `title:      "${escapeYamlString(title)}"`,
    'subtitle:   ""',
    `date:       ${date}`,
    'author:     "ShawnD"',
    'header-img: "img/post-bg-rwd.jpg"',
    "catalog:     false",
    "tags:",
    tagLines,
    "---",
    "",
  ].join("\n");
}

function parseFrontMatter(markdown) {
  const normalized = markdown.replace(/^\uFEFF/, "").trimStart();
  if (!normalized.startsWith("---")) {
    return { hasFrontMatter: false, title: null, tags: [] };
  }

  const end = normalized.indexOf("\n---", 3);
  if (end === -1) {
    return { hasFrontMatter: false, title: null, tags: [] };
  }

  const yaml = normalized.slice(3, end).split(/\r?\n/);
  let title = null;
  const tags = [];
  let inTags = false;

  for (const line of yaml) {
    const titleMatch = line.match(/^\s*title\s*:\s*(.+?)\s*$/);
    if (titleMatch) {
      title = titleMatch[1].trim().replace(/^["']|["']$/g, "");
      inTags = false;
      continue;
    }

    if (/^\s*tags\s*:\s*$/.test(line)) {
      inTags = true;
      continue;
    }

    if (inTags) {
      const tagMatch = line.match(/^\s*-\s*(.*?)\s*$/);
      if (tagMatch) {
        const tag = tagMatch[1].trim().replace(/^["']|["']$/g, "");
        if (tag) tags.push(tag);
        continue;
      }
      if (/^\S/.test(line)) inTags = false;
    }
  }

  return { hasFrontMatter: true, title, tags };
}

function addFrontMatterIfMissing(filePath, markdown, title, date, tags) {
  const frontMatter = buildFrontMatter({ title, date, tags });
  const body = markdown.replace(/^\uFEFF/, "").trimStart();
  fs.writeFileSync(filePath, frontMatter + body, "utf8");
}

function syncNotes({ fixFrontMatter = false } = {}) {
  const entries = [];
  const files = fs.readdirSync(notesDir)
    .filter((fileName) => fileName.toLowerCase().endsWith(".md"))
    .sort();

  for (const fileName of files) {
    if (fileName === "test.md") continue;

    const filePath = path.join(notesDir, fileName);
    const markdown = fs.readFileSync(filePath, "utf8");
    const frontMatter = parseFrontMatter(markdown);
    const date = dateFromFileName(fileName);
    const title = frontMatter.title || titleFromFileName(fileName);
    const tags = frontMatter.tags;

    if (!frontMatter.hasFrontMatter && fixFrontMatter) {
      addFrontMatterIfMissing(filePath, markdown, title, date, tags);
    }

    entries.push({
      title,
      path: `_notes/${fileName}`,
      tags,
    });
  }

  entries.sort((a, b) => b.path.localeCompare(a.path));
  const json = `${JSON.stringify(entries)}\n`;
  fs.writeFileSync(notesDataPath, json, "utf8");
  fs.writeFileSync(notesInlineJsonPath, json, "utf8");
  fs.writeFileSync(notesInlineJsPath, `window.NOTES_DATA = ${JSON.stringify(entries)};\n`, "utf8");

  console.log(`Updated notes_data.json, notes_inline.json, and notes_inline.js with ${entries.length} notes.`);
}

function createNote(args) {
  const title = args.title || args.t || args._.join(" ").trim();
  if (!title) {
    throw new Error('Missing title. Example: npm run note:new -- --title "【Geek之路】Windows开发环境配置" --tags Geek,Windows');
  }

  const date = args.date || args.d || today();
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    throw new Error("Date must use yyyy-mm-dd format.");
  }

  const tags = splitTags(args.tags || args.tag);
  const fileName = `${date}-${title}.md`;
  const filePath = path.join(notesDir, fileName);

  if (fs.existsSync(filePath)) {
    throw new Error(`Note already exists: ${path.relative(repoRoot, filePath)}`);
  }

  const content = `${buildFrontMatter({ title, date, tags })}# ${title}\n`;
  fs.writeFileSync(filePath, content, "utf8");
  syncNotes();
  console.log(`Created ${path.relative(repoRoot, filePath)}`);
}

function watchNotes() {
  let timer = null;
  const run = () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      try {
        syncNotes({ fixFrontMatter: true });
      } catch (error) {
        console.error(error.message);
      }
    }, 300);
  };

  syncNotes({ fixFrontMatter: true });
  fs.watch(notesDir, { persistent: true }, run);
  console.log("Watching _notes. Press Ctrl+C to stop.");
}

function main() {
  const [command = "sync", ...rest] = process.argv.slice(2);
  const args = parseArgs(rest);

  if (command === "new") {
    createNote(args);
  } else if (command === "sync") {
    syncNotes({ fixFrontMatter: Boolean(args["fix-front-matter"]) });
  } else if (command === "watch") {
    watchNotes();
  } else {
    throw new Error(`Unknown command: ${command}`);
  }
}

try {
  main();
} catch (error) {
  console.error(error.message);
  process.exit(1);
}
