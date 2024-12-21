import { describe, expect, test, vi} from "vitest";

import app from "./index";

describe("root endpoints", () => {
  test("GET /", async () => {
    const res = await app.request("/");
    expect(await res.json()).toStrictEqual({ message: "Yo!" });
  });

  test("not found", async () => {
    const res = await app.request("/404");
    expect(res.status).toBe(404);
  });

  test("health - MAL is up", async () => {
    const MOCK_ENV = {
      MAL_CLIENT_ID: "test",
    };

    const expectedResponse = {
      ok: true,
      services: ["mal"],
    };

    global.fetch = vi.fn().mockResolvedValue(
      new Response(JSON.stringify({
        "hello": "world",
        "foo": "bar",
        "baz": 123,
      }), { status: 200 })
    );

    const res = await app.request("/health", {}, MOCK_ENV);

    expect(res.status).toBe(200);
    expect(await res.json()).toEqual(expectedResponse);
  });

  test("health - MAL is down", async () => {
    const MOCK_ENV = {
      MAL_CLIENT_ID: "test",
    };

    const expectedResponse = {
      message: "MAL is unavailable: 500",
      ok: false,
      services: [],
    };

    global.fetch = vi.fn().mockResolvedValue(
      new Response(JSON.stringify({
        "hello": "world",
        "foo": "bar",
        "baz": 123,
      }), { status: 500 })
    );

    const res = await app.request("/health", {}, MOCK_ENV);

    expect(res.status).toBe(200);
    expect(await res.json()).toEqual(expectedResponse);
  });
});
