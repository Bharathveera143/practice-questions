"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var path = require("path");
var logFile = path.join(__dirname, "chatlog.json");
function savedMessage(message) {
    var newMessage = {
        text: message,
        timeStamp: new Date().toISOString(),
    };
    var messages = [];
    if (fs.existsSync(logFile)) {
        var data = fs.readFileSync(logFile, 'utf-8');
        message = JSON.parse(data);
    }
    messages.push(newMessage);
    fs.writeFileSync(logFile, JSON.stringify(message, null, 2));
    console.log("✅ Message saved!");
}
var _a = process.argv.slice(2), command = _a[0], rest = _a.slice(1);
if (command === "send") {
    var msg = rest.join(" ");
    if (!msg) {
        console.log("⚠️ Please provide a message!");
    }
    else {
        savedMessage(msg);
    }
}
else {
    console.log("Usage: node dist/index.js send \"Your message\"");
}
