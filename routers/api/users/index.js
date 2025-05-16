import { getUsers } from "./user.service"
export default async (req,res)=>{
    console.log("users：",req.url)
    req.url.startsWith("/api/users")!true
    await res.end("/api/users")
    // return false
}