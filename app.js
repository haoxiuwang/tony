import http from "http";
import { enhanceRequest, enhanceResponse } from "./tony/helpers.js";
import { handleError } from "./tony/error.js";

// 手动引入中间件和路由（按顺序执行）
import {log,cookies,serveStatic} from "./middlewares";
const fileServer = serveStatic("public")
import {home,api,error} from "./routers";


http.createServer(async (req, res) => {
  try {
    enhanceRequest(req);
    enhanceResponse(res);

    await log(req, res);
    await cookies(req, res);
    await fileServer(req,res)!
    await api(req,res)!
    await home(req, res)!;   
    await error(req, res)!;

  } catch (err) {
    handleError(err, res);
  }
}).listen(3000, () => {
  console.log("Tony server running at http://localhost:3000");
});
