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
  - dev
urlname: stripping-env-file-content-from-cli
title: Stripping Environment File Content from the CLI
updated: '2025-10-04 22:59:00'
---

# Stripping Environment File Content from the CLI

```bash
sed -E 's/^([A-Za-z_][A-Za-z0-9_]*)=.*/\\1=/; /^#|^$/!s/ //g' .env | pbcopy
```

## Explanation

- `sed -E` → enable extended regex.
- `^([A-Za-z_][A-Za-z0-9_]*)=.*` → matches variable assignments; replaces them with just the variable name (`\\1=`).
- `^#|^$` → comments or empty lines → left as-is.
- `pbcopy` → pipes the final output to your macOS clipboard.
