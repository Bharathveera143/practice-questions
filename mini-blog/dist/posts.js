"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidPost = isValidPost;
exports.createPost = createPost;
exports.getPosts = getPosts;
exports.getPostById = getPostById;
exports.updatePost = updatePost;
exports.deletePost = deletePost;
// ✅ Validation + Type Narrowing
function isValidPost(data) {
    return (typeof data.id === "number" &&
        typeof data.title === "string" &&
        data.title.trim().length > 0 &&
        typeof data.content === "string" &&
        data.content.trim().length > 0);
}
// Database (in-memory)
let posts = [];
// ✅ CREATE
function createPost(newPost) {
    if (!isValidPost(newPost)) {
        return "❌ Invalid Post Data!";
    }
    posts.push(newPost);
    return newPost;
}
// ✅ READ ALL
function getPosts() {
    return posts;
}
// ✅ READ BY ID
function getPostById(id) {
    const post = posts.find((p) => p.id === id);
    return post || "❌ Post not found!";
}
// ✅ UPDATE
function updatePost(id, updatedData) {
    const index = posts.findIndex((p) => p.id === id);
    if (index === -1)
        return "❌ Post not found!";
    const updatedPost = Object.assign(Object.assign({}, posts[index]), updatedData);
    if (!isValidPost(updatedPost)) {
        return "❌ Invalid Update Data!";
    }
    posts[index] = updatedPost;
    return updatedPost;
}
// ✅ DELETE
function deletePost(id) {
    const index = posts.findIndex((p) => p.id === id);
    if (index === -1)
        return "❌ Post not found!";
    posts.splice(index, 1);
    return "✅ Post deleted!";
}
