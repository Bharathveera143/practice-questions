import {createServer,IncomingMessage,ServerResponse} from "http";
import { v4 as uuidv4 } from "uuid";
import{parse} from "url";
import { resolve } from "path";
import { rejects } from "assert";
import { error } from "console";


type Task = {
    id:string;
    title:string;
    completed:boolean;
}

const tasks:Task[] = [];

const getRequestBody = (req:IncomingMessage):Promise<any>=>{
    return new Promise((resolve,reject)=>{
        let body = "";
        req.on("data",(chunk)=>body+=chunk);
        req.on("end",()=>{
            try{
                resolve (body ? JSON.parse(body):{});
            }catch(err){
                reject (err);
            }
        })
    })
}



const server = createServer(async(req:IncomingMessage,res:ServerResponse)=>{
    const url = parse(req.url || "",true);
    const method = req.method || "";

    if(url.pathname === "/tasks" && method === "GET"){
        res.writeHead(200,{'content-Type':'application/json'});
        res.end(JSON.stringify(tasks));
        return;
    }

    if(url.pathname === "/tasks" && method === "POST"){
        try{
            const body = await getRequestBody(req);
            if(!body.title){
                res.writeHead(400,{'content-Type':'application/json'});
                res.end(JSON.stringify({error:"Task title is required"}))
                return;
            }

            const newTask : Task = {
                id:uuidv4(),
                title:body.title,
                completed:false
            }

            tasks.push(newTask);

            res.writeHead(200,{"content-Type":"Application/json"});
            res.end(JSON.stringify(newTask));
        }
        catch(err){
            res.writeHead(400,{"Content-Type":"Application/json"});
            res.end(JSON.stringify({error:"Invalid JSON"}));
        }
        return;
    }

    res.writeHead(404,{"Content-Type":"Application/json"});
    res.end(JSON.stringify({error:"Page Not Found"}));
});

const PORT = 3000;
server.listen(PORT,()=>{
    console.log(`Server running on http://localhost:${PORT}`);
});