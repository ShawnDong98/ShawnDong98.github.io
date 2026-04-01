

# wsl 安装 anaconda

在 WSL (Windows Subsystem for Linux) 中安装 Anaconda 是一个非常聪明的选择，这能让你在享受 Linux 开发环境的同时，不干扰 Windows 原生的系统路径。

由于 WSL 通常没有图形界面，我们直接通过 **终端命令行** 来完成安装。以下是详细步骤：

---

### 1. 下载 Anaconda 安装脚本

首先，打开你的 WSL 终端（如 Ubuntu）。前往 [Anaconda 官网](https://www.google.com/search?q=https://www.anaconda.com/download/success) 获取最新的 Linux 下载链接，或者直接使用 `wget` 命令下载。

Bash

```
# 进入你的用户主目录
cd ~

# 使用 wget 下载安装包 (这里以 2024.02 版本为例，建议去官网复制最新链接)
wget https://repo.anaconda.com/archive/Anaconda3-2024.02-1-Linux-x86_64.sh
```

### 2. 运行安装程序

下载完成后，运行该 `.sh` 脚本：

Bash

```
bash Anaconda3-2024.02-1-Linux-x86_64.sh
```

**安装过程中的注意事项：**

- **阅读协议：** 按 **Enter** 滚动阅读，直到提示是否接受协议。
    
- **接受协议：** 输入 `yes`。
    
- **确认路径：** 默认路径通常是 `/home/你的用户名/anaconda3`，直接按 **Enter** 确认即可。
    
- **初始化 Conda：** 安装快结束时会问 "Do you wish to update your shell profile to automatically initialize conda?"，务必输入 **`yes`**。这样它会自动帮你配置环境变量。
    

---

### 3. 激活配置

安装完成后，当前的终端窗口还识别不了 `conda` 命令。你需要刷新一下配置文件：

Bash

```
source ~/.bashrc
```

如果你的终端提示符前面出现了 `(base)` 字样，恭喜你，安装成功了！

---

### 4. 验证安装

你可以输入以下命令检查版本：

Bash

```
conda --version
```

### 5. (进阶建议) 安装完后的第一件事

为了让下载速度更快，建议配置一下国内的镜像源（如清华源）：

Bash

```
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/free/
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/main/
conda config --set show_channel_urls yes
```


# VSCode 切换终端为 wsl 


### 通过界面快速选择（推荐）

这是最直观的方法，不需要手动编辑代码：

1. 在 VS Code 中按下 `Ctrl +` (反引号) 打开终端。
    
2. 在终端面板的右上角，点击 **+** 号旁边的**下拉箭头**（向下的小 V 型图标）。
    
3. 在弹出的菜单中选择 **Select Default Profile**（选择默认配置文件）。
    
4. 在窗口上方弹出的列表中，点击选择 **WSL** (通常显示为 `WSL (Ubuntu)` 或你安装的发行版名称)。


# 微软应用商店挂代理

### 使用“解除 UWP 隔离”工具（最推荐）

大多数现代代理客户端（如 Clash, V2RayN, Shadowsocks 等）都自带一个名为 **"EnableLoopback Exemption"** 的工具。

1. 打开你的代理软件（例如 **v2rayN** 或 **Clash Verge**）。
    
2. 找到 **“设置”** 或 **“工具”** 菜单。
    
3. 寻找 **“UWP 应用循环回退限制解除”** (Enable Loopback) 按钮。
    
4. 在弹出的列表中勾选 **“Microsoft Store”**（或者直接点击“全选/Exempt All”）。
    
5. 点击 **“保存修改/Save Changes”**。
    
6. 再次尝试在 Microsoft Store 或 CMD 中安装。


# Windows 安装 GEMINI CLI


### 1. 前置准备：安装 Node.js

Gemini CLI 是基于 Node.js 开发的，因此你需要先确保电脑上有运行环境。

1. 访问 [Node.js 官网](https://nodejs.org/)。
    
2. 下载并安装 **LTS（长期支持）** 版本。
    
3. 安装完成后，打开 **命令提示符 (CMD)** 或 **PowerShell**，输入以下命令检查是否成功：
    
    Bash
    
    ```
    node -v
    npm -v
    ```
    
    _确保 Node 版本在 18.0 或以上。_


### 2. 检查环境变量 (Path)

如果重启终端无效，说明安装程序没能成功修改系统的“路标”。我们需要手动告诉 Windows 哪里可以找到 `node`：

1. 按下键盘上的 **Win + S**，输入 `环境变量`，选择 **“编辑系统环境变量”**。
    
2. 在弹出的窗口底部点击 **“环境变量 (N)...”**。
    
3. 在“用户变量”或“系统变量”列表中找到名为 **Path** 的变量，双击它。
    
4. 检查列表中是否有类似 `C:\Program Files\nodejs\` 的路径。
    
    - **如果没有**：点击“新建”，手动输入 `C:\Program Files\nodejs\`（这是默认安装路径）。
        
    - **顺便检查**：确保也有 `%AppData%\npm`（这是为了让你安装的 gemini cli 能跑起来）。
        
5. 一路点击“确定”保存。


### 3. 安装 Gemini CLI


全局安装（方便长期使用）

如果你想随时随地输入 `gemini` 就能用，请运行：

Bash

```
npm install -g @google/gemini-cli
```

安装完成后，在终端输入 `gemini` 即可启动。

### Bug

如果登录认证出现以下报错，给cmd添加代理即可

**错误**：身份验证未成功完成。以下产品**尚未**获得访问您账号的授权：

- [Gemini Code Assist](https://developers.google.com/gemini-code-assist/docs/overview?hl=zh-cn)
- [使用 Gemini Code Assist 的 Cloud Code](https://cloud.google.com/code/docs/shell/write-code-gemini?hl=zh-cn)
- [Gemini CLI](https://github.com/google-gemini/gemini-cli/blob/main/README.md)
- [Antigravity](https://antigravity.google/docs/get-started?hl=zh-cn)

# Windows 安装类似 ZSH 的终端

系统自带的 PowerShell（版本 5.1）及其内置的 PSReadLine 模块版本实在太老了，老到甚至不支持现代的“预测（Prediction）”参数。

在 Windows 10/11 的原生 PowerShell 5.1 上折腾这个非常痛苦，因为它的包管理器经常会因为各种证书和路径问题导致升级失败。

### 终极解决方案：安装 PowerShell 7 (Core)

这是目前所有 Windows 开发者的标配。**PowerShell 7** 是独立于系统自带版本运行的，它**原生内置**了最新版的 PSReadLine，你想要的所有 zsh 功能（灰色虚影、语法高亮、智能补全）在里面都是**开箱即用**的。

请在当前的窗口中输入以下命令：

PowerShell

```
winget install Microsoft.PowerShell
```

---

### 安装后的操作：

1. **打开新版终端**：安装完成后，在开始菜单搜索 **"PowerShell 7"**（图标是黑色的，不是蓝色的）并打开。
    
2. **验证预测功能**：在新窗口中直接输入：
    
    PowerShell
    
    ```
    Set-PSReadLineOption -PredictionSource History
    ```
    
    
3. **配置一次，永久生效**：
    
    在 PowerShell 7 中输入 `notepad $PROFILE`，你会发现这是一个全新的空白配置文件。把之前的配置粘进去：
    
    PowerShell
    
    ```
    Import-Module PSReadLine
    Set-PSReadLineOption -PredictionSource History
    Set-PSReadLineOption -PredictionViewStyle InlineView
    Set-PSReadLineKeyHandler -Key Tab -Function MenuComplete
    # 如果你之前装了图标，也可以加上
    Import-Module Terminal-Icons
    ```
    

---

### 为什么推荐这样做？

- **互不干扰**：PowerShell 7 和系统自带的蓝底 PowerShell 5.1 是共存的，不会弄坏你的系统设置。
    
- **性能更强**：它是基于 .NET 6/8 构建的，运行速度比旧版快得多。
    
- **兼容性**：它完美支持 `-AllowPrerelease` 和各种现代 Shell 插件，就像 macOS 上的 zsh 一样顺滑。
    

**一句话建议：** 别在旧版的蓝窗（5.1）里浪费时间修补了，直接上 **PowerShell 7 (黑窗)**，那才是真正的 Windows 终端终点。