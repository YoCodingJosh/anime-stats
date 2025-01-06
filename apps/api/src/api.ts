import { Hono } from "hono";
import { GetUserResponse } from "@repo/schemas";
import { JikanResponse, JikanResponseSchema} from "./jikan_schema";

const app = new Hono();

app.get("/", (c) => {
  return c.json({ message: "はいAPIです" });
});

app.post("/:username", async (c) => {
  const username = c.req.param("username");

  const rawResponse = await fetch(`https://api.jikan.moe/v4/users/${username}`);
  const response = await rawResponse.json();
  const jikanResponse: JikanResponse = JikanResponseSchema.parse(response);

  if ('status' in jikanResponse) {
    if (jikanResponse.status === 404) {
      return c.json({ message: "User not found" }, 404);
    } else {
      if ('messages' in jikanResponse && jikanResponse.messages) {
        const errorMessages = Object.values(jikanResponse.messages).flat().join(", ");
        return c.json({ message: errorMessages, status: jikanResponse.status }, 500);
      } else {
        return c.json({ message: "An error occurred in an internal service.", status: jikanResponse.status, error: jikanResponse.message }, 500);
      }
    }
  }

  const user: GetUserResponse = {
    username: jikanResponse.data.username,
    avatar: jikanResponse.data.images.webp.image_url,
    joined: jikanResponse.data.joined,
    profile: jikanResponse.data.url,
  };

  return c.json(user);
});

export default app;
