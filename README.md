# 🧱 Tony - 极简无框架 Node.js Web 方案

> 一个无框架、高透明度、极简主义的 Node.js Web 应用架构。拒绝魔法，拒绝复杂性，拥抱清晰和可控。

---

## 🚀 项目理念

Tony 不依赖任何 Web 框架（如 Express、Koa、Nest），也不使用路由匹配器、中间件链或 DI 容器。

Tony 的设计核心是：

- ✅ 显式顺序执行逻辑（中间件和路由）
- ✅ 模块化组织，但不自动加载
- ✅ 支持类似中间件的功能控制请求流程
- ✅ 易读、易调试、无黑盒、全可控
- ✅ 支持现代 ES6 模块与构建（通过 esbuild）

---

## 🗂️ 项目结构

```
.
├── app.js                 # 入口文件
├── routers/               # 路由处理器（模块化组织）
│   ├── _home.js
│   ├── _api.js
│   └── _error.js
├── middlewares/          # 中间件（模块化组织）
│   ├── log.js
│   ├── session.js
│   └── cookies.js
└── public/               # 可选静态资源
```

---

## 🧬 工作原理

Tony 使用最原始的 `http.createServer`，不使用框架。核心逻辑如下：

```js
// app.js
const { log, session } = require('./middlewares')
const { _home, _api } = require('./routers')

http.createServer(async (req, res) => {
  //middlewares
  await log(req, res)!
  await session(req, res)!
  //routers
  await home(req, res)!
  await api(req, res)!
})
```

中间件与路由函数格式如下：

```js
export default async function(req, res) {
  if (req.url === '/api/hello') {
    res.writeHead(200)
    res.end('Hello')
    return false // 中断后续流程
  }
  return true // 继续执行下一个模块
}
```

Tony 特有语法糖：`await fn(req, res)!` 相当于：

```js
if (!await fn(req, res)) return;
```

可通过 esbuild 插件支持该语法糖。

---

## 🔧 使用方式

### 启动服务

```bash
node app.js
```

或使用 esbuild 打包支持语法糖：

```bash
esbuild app.js --bundle --outfile=dist/app.js --plugins=./tony-syntax-plugin.js
```

---

## 🌟 特性一览

- ✅ 零框架，0 依赖（除自选库）
- ✅ 精准中间件控制（无链式不可控结构）
- ✅ 自由模块组织
- ✅ 支持自定义语法糖（如 `await fn(req, res)!`）
- ✅ 极高可读性与调试性

---

## 💡 为什么选择 Tony？

| 传统框架问题        | Tony 的解决方式           |
|---------------------|----------------------------|
| 中间件链路不可控    | 显式调用，顺序完全可控     |
| 自动扫描难调试      | 所有模块手动导入，零魔法   |
| 依赖注入复杂         | 模块直接调用、清晰引用     |
| 性能难以掌控        | 结构极简，无黑盒负担       |

---

## 🛠️ 中间件开发约定

- 每个中间件是一个 `async (req, res)` 函数
- 返回 `false` 表示终结请求
- 返回 `true` 表示继续流程
- 可扩展 `req.xxx`、`res.xxx`

---

## 🧩 TODO / 建议扩展

- [ ] 自定义 404 / 500 响应处理器
- [ ] 静态资源服务模块（middlewares/static.js）
- [ ] esbuild 语法糖插件模板
- [ ] CLI 脚手架工具

---

## 📄 License

MIT