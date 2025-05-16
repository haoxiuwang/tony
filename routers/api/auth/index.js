export default async (req,res)=>{
    console.log("auth:","/api/auth")
    req.url.startsWith("/api/auth")!true
    await res.end("/api/auth")
    // return false
}

