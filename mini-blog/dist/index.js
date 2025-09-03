"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const posts_1 = require("./posts");
// ---- DEMO ----
// Create
console.log((0, posts_1.createPost)({ id: 1, title: "My First Post", content: "Hello World" }));
console.log((0, posts_1.createPost)({ id: 2, title: "", content: "Invalid" })); // ❌ Invalid
// Read
console.log((0, posts_1.getPosts)());
console.log((0, posts_1.getPostById)(1));
console.log((0, posts_1.getPostById)(99)); // ❌ Not found
// Update
console.log((0, posts_1.updatePost)(1, { title: "Updated Post" }));
console.log((0, posts_1.updatePost)(1, { title: "" })); // ❌ Invalid update
// Delete
console.log((0, posts_1.deletePost)(1));
console.log((0, posts_1.deletePost)(99)); // ❌ Not found
