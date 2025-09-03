"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var posts = [];
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
    var post = posts.find(function (p) { return p.id === id; });
    return post || "❌ Post not found!";
}
// ✅ UPDATE
function updatePost(id, updatedData) {
    var index = posts.findIndex(function (p) { return p.id === id; });
    if (index === -1)
        return "❌ Post not found!";
    var updatedPost = __assign(__assign({}, posts[index]), updatedData);
    if (!isValidPost(updatedPost)) {
        return "❌ Invalid Update Data!";
    }
    posts[index] = updatedPost;
    return updatedPost;
}
// ✅ DELETE
function deletePost(id) {
    var index = posts.findIndex(function (p) { return p.id === id; });
    if (index === -1)
        return "❌ Post not found!";
    posts.splice(index, 1);
    return "✅ Post deleted!";
}
