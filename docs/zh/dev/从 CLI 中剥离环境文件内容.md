---
category: dev
author: Anda Toshiki
tags:
  - dev
  - tutorial
  - cli
  - regex
status: published
date: '2025-10-04 08:00:00'
catalog:
  - zh/dev
urlname: stripping-env-file-content-from-cli
title: 从 CLI 中剥离环境文件内容
updated: '2025-10-06 00:53:00'
---

# 从 CLI 中剥离环境文件内容

```bash
sed -E 's/^([A-Za-z_][A-Za-z0-9_]*)=.*/\\1=/; /^#|^$/!s/ //g' .env | pbcopy
```

## 说明

- `sed -E`→ 启用扩展 regex。
- ^`([A-Za-z_][A-Za-z0-9_]*)=.*`→ 匹配变量赋值；仅用变量名替换`（\1=`）。
- `^#|^$`→ 注释或空行 → 保持原样。
- `pbcopy`→ 将最终输出导入 MacOS 剪贴板。
