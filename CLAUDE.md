# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

Jekyll static site deployed to GitHub Pages at `ShawnDong98.github.io`. Remote theme `pages-themes/minimal@v0.2.0`. Two collections: `notes` (digital garden, ~720 articles) and `intro` (bilingual CV).

## Common commands

| Command | Purpose |
|---------|---------|
| `npm run note:new -- --title "Title" --tags Tag1,Tag2` | Create a new note with front matter, update indexes |
| `npm run notes:fix` | Scan `_notes/`, add front matter to any `.md` lacking it, regenerate index files |
| `npm run notes:watch` | Watch `_notes/` for changes, auto-fix front matter + regenerate indexes |
| `npm run notes:sync` | Regenerate `notes_data.json` / `notes_inline.json` / `notes_inline.js` |

No build/lint/test commands — this is a content repo. The site is built and deployed by `.github/workflows/jekyll-gh-pages.yml` on every push to `main`. Set `future: true` in the workflow `with:` block if articles dated near the current date go missing.

## Architecture

**Collections (`_config.yml` lines 13-20):**
- `notes` → `_notes/*.md`, output at `/notes/:title/`, default layout `note`
- `intro` → `_intro/*.md`, output at `/intro/:title/`, default layout `cv`

**Layout chain:**
- Notes: `post` → `note` → `default`
- CV: `cv` → `default`
- Index: `notes_index` → `default`

**`default.html`** (lines 1-267) contains ALL CSS inline — there is no separate stylesheet. The site has no JavaScript build step, no bundler, no framework. All styling is defined in `<style>` tags in `default.html`.

**Note lifecycle:**
1. Create `.md` in `_notes/` with filename `YYYY-MM-DD-Title.md`
2. File must have Jekyll front matter starting on **line 1, column 1** (see Critical Pitfalls)
3. Run `npm run notes:fix` to regenerate the three index files:
   - `notes_data.json` — JSON array of `{title, path, tags}`
   - `notes_inline.json` — duplicate of above
   - `notes_inline.js` — `window.NOTES_DATA = [...]` for client-side consumption

**Note listing (`notes/index.md` + `_layouts/notes_index.html`):**
- Server-side: iterates `site.notes`, sorts by `path` reverse (newest date-prefixed files first), renders list items with `data-tags` attributes
- Client-side: JS builds a tag cloud from `data-tags`, enables tag-based filtering

**CV layout (`_layouts/cv.html`):**
- Language switch between `/intro/cv-en/` and `/intro/cv-zh/`
- Splits content on `<hr>` — first segment goes into a `cv-header-grid` (info + photo), remaining segments into the body

## `scripts/notes.mjs` design

Pure Node.js script (zero dependencies). Key functions:
- `buildFrontMatter({title, date, tags})` → generates YAML front matter string
- `parseFrontMatter(markdown)` → reads title and tags from existing YAML; `hasFrontMatter: false` if `---` not at position 0
- `syncNotes({fixFrontMatter})` → iterates `_notes/*.md`, optionally patches missing front matter, writes the three index files
- `createNote(args)` → creates `.md` with correct filename and front matter, then updates indexes
- `watchNotes()` → `fs.watch` on `_notes/` with 300ms debounce

## Critical pitfalls

**Front matter must start at line 1, column 1.** Jekyll's `YAML_FRONT_MATTER_REGEXP` uses `\A` (absolute start of string). A leading blank line before `---` causes the regex to fail silently — the file is treated as having no front matter and will not render. This is the most common reason an article doesn't appear on the site.

**Filename date prefix matters.** Files named `YYYY-MM-DD-title.md` have the date stripped from the Jekyll slug. The permalink `:title` becomes the slug (e.g., `2026-04-01-【Geek之路】Windows配置.md` → `/notes/Geek之路Windows配置/`). Jekyll strips `【】` from slugs.

**Chinese characters in filenames are fine** — Jekyll URL-encodes them in the output path. The GitHub Actions build runs on Ubuntu and handles UTF-8 filenames correctly.

**`catalog: false`** in front matter is a custom field; the value `flase` was a historical typo. Use `false`.


# 重要的事情说三遍

记住，不要修改 _notes 下文件的内容，你无权限修改其下内容！！！ 

记住，不要修改 _notes 下文件的内容，你无权限修改其下内容！！！ 

记住，不要修改 _notes 下文件的内容，你无权限修改其下内容！！！ 