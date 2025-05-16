import users from "./users"
import auth from "./auth"
import log from "../../middlewares/log"
export default async (req,res)=>{
    console.log("api",req.url)
    req.url.startsWith("/api")!true     
    await auth(req,res)!   
    await users(req,res)!
    return true
}