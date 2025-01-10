import { Hono } from "hono";
import { GetUserResponse, JikanResponse, JikanResponseSchema, WatchlistEndpointResponseSchema } from "@repo/schemas";
import { malFetch } from "./utils";

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

app.post("/:username/initiate", async (c) => {
  const username = c.req.param("username");
  
  const token = crypto.randomUUID();

  const url = `https://api.myanimelist.net/v2/users/${username}/animelist?fields=id,title,main_picture,start_date,
  end_date,mean,rank,popularity,num_list_users,num_scoring_users,nsfw,created_at,updated_at,media_type,status,genres,
  list_status{is_rewatching,num_times_rewatched,rewatch_value},num_episodes,start_season,source,
  average_episode_duration,rating,pictures,related_anime,studios,statistics&limit=1000&nsfw=true`;

  const watchlistResponse = await malFetch(url, c, WatchlistEndpointResponseSchema);

  // TODO: paginate through the watchlist if there are more than 1000 entries (there will be a "paging" object in the response)

  // If the response is a 403, it means the user's list is private.
  // We'll just return an empty list with a 403 status code.
  if (watchlistResponse.response.status === 403) {
    return c.json({ data: [], message: "user's list might be private" }, 403);
  }

  // TODO: store the data in Cloudflare KV with the token as the key
  
  return c.json({
    token,
    data: watchlistResponse.data, // TODO: this is only temporary and broken lmao
  });
});

export default app;
