---
category: dev
author: Anda Toshiki
tags:
  - cloudflare
  - cf
  - dev
  - tutorial
status: published
date: '2025-10-04 15:00:00'
catalog:
  - dev
urlname: cloudflare-workers-reverse-proxy
title: Using Cloudflare Workers to Create a Reverse Proxy
updated: '2025-10-06 00:45:00'
---

# Using CloudFlare Workers to Create a Reverse Proxy

## Introduction

Cloudflare Workers is a serverless functions platform with global CDN distribution. Free plans include up to 100,000 requests per day. With a simple setup, you can create a reverse proxy to access any website and improve the experience.Cloudflare Workers is a serverless functions platform with global CDN distribution. Free plans include up to 100,000 requests per day. With a simple setup, you can create a reverse proxy to access any website and improve the experience.

[bookmark](https://cloudflare.com)

## Quick Start: Reverse ProxyQuick Start: Reverse Proxy

Below is a Cloudflare Workers reverse proxy script. Replace [`example.com`](http://example.com/) with your target site’s domain.Below is a Cloudflare Workers reverse proxy script. Replace [`example.com`](http://example.com/) with your target site’s domain.

### Core CodeCore Code

```javascript
// Domain of the site to reverse proxy
const upstream = '
example.com
';

// Custom base path (optional)
const upstream_path = '/';

// Upstream domain for mobile devices
const upstream_mobile = '
example.com
';

// Countries/regions to block
const blocked_region = ['CN', 'US'];

// IP addresses to block
const blocked_ip_address = ['0.0.0.0', '127.0.0.1'];

// Force HTTPS
const https = true;

// Disable cache
const disable_cache = false;

// Text replacement rules
const replace_dict = {
  '$upstream': '$custom_domain',
  '//
example.com
': ''
};

// Listen for Fetch events
addEventListener('fetch', event => {
  event.respondWith(fetchAndApply(event.request));
});

// Main logic
async function fetchAndApply(request) {
  const region = request.headers.get('cf-ipcountry')?.toUpperCase();
  const ip_address = request.headers.get('cf-connecting-ip');
  const user_agent = request.headers.get('user-agent');
  let url = new URL(request.url);
  let url_hostname = url.hostname;

  // Set protocol
  url.protocol = https ? 'https:' : 'http:';

  // Choose upstream by device type
  const upstream_domain = await device_status(user_agent) ? upstream : upstream_mobile;

  // Update path and domain

url.host
 = upstream_domain;
  url.pathname = url.pathname === '/' ? upstream_path : upstream_path + url.pathname;

  // Block by region or IP
  if (blocked_region.includes(region)) {
    return new Response('Access denied: this service is not available in your region.', { status: 403 });
  } else if (blocked_ip_address.includes(ip_address)) {
    return new Response('Access denied: your IP has been blocked.', { status: 403 });
  }

  // Set request headers
  const method = request.method;
  const new_request_headers = new Headers(request.headers);
  new_request_headers.set('Host', upstream_domain);
  new_request_headers.set('Referer', `${url.protocol}//${url_hostname}`);

  // Forward the request
  const original_response = await fetch(url.href, { method, headers: new_request_headers });

  // Pass through WebSocket connections
  if (new_request_headers.get('Upgrade')?.toLowerCase() === 'websocket') {
    return original_response;
  }

  const original_response_clone = original_response.clone();
  let response_headers = new Headers(original_response.headers);
  let original_text = null;

  // Set response headers
  if (disable_cache) {
    response_headers.set('Cache-Control', 'no-store');
  }
  response_headers.set('Access-Control-Allow-Origin', '*');
  response_headers.set('Access-Control-Allow-Credentials', 'true');
  ['content-security-policy', 'content-security-policy-report-only', 'clear-site-data'].forEach(header => {
    response_headers.delete(header);
  });

  // Replace text content
  const content_type = response_headers.get('content-type');
  if (content_type?.includes('text/html') && content_type.includes('UTF-8')) {
    original_text = await replace_response_text(original_response_clone, upstream_domain, url_hostname);
  } else {
    original_text = original_response_clone.body;
  }

  // Return the final response
  return new Response(original_text, {
    status: original_response.status,
    headers: response_headers
  });
}

// Replace response text
async function replace_response_text(response, upstream_domain, host_name) {
  let text = await response.text();
  for (const [key, value] of Object.entries(replace_dict)) {
    const search = key === '$upstream' ? upstream_domain : key === '$custom_domain' ? host_name : key;
    const replacement = value === '$upstream' ? upstream_domain : value === '$custom_domain' ? host_name : value;
    text = text.replace(new RegExp(search, 'g'), replacement);
  }
  return text;
}

// Determine device type (mobile or desktop)
async function device_status(user_agent_info) {
  const agents = ['Android', 'iPhone', 'SymbianOS', 'Windows Phone', 'iPad', 'iPod'];
  return !agents.some(agent => user_agent_info.includes(agent));
}// Domain of the site to reverse proxy
const upstream = '
example.com
';

// Custom base path (optional)
const upstream_path = '/';

// Upstream domain for mobile devices
const upstream_mobile = '
example.com
';

// Countries/regions to block
const blocked_region = ['CN', 'US'];

// IP addresses to block
const blocked_ip_address = ['0.0.0.0', '127.0.0.1'];

// Force HTTPS
const https = true;

// Disable cache
const disable_cache = false;

// Text replacement rules
const replace_dict = {
  '$upstream': '$custom_domain',
  '//
example.com
': ''
};

// Listen for Fetch events
addEventListener('fetch', event => {
  event.respondWith(fetchAndApply(event.request));
});

// Main logic
async function fetchAndApply(request) {
  const region = request.headers.get('cf-ipcountry')?.toUpperCase();
  const ip_address = request.headers.get('cf-connecting-ip');
  const user_agent = request.headers.get('user-agent');
  let url = new URL(request.url);
  let url_hostname = url.hostname;

  // Set protocol
  url.protocol = https ? 'https:' : 'http:';

  // Choose upstream by device type
  const upstream_domain = await device_status(user_agent) ? upstream : upstream_mobile;

  // Update path and domain

url.host
 = upstream_domain;
  url.pathname = url.pathname === '/' ? upstream_path : upstream_path + url.pathname;

  // Block by region or IP
  if (blocked_region.includes(region)) {
    return new Response('Access denied: this service is not available in your region.', { status: 403 });
  } else if (blocked_ip_address.includes(ip_address)) {
    return new Response('Access denied: your IP has been blocked.', { status: 403 });
  }

  // Set request headers
  const method = request.method;
  const new_request_headers = new Headers(request.headers);
  new_request_headers.set('Host', upstream_domain);
  new_request_headers.set('Referer', `${url.protocol}//${url_hostname}`);

  // Forward the request
  const original_response = await fetch(url.href, { method, headers: new_request_headers });

  // Pass through WebSocket connections
  if (new_request_headers.get('Upgrade')?.toLowerCase() === 'websocket') {
    return original_response;
  }

  const original_response_clone = original_response.clone();
  let response_headers = new Headers(original_response.headers);
  let original_text = null;

  // Set response headers
  if (disable_cache) {
    response_headers.set('Cache-Control', 'no-store');
  }
  response_headers.set('Access-Control-Allow-Origin', '*');
  response_headers.set('Access-Control-Allow-Credentials', 'true');
  ['content-security-policy', 'content-security-policy-report-only', 'clear-site-data'].forEach(header => {
    response_headers.delete(header);
  });

  // Replace text content
  const content_type = response_headers.get('content-type');
  if (content_type?.includes('text/html') && content_type.includes('UTF-8')) {
    original_text = await replace_response_text(original_response_clone, upstream_domain, url_hostname);
  } else {
    original_text = original_response_clone.body;
  }

  // Return the final response
  return new Response(original_text, {
    status: original_response.status,
    headers: response_headers
  });
}

// Replace response text
async function replace_response_text(response, upstream_domain, host_name) {
  let text = await response.text();
  for (const [key, value] of Object.entries(replace_dict)) {
    const search = key === '$upstream' ? upstream_domain : key === '$custom_domain' ? host_name : key;
    const replacement = value === '$upstream' ? upstream_domain : value === '$custom_domain' ? host_name : value;
    text = text.replace(new RegExp(search, 'g'), replacement);
  }
  return text;
}

// Determine device type (mobile or desktop)
async function device_status(user_agent_info) {
  const agents = ['Android', 'iPhone', 'SymbianOS', 'Windows Phone', 'iPad', 'iPod'];
  return !agents.some(agent => user_agent_info.includes(agent));
}
```

## Steps to Use

1. Log in to the Cloudflare Workers dashboardLog in to the Cloudflare Workers dashboard
2. Create a new WorkerCreate a new Worker
3. Paste the code into the editorPaste the code into the editor
4. Replace [`example.com`](http://example.com/) with the target site’s domainReplace [`example.com`](http://example.com/) with
5. Save and deploy

## Notes

1. Request limits: Free accounts can make up to 100,000 requests per day
2. Compliance: Ensure you have legal permission to perform reverse proxying
3. Performance tuning: Adjust caching and replacement rules to improve speed
4. Security: Configure region and IP restrictions to prevent abuse
