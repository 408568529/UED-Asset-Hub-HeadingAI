# 比赛源码来源及验证边界

本目录从当前主项目工作区独立生成，主项目未被改写。精确来源与运行参考编号见 competition-source.json。公开源码与 Windows 构建输入以本目录最终发布的 Git Commit 和 SOURCE-MANIFEST.json 为准。

## 保留与新增

- 主项目 HEAD 为 892b49d9448417a55d1e4509282b48a5ce2d179f；此前的五项访客默认配置修改已在该提交中，完整保留。
- 当前工作树中 Windows 启动、PowerShell 进程调用、空启动目录 ACL 初始化、完整性检查进度和交付目录检查等必要修补保留。
- 独立副本合入已在 Windows 验证的 GenUI 单条件补丁，并扩展现有定向回归。签名校验器、DSH 核心和业务模块未因此被重写。
- 新增来源清单、跨平台字节保留规则和第三方声明。真实 DATA、会话、密钥、个人代理配置、构建缓存和原验收记录不属于源文件。

## 3047 的关系

3047 是独立运行产物。Release/runtime reference、Hub build reference、Build ID 与主项目 Git Commit 属于不同编号体系，不能相互代替。当前恢复分支的历史提交记录了与 3047 的来源关系；本轮仍须依据实际 manifest、模块哈希和只读 HTTP 状态进行核对，不把历史验证直接升级为当前全部功能通过。

## 验证状态

2026-10-24：独立目录使用 Node 22.23.2 / npm 10.9.8 干净安装（npm ci --ignore-scripts）、Next.js 生产构建、local-distribution-security、competition-first-run、competition-center-startup-ui、agent-genui-boundary 六项均通过。package-lock.json 未改变。3047 的首页、知识库、微规范、Haldur Skill、Agent、测试环境只读 HTTP 检查均返回 200；该检查不代表真实问答或按钮交互已在新版本完成。完整 Windows 交付、真实模型问答、GenUI 交互、停止重启和干净机器边界分别报告，不以 npm build 成功替代这些项目。

## 公开与交付

主项目不切换分支，不上传其 Git 历史。发布目标仅为 408568529/UED-Asset-Hub-HeadingAI。发布前必须核对可见性、内容、敏感信息及文件清单。Windows 交付从发布 Commit 的精确源文件字节构建，保留必要许可证和二进制来源回执。
