---
title: 'API设计最佳实践 '
slug: 'api-design'
published_at: '2025-06-20'
updated_at: '2025-06-30'
tag: ['backend']
description: '后端服务向外提供接口指南'
---

并不限制于Node.js, 只是本人在开发Node.js接口中的一些经验，结合ChatGPT总结整理。

## 接口设计层面
### 接口定义
- 请求方式: HTTP或RPC接口
- 请求方法: HTTP下的POST/GET
- 请求参数: 
  - 入参设计符合业务需要
  - 出参格式统一, 如包含 code、message、data
  - 错误码规范, 如 200、400、500等

举例, 一个请求成功的响应如下
```js
{
  code: 200
  message: "请求成功"
  data: {
    rows: [...]
    columns: [...]
  }
}
```

### 版本控制
- 当有持续迭代接口的需求时, 提供版本号: 如 `/api/v1/trendData` 或 `/getTrendDataV1` 方便未来升级

### 案例
[CoinGecko API Doc](https://docs.coingecko.com/reference/simple-price)

## 安全性层面
### 身份验证
- 服务端与服务端通信
  - API Key 机制
  - HMAC 签名机制
- 前端与服务端通信
  - API网关登录态校验, 通过统一网关发放和校验SSO Cookie

HMAC 签名机制
```js
// 使用密钥(secret)+内容(method、path、date)生成签名
function BAHeader (path, method, secret) {
    if (!secret)
        throw new Error('client secret must not be empty!')

    path = url.parse(path).pathname
    method = (method || 'GET').toUpperCase()

    var date = (new Date).toGMTString()
    var sha = crypto.createHmac('sha1', secret)
                .update(method + ' ' + path + '\n' + date)
                .digest()
                .toString('base64')
    var authStr = client + ':' + sha

    return {
        Date: date,
        Authorization: authStr
    }
}

// 客户端请求接口
const baHeader = BAHeader('/api/getTrendData', 'GET', 'this is a secret')
axios.get('/api/getTrendData', { headers: baHeader })

// 服务端收到请求后, 可以通过client在数据库中寻找对应的secret, 然后进行生成签名和请求的签名进行比对
```

和 API Key相比, HMAC 签名机制的优点是即使有人截获了签名, 也无法伪造请求 (不知道secret), 但是实现比 API Key略复杂.

### 权限控制
- 不同用户/应用只能访问自己权限内的资源, 简单情况下, 用户/应用应该只能访问自己的资源。比如一个订阅系统, 用户Tom在应用A和应用B都保存了订阅, 但是在应用A中应该只能看到应用A的订阅而不能看到应用B的订阅, 这要求表设计需要有应用这个字段。

## 稳定性与性能层面
### 超时与重试机制
- 明确接口的响应超时时间, 避免堵塞整条API调用链路，比如网关会有15秒超时。

### 幂等性
- POST 接口（比如支付）提供幂等保证，对于服务端处理过的请求，不重复处理。避免重复写入、发多条消息、重复支付等副作用。

### 限流 Rate Limit
- 使用消息队列(MQ)对接口进行限流

### 并发与扩容
- Serverless部署场景下, 可以设置阈值QPS或并发量自动扩容实例以增加并发量.

## 日志与监控
### 日志记录
- 使用 console 记录请求参数、响应体。在记录深层对象时需`JSON.stringify(obj, null, 2)`以防日志看不到具体对象数据.
- 使用 traceId 追踪具体某个请求链路
  - 通常网关层面会在 request/response header 携带 traceId
  - 如果是自己控制的接口, 需注意透传traceId. traceId通常使用uuid库+middleware的方式生成, 并挂载在 ctx 中

### 告警
- 异常情况需自动告警, 例如执行超时、调用失败...




