import axios from "axios";
import type { Comment } from "./PostWithComment";

const APP_URL = "http://localhost:4000";

export async function getCommentsForPostWithAxios(
  id: string
): Promise<Comment[]> {
  const response = await axios.get<Comment[]>(`${APP_URL}/comments/` + id, {
    params: {
      id: id,
    },
  });
  return response.data;
}
