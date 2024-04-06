import http from "http"
import gfname from "./feature.js"
import {gfname1,gfname2,myfun} from "./feature.js"
import path from "path"
import fs from "fs"

// console.log(gfname)
// console.log(gfname1)
// console.log(gfname2)
// console.log(myfun())

//console.log(path.extname("/home/fun/index.js"))

// const home = fs.readFileSync("./index.html")
// console.log(home)



const server = http.createServer((req,res)=>{
    if(req.url === "/about") res.end(`<h1>Love is ${myfun()}</h1>`)

    else if(req.url === "/") res.end("hello bhai")

    else if(req.url === "/contact") res.end("<h1>Contact Page</h1>")

    else res.end("<h1>Page not found</h1>")
})

server.listen(5000,()=>{
    console.log("server is started")
})
