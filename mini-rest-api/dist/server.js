"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("http");
const uuid_1 = require("uuid");
const url_1 = require("url");
const tasks = [];
const getRequestBody = (req) => {
    return new Promise((resolve, reject) => {
        let body = "";
        req.on("data", (chunk) => body += chunk);
        req.on("end", () => {
            try {
                resolve(body ? JSON.parse(body) : {});
            }
            catch (err) {
                reject(err);
            }
        });
    });
};
const server = (0, http_1.createServer)(async (req, res) => {
    const url = (0, url_1.parse)(req.url || "", true);
    const method = req.method || "";
    if (url.pathname === "/tasks" && method === "GET") {
        res.writeHead(200, { 'content-Type': 'application/json' });
        res.end(JSON.stringify(tasks));
        return;
    }
    if (url.pathname === "/tasks" && method === "POST") {
        try {
            const body = await getRequestBody(req);
            if (!body.title) {
                res.writeHead(400, { 'content-Type': 'application/json' });
                res.end(JSON.stringify({ error: "Task title is required" }));
                return;
            }
            const newTask = {
                id: (0, uuid_1.v4)(),
                title: body.title,
                completed: false
            };
            tasks.push(newTask);
            res.writeHead(200, { "content-Type": "Application/json" });
            res.end(JSON.stringify(newTask));
        }
        catch (err) {
            res.writeHead(400, { "Content-Type": "Application/json" });
            res.end(JSON.stringify({ error: "Invalid JSON" }));
        }
        return;
    }
    res.writeHead(404, { "Content-Type": "Application/json" });
    res.end(JSON.stringify({ error: "Page Not Found" }));
});
const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
