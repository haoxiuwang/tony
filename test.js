async function a(x){    
    if(x>0)return 3
    return await Promise.resolve(5)
    
}
async function b(){
    console.log("hello")
}

async function c(){
    console.log(await a(2))
    if(await b())console.log(await b())
    await (b())
    return 5
}
async function d(){
    console.log(await c())
}
async function e(){
    await d()
}
e()