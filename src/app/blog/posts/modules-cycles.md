---
title: 'Node.js 中的模块循环引用'
slug: 'modules-cycles'
published_at: '2025-08-12'
updated_at: '2025-08-12'
tag: ['node.js', 'backend']
description: '-'
---

## Intro
当模块间直接依赖或间接依赖时，即会产生循环引用问题。例如, A模块需要import B模块, 而B模块需要引入A模块的直接相关依赖情况。

更难发现的是间接相互依赖问题，例如 A -> B -> C -> A 的依赖循环。循环引用在 Node.js 并不会终止运行，但由于会引入未完全初始化的值（undefined），将导致应用程序的逻辑错误。

## 案例分析
假设我们有一个 express 或 koa 编写的 Node.js 服务端程序，以 app.ts 为启动入口，

在 utils/index.ts 中，为了方便判断环境，我们写了并导出一个变量 ```export const isProd = process.env.ENV === 'prod'```。

此外，在 utils/index.ts 中，我们从 config/index.ts 中引入了 dbconfig。

在 config/index.ts 文件下，我们导出了包含ssoconfig、dbconfig等变量，这些变量是从 config/db.ts 和 config/sso.ts 中引入的。

然而，我们在 config/sso.ts 中为了区分环境，使用到了 utils/index.ts 提供的isProd，一个不易察觉、你可能都没注意到的循环引用就产生了！

![循环应用](https://6n9ck0v3cffymhqw.public.blob.vercel-storage.com/modules-cycles/module-cycles.png)

由于在 sso.ts 中依赖的 isProd 是来自于 utils/index.ts模块，而由于产生了循环依赖，这个模块还没有完全加载，这将导致 isProd 为 undefined！

### 解决方法

1. 使用函数延时获取

对于上述案例来说，我们可以使用函数延迟获取isProd，而不是在模块初始化时就去获取，```export const isProd = () => process.env.ENV === 'prod'``` 

2. 调整import顺序

上述执行链路的关键是，当运行utils/index.ts去引入config/index.ts的dbconfig时, 会直接加载config/sso.ts模块, 而sso.ts模块依赖的isProd，还没有在utils/index.ts中执行到, 所以还为undefined. 如果我们在utils/index.ts的import不放在最顶层, 而是放在最底层, 那么isProd将初始化完成, 加载sso.ts模块时引用的isProd就可以访问到了。

当将import放在模块最底下并不符合书写习惯，所以这里暂时用不了这个方案。

3. 直接使用process.env.ENV值

process.env 是在启动 app.ts 时第一行使用 dotenv 注入的, 可以视作立即生效的全局变量。

## 结论

减少模块间的循环依赖，尽可能的保持单向依赖，从而让依赖关系变简单，保证模块初始化的清洗。这和 Redux 推荐的单向数据流的思想有一定相似之处，亦如使用 MobX 的 RootStore 初始化所有 Store 一样，单向、简单、好维护。