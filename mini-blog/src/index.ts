import {
  createPost,
  getPosts,
  getPostById,
  updatePost,
  deletePost,
} from "./posts";

// ---- DEMO ----

// Create
console.log(createPost({ id: 1, title: "My First Post", content: "Hello World" }));
console.log(createPost({ id: 2, title: "", content: "Invalid" })); // ❌ Invalid

// Read
console.log(getPosts());
console.log(getPostById(1));
console.log(getPostById(99)); // ❌ Not found

// Update
console.log(updatePost(1, { title: "Updated Post" }));
console.log(updatePost(1, { title: "" })); // ❌ Invalid update

// Delete
console.log(deletePost(1));
console.log(deletePost(99)); // ❌ Not found
