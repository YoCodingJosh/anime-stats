import { afterEach, describe, expect, test, vi } from "vitest";

import api from "./api";

describe("api endpoints", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  test("GET /", async () => {
    const res = await api.request("/");
    expect(await res.json()).toStrictEqual({ message: "はいAPIです" });
  });

  test("POST /:username (found user)", async () => {
    // Set up mock response for Jikan API
    global.fetch = vi.fn().mockResolvedValue(
      new Response(
        JSON.stringify({
          data: {
            mal_id: 12345678,
            username: "codingjosh",
            url: "https://myanimelist.net/profile/codingjosh",
            images: {
              jpg: {
                image_url:
                  "https://cdn.myanimelist.net/images/userimages/12345678.jpg",
              },
              webp: {
                image_url:
                  "https://cdn.myanimelist.net/images/userimages/12345678.webp",
              },
            },
            last_online: "2021-01-01T00:00:00Z",
            gender: "M",
            birthday: "1990-01-01",
            location: "USA",
            joined: "2021-01-01T00:00:00Z",
          },
        }),
        { status: 200 }
      )
    );

    const res = await api.request("/codingjosh", { method: "POST" });

    expect(res.status).toBe(200);

    expect(await res.json()).toStrictEqual({
      username: "codingjosh",
      avatar: "https://cdn.myanimelist.net/images/userimages/12345678.webp",
      joined: "2021-01-01T00:00:00Z",
      profile: "https://myanimelist.net/profile/codingjosh",
    });
  });

  test("POST /:username (user not found)", async () => {
    // Set up mock response for Jikan API
    global.fetch = vi.fn().mockResolvedValue(
      new Response(
        JSON.stringify({
          status: 404,
          type: "not found",
          message: "User not found",
          error: "User not found",
        }),
        { status: 404 }
      )
    );

    const res = await api.request("/notfound", { method: "POST" });

    expect(res.status).toBe(404);
    expect(await res.json()).toStrictEqual({ message: "User not found" });
  });

  test("POST /:username/initiate (private list)", async () => {
    const MOCK_ENV = {
      MAL_CLIENT_ID: "test",
    };

    // Set up mock response for MyAnimeList API
    global.fetch = vi.fn().mockResolvedValue(
      new Response(
        JSON.stringify({
          response: {
            status: 403,
          },
        }),
        { status: 403 }
      )
    );

    const res = await api.request(
      "/notfound/initiate",
      { method: "POST" },
      MOCK_ENV
    );

    expect(res.status).toBe(403);
    expect(await res.json()).toStrictEqual({
      data: [],
      message: "user's list might be private",
    });
  });

  test("POST /:username/initiate (public list)", async () => {
    const MOCK_ENV = {
      MAL_CLIENT_ID: "test",
    };

    const theData = {
      data: [
        {
          node: {
            id: "123456",
            title: "My Anime",
            main_picture: {
              medium: "https://cdn.myanimelist.net/images/anime/123456.jpg",
              large: "https://cdn.myanimelist.net/images/anime/123456.jpg",
            },
            start_date: "2021-01-01",
            end_date: "2021-12-31",
            mean: 8.5,
            rank: 1234,
            popularity: 1234,
            num_list_users: 1234,
            num_scoring_users: 1234,
            nsfw: "white",
            created_at: "2021-01-01T00:00:00Z",
            updated_at: "2021-01-01T00:00:00Z",
            media_type: "tv",
            status: "finished_airing",
            genres: [
              { id: 1, name: "Action" },
              { id: 2, name: "Adventure" },
            ],
            num_episodes: 12,
            start_season: {
              year: 2021,
              season: "winter",
            },
            source: "manga",
            average_episode_duration: 24,
            rating: "PG-13",
            studios: [],
          },
          list_status: {
            status: "completed",
            score: 8,
            num_episodes_watched: 12,
            is_rewatching: false,
            updated_at: "2022-01-01T00:00:00Z",
            num_times_rewatched: 0,
            rewatch_value: 0,
          },
        },
      ],
      paging: {},
    };

    // Set up mock response for MyAnimeList API
    global.fetch = vi
      .fn()
      .mockResolvedValue(
        new Response(JSON.stringify(theData), { status: 200 })
      );

    const res = await api.request(
      "/a_cool_user/initiate",
      { method: "POST" },
      MOCK_ENV
    );

    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({
      token: expect.any(String), // UUID validation can use expect.stringMatching(/^[0-9a-fA-F-]{36}$/)
      data: theData,
    });
  });
});
