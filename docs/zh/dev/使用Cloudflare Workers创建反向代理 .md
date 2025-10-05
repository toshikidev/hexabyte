---
category: dev
author: Anda Toshiki
tags:
  - cloudflare
  - cf
  - dev
  - tutorial
status: published
date: '2025-10-04 08:00:00'
catalog:
  - zh/dev
urlname: cloudflare-workers-reverse-proxy
title: '使用Cloudflare Workers创建反向代理 '
updated: '2025-10-06 00:45:00'
---

# **使用Cloudflare Workers创建反向代理**

## **简介**

Cloudflare Workers是无服务器函数服务，支持全球CDN分发，免费用户每天可使用10万次请求。通过简单设置，您可以创建反向代理访问任意网站，优化访问体验。

[bookmark](https://cloudflare.com)

## **快速实现反向代理**

以下是Cloudflare Workers反代脚本，只需将example.com替换为目标网站域名即可：

### **核心代码**

```javascript
// 需要反代的网站域名
const upstream = 'example.com'

// 自定义的路径（可选）
const upstream_path = '/'

// 移动设备访问时的反代域名
const upstream_mobile = 'example.com'

// 禁用服务的国家/地区
const blocked_region = ['CN', 'US']

// 禁用服务的IP地址
const blocked_ip_address = ['0.0.0.0', '127.0.0.1']

// 是否启用HTTPS协议
const https = true

// 是否禁用缓存
const disable_cache = false

// 替换文本规则
const replace_dict = {
  $upstream: '$custom_domain',
  '//example.com': '',
}

// 监听Fetch事件
addEventListener('fetch', (event) => {
  event.respondWith(fetchAndApply(event.request))
})

// 主逻辑
async function fetchAndApply(request) {
  const region = request.headers.get('cf-ipcountry')?.toUpperCase()
  const ip_address = request.headers.get('cf-connecting-ip')
  const user_agent = request.headers.get('user-agent')
  let url = new URL(request.url)
  let url_hostname = url.hostname

  // 设置协议
  url.protocol = https ? 'https:' : 'http:'

  // 判断设备类型
  const upstream_domain = (await device_status(user_agent)) ? upstream : upstream_mobile

  // 更新路径和域名
  url.host = upstream_domain
  url.pathname = url.pathname === '/' ? upstream_path : upstream_path + url.pathname

  // 区域或IP封锁
  if (blocked_region.includes(region)) {
    return new Response('访问被拒绝：此服务暂未覆盖您的地区。', { status: 403 })
  } else if (blocked_ip_address.includes(ip_address)) {
    return new Response('访问被拒绝：您的IP已被封禁。', { status: 403 })
  }

  // 设置请求头
  const method = request.method
  const new_request_headers = new Headers(request.headers)
  new_request_headers.set('Host', upstream_domain)
  new_request_headers.set('Referer', `${url.protocol}//${url_hostname}`)

  // 处理请求
  const original_response = await fetch(url.href, {
    method,
    headers: new_request_headers,
  })

  // WebSocket连接直接返回
  if (new_request_headers.get('Upgrade')?.toLowerCase() === 'websocket') {
    return original_response
  }

  const original_response_clone = original_response.clone()
  let response_headers = new Headers(original_response.headers)
  let original_text = null

  // 设置响应头
  if (disable_cache) {
    response_headers.set('Cache-Control', 'no-store')
  }
  response_headers.set('Access-Control-Allow-Origin', '*')
  response_headers.set('Access-Control-Allow-Credentials', 'true')
  ;['content-security-policy', 'content-security-policy-report-only', 'clear-site-data'].forEach(
    (header) => {
      response_headers.delete(header)
    }
  )

  // 替换文本内容
  const content_type = response_headers.get('content-type')
  if (content_type?.includes('text/html') && content_type.includes('UTF-8')) {
    original_text = await replace_response_text(
      original_response_clone,
      upstream_domain,
      url_hostname
    )
  } else {
    original_text = original_response_clone.body
  }

  // 返回最终响应
  return new Response(original_text, {
    status: original_response.status,
    headers: response_headers,
  })
}

// 替换响应文本
async function replace_response_text(response, upstream_domain, host_name) {
  let text = await response.text()
  for (const [key, value] of Object.entries(replace_dict)) {
    const search =
      key === '$upstream' ? upstream_domain : key === '$custom_domain' ? host_name : key
    const replacement =
      value === '$upstream' ? upstream_domain : value === '$custom_domain' ? host_name : value
    text = text.replace(new RegExp(search, 'g'), replacement)
  }
  return text
}

// 判断设备类型（移动或桌面）
async function device_status(user_agent_info) {
  const agents = ['Android', 'iPhone', 'SymbianOS', 'Windows Phone', 'iPad', 'iPod']
  return !agents.some((agent) => user_agent_info.includes(agent))
}
```

## **使用步骤**

1. 登录Cloudflare Workers管理界面
2. 创建新Worker
3. 复制代码到编辑器
4. 将`example.com`替换为目标网站域名
5. 保存并部署

## **注意事项**

1. **请求限制**：免费账户每天限10万次请求
2. **合规性**：确保有合法权限进行反向代理
3. **性能调优**：可调整缓存和替换规则提升速度
4. **安全防护**：可设置地区和IP限制防止滥用
