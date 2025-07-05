import type { Comment } from "../PostWithComment";

export async function getCommentsForPost(id: string): Promise<Comment[]> {
  console.log(`getting comments for post ${id}`);
  const comments: Comment[] = [];
  comments.push({
    content: "This is awesome!",
    date: new Date().getTime(),
  });
  comments.push({
    content: "Nice car!",
    date: new Date().getTime(),
  });
  return comments;
}
