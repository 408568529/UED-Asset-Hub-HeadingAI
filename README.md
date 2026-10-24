# UED Asset Hub · 比赛源码

设计资产与知识协作平台，包含知识库、微规范、Haldur Skill 工作台、Agent 与 GenUI 集成。

本仓库分发开发源码，不包含运行 DATA、真实会话、模型密钥或 Windows 已安装运行目录。Windows 完整交付文件夹由此源码另行构建，不等同于源码目录。

## 安装与构建

固定依赖以 package-lock.json 为准。已核验的交付运行工具为 Node 22.23.2 / npm 10.9.8；Next.js 锁定版本为 15.5.27。请使用受支持的原生平台版本。

```bash
npm ci
npm run build
```

前端开发可复制 .env.example 为 .env.local，再设置本环境的管理员凭据和独立存储目录，运行 npm run dev。该命令只启动前端，不能替代完整 Agent 运行验收。不要将个人 .env 文件或已有 DATA 提交到 Git。

完整 Hub / Agent 运行由 npm run start:host 管理，需要按固定契约准备 DSH 0.1.1-rc.2、GenUI 0.15.1 和各自独立运行目录，见 [固定依赖](docs/v2.5/DEPENDENCIES.md)、[构建资源](docs/v2.5/BUILD-RESOURCES.md) 与 [运行说明](docs/v2.5/README.md)。模型密钥由管理员在隔离实例设置页输入，不随源码或 Windows 程序交付。

三个 Windows 原生辅助程序的 C++ 源码和构建脚本均保留。开发者从源码编译它们需要合适的独立 Windows 工具链；最终 Windows 用户使用已构建完整文件夹，无需因辅助程序安装 MSVC。来源和兼容性不能确认的二进制不得纳入交付。

## 验证与来源

```bash
node scripts/verify-local-distribution-security.mjs
node scripts/verify-competition-first-run.mjs
node scripts/verify-competition-center-startup-ui.mjs
node scripts/verify-agent-genui-boundary.mjs
```

源码来源、3047 运行参考与验证范围见 [比赛来源说明](COMPETITION-SOURCE.md)。历史机器验收日志和个人操作记录不在公开源码中；源码检查通过不代表干净 Windows 首次安装已经通过。

## 许可与第三方组件

见 [第三方声明](THIRD_PARTY_NOTICES.md)。项目原创代码尚无预先存在的统一开源许可证；公开供评审浏览、克隆和核验，不将其默认为 MIT。第三方组件继续遵循各自许可证。
