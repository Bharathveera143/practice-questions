// Define Post interface
export interface Post {
  id: number;
  title: string;
  content: string;
}

// ✅ Validation + Type Narrowing
export function isValidPost(data: any): data is Post {
  return (
    typeof data.id === "number" &&
    typeof data.title === "string" &&
    data.title.trim().length > 0 &&
    typeof data.content === "string" &&
    data.content.trim().length > 0
  );
}

// Database (in-memory)
let posts: Post[] = [];

// ✅ CREATE
export function createPost(newPost: any): Post | string {
  if (!isValidPost(newPost)) {
    return "❌ Invalid Post Data!";
  }
  posts.push(newPost);
  return newPost;
}

// ✅ READ ALL
export function getPosts(): Post[] {
  return posts;
}

// ✅ READ BY ID
export function getPostById(id: number): Post | string {
  const post = posts.find((p) => p.id === id);
  return post || "❌ Post not found!";
}

// ✅ UPDATE
export function updatePost(id: number, updatedData: any): Post | string {
  const index = posts.findIndex((p) => p.id === id);
  if (index === -1) return "❌ Post not found!";

  const updatedPost = { ...posts[index], ...updatedData };

  if (!isValidPost(updatedPost)) {
    return "❌ Invalid Update Data!";
  }

  posts[index] = updatedPost;
  return updatedPost;
}

// ✅ DELETE
export function deletePost(id: number): string {
  const index = posts.findIndex((p) => p.id === id);
  if (index === -1) return "❌ Post not found!";

  posts.splice(index, 1);
  return "✅ Post deleted!";
}
