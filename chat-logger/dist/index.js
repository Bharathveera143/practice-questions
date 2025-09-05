"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const path = require("path");
const logFile = path.join(__dirname, "chatlog.json");
function savedMessage(message) {
    const newMessage = {
        text: message,
        timeStamp: new Date().toISOString(),
    };
    let messages = [];
    if (fs.existsSync(logFile)) {
        const data = fs.readFileSync(logFile, "utf-8").trim();
        if (data.length > 0) {
            try {
                const parsed = JSON.parse(data);
                if (Array.isArray(parsed)) {
                    // If old format = ["msg1","msg2"] → convert
                    if (typeof parsed[0] === "string") {
                        messages = parsed.map((txt) => ({
                            text: txt,
                            timeStamp: new Date().toISOString(),
                        }));
                    }
                    else {
                        messages = parsed;
                    }
                }
            }
            catch (err) {
                console.error("⚠️ Corrupted JSON file, resetting log...");
                messages = [];
            }
        }
    }
    console.log("Before save, messages =", messages);
    messages.push(newMessage);
    fs.writeFileSync(logFile, JSON.stringify(messages, null, 2));
    console.log("✅ Message saved!");
}
const [command, ...rest] = process.argv.slice(2);
if (command === "send") {
    const msg = rest.join(" ");
    if (!msg) {
        console.log("⚠️ Please provide a message!");
    }
    else {
        savedMessage(msg);
    }
}
else {
    console.log('Usage: node dist/index.js send "Your message"');
}
//# sourceMappingURL=index.js.map