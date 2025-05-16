当然，以下是一份**完整清晰的中间件生成请求说明**，你可以提交这份说明给 ChatGPT，以快速、高质量地生成适用于 Tony 项目的中间件：

---

## 🧩 中间件生成请求：为 Tony 项目生成中间件

### 🧱 项目背景

Tony 是一个**极简无框架的 Node.js Web 服务方案**，强调：

* **模块显式加载**，不做自动扫描或依赖注入
* **不使用 Express、Koa 等框架**
* **不使用中间件链式调用机制**，而是按顺序显式调用中间件与路由函数，如下：

```js
await log(req, res)
await cookies(req, res)
await session(req, res)!
await _home(req, res)!
await _error(req, res)!
```

### 🔧 中间件规范

中间件是一个独立的模块，导出一个 async 函数，格式如下：

```js
export default async function middleware(req, res) {
  // 如果处理完请求
  res.writeHead(200)
  res.end("Handled")
  return false;

  // 或者继续下一个处理
  return true;
}
```

### 🔗 中间件行为规则

* 返回 `false`：表示该中间件已**终结响应流程**（例如返回 401、输出静态资源等）
* 返回 `true`：表示**继续执行下一个中间件或路由**
* 可在 `req` 上扩展属性（如 `req.user`, `req.cookies`, `req.body` 等）

### 📦 项目结构

Tony 项目的中间件统一存放在 `middlewares/` 目录下，每个文件为一个模块，例如：

```
middlewares/
  log.js
  cookies.js
  auth.js
```

使用方式：

```js
import log from './middlewares/log.js';
await log(req, res)!
```

---

### ✅ 请根据以下输入生成中间件

> * 功能：❓（请填写，如：解析 Cookie / 校验 JWT / 记录日志）
> * 是否需要使用第三方库：❓（如 `jsonwebtoken`, `cookie`, `uuid` 等）
> * 是否需要读取/写入 `req` 或 `res` 上下文：❓
> * 是否需要配置项：❓（如限制频率、token 过期时间）
> * 中间件文件名建议为：`middlewares/xxx.js`
> * 编写为 ES6 模块语法（`export default`）

---

你只需要填写 ❓ 的部分，例如：

> * 功能：从 Cookie 解析 session ID 并挂载 req.session
> * 是否需要使用第三方库：需要 `cookie`
> * 是否需要读取/写入 req 或 res 上下文：是，需要写入 req.session
> * 是否需要配置项：不需要
> * 文件名建议为：`middlewares/session.js`

