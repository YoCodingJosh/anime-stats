import { Hono } from "hono";

const app = new Hono();

app.get("/", (c) => {
  return c.json({ message: "はいAPIです" });
});

export default app;
