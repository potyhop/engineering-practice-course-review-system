# Git 仓库初始化与提交指引

> 目标：完成至少 3 次提交，推送到 GitHub 组织仓库，便于老师核查

## 前置条件

1. Git 已安装（新终端运行 `git --version` 确认）
2. GitHub 账号已登录
3. 在 GitHub 组织下已创建空仓库（例如 `engineering-practice/course-review-system`）

---

## 步骤 1：配置 Git 身份（首次安装后必做）

```powershell
# 替换成你自己的名字和邮箱
git config --global user.name "你的姓名"
git config --global user.email "你的邮箱@example.com"

# 检查配置
git config --global --list
```

## 步骤 2：初始化本地仓库

```powershell
cd C:\Users\pc\Documents\Trae-CN\temp_20261024_01

# 初始化 git 仓库
git init

# 创建 .gitignore（忽略 node_modules、临时文件）
```

创建 `.gitignore` 文件，内容：
```
node_modules/
*.tmp
.DS_Store
Thumbs.db
```

## 步骤 3：第一次提交 — 基础文档（里程碑 1）

```powershell
git add README.md .gitignore
git commit -m "feat: 初始化项目，添加 README 和 gitignore"
```

## 步骤 4：第二次提交 — 核心原型（里程碑 2）

```powershell
git add 选课参考信息模块-高保真原型.html
git commit -m "feat: 添加高保真可点击原型（4 角色 + 评价全生命周期）"
```

## 步骤 5：第三次提交 — PRD + 打包 + 演示脚本（里程碑 3）

```powershell
git add 课程详情与评价模块PRD.html course-review-src.zip 演示脚本.md 口播视频脚本.md
git commit -m "docs: 添加 PRD、源码包、演示脚本和口播脚本"
```

## 步骤 6：（可选）第四次提交 — PPT + 技能脚本

```powershell
git add gen_ppt.js package.json package-lock.json 课程详情与评价参考系统-作业PPT.pptx
git commit -m "docs: 添加答辩 PPT 和生成脚本"
```

## 步骤 7：推送到 GitHub

```powershell
# 替换成你的仓库地址（SSH 或 HTTPS 都行）
git remote add origin https://github.com/你的组织/你的仓库名.git

# 首次推送，设置上游分支
git push -u origin master
# 或新版本 git 用 main：
# git branch -M main
# git push -u origin main
```

## 步骤 8：验证提交历史

```powershell
# 查看提交历史（应该能看到至少 3 条）
git log --oneline --graph --all

# 示例输出：
# a1b2c3d docs: 添加答辩 PPT 和生成脚本
# d4e5f6g docs: 添加 PRD、源码包、演示脚本和口播脚本
# h7i8j9k feat: 添加高保真可点击原型（4 角色 + 评价全生命周期）
# l0m1n2o feat: 初始化项目，添加 README 和 gitignore
```

## 常见问题

**Q: git push 时要输密码？**
A: GitHub 已不支持密码推送，用 Personal Access Token 或 SSH key。推荐用 GitHub Desktop 登录后自动处理。

**Q: 提示 "remote origin already exists"？**
A: 说明之前加过 remote，先删再加：`git remote remove origin`

**Q: push 到 master 还是 main？**
A: 新仓库默认 main，旧仓库可能 master。`git branch` 看当前分支名，push 时对应就行。
