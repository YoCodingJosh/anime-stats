import { afterEach, describe, expect, test, vi } from "vitest"

import api from "./api"

describe("api endpoints", () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })
  
  test("GET /", async () => {
    const res = await api.request("/")
    expect(await res.json()).toStrictEqual({ message: "はいAPIです" })
  })

  test("POST /:username (found user)", async () => {
    // Set up mock response for Jikan API
    global.fetch = vi.fn().mockResolvedValue(
      new Response(JSON.stringify({
        data: {
          mal_id: 12345678,
          username: "codingjosh",
          url: "https://myanimelist.net/profile/codingjosh",
          images: {
            jpg: {
              image_url: "https://cdn.myanimelist.net/images/userimages/12345678.jpg",
            },
            webp: {
              image_url: "https://cdn.myanimelist.net/images/userimages/12345678.webp",
            },
          },
          last_online: "2021-01-01T00:00:00Z",
          gender: "M",
          birthday: "1990-01-01",
          location: "USA",
          joined: "2021-01-01T00:00:00Z",
        },
      }), { status: 200 })
    )

    const res = await api.request("/codingjosh", { method: "POST" })

    expect(res.status).toBe(200)

    expect(await res.json()).toStrictEqual({
      username: "codingjosh",
      avatar: "https://cdn.myanimelist.net/images/userimages/12345678.webp",
      joined: "2021-01-01T00:00:00Z",
      profile: "https://myanimelist.net/profile/codingjosh",
    })
  })

  test("POST /:username (user not found)", async () => {
    // Set up mock response for Jikan API
    global.fetch = vi.fn().mockResolvedValue(
      new Response(JSON.stringify({
        status: 404,
        type: "not found",
        message: "User not found",
        error: "User not found",
      }), { status: 404 })
    )

    const res = await api.request("/notfound", { method: "POST" })

    expect(res.status).toBe(404)
    expect(await res.json()).toStrictEqual({ message: "User not found" })
  })

  test("POST /:username/initiate (private list)", async () => {
    const MOCK_ENV = {
      MAL_CLIENT_ID: "test",
    }

    // Set up mock response for MyAnimeList API
    global.fetch = vi.fn().mockResolvedValue(
      new Response(JSON.stringify({
        response: {
          status: 403,
        },
      }), { status: 403 })
    )

    const res = await api.request("/notfound/initiate", { method: "POST" }, MOCK_ENV)

    expect(res.status).toBe(403)
    expect(await res.json()).toStrictEqual({ data: [], message: "user's list might be private" })
  })

  test("POST /:username/initiate (public list)", async () => {
    const MOCK_ENV = {
      MAL_CLIENT_ID: "test",
    }

    const theData = {
      data: [
        {
          id: 123456,
          title: "My Anime",
          main_picture: {
            medium: "https://cdn.myanimelist.net/images/anime/123456.jpg",
          },
          start_date: "2021-01-01",
          end_date: "2021-12-31",
          mean: 8.5,
          rank: 1234,
          popularity: 1234,
          num_list_users: 1234,
          num_scoring_users: 1234,
          nsfw: false,
          created_at: "2021-01-01T00:00:00Z",
          updated_at: "2021-01-01T00:00:00Z",
          media_type: "TV",
          status: "finished",
          genres: ["Action", "Adventure"],
          list_status: {
            is_rewatching: false,
            num_times_rewatched: 0,
            rewatch_value: 0,
          },
          num_episodes: 12,
          start_season: {
            year: 2021,
            season: "winter",
          },
          source: "Manga",
          average_episode_duration: 24,
          rating: "PG-13",
          pictures: {
            small: "https://cdn.myanimelist.net/images/anime/123456.jpg",
          },
          related_anime: [],
          studios: [],
          statistics: {
            num_list_users: 1234,
            status: {
              watching: 1234,
              completed: 1234,
              on_hold: 1234,
              dropped: 1234,
              plan_to_watch: 1234,
              num_items: 1234,
            },
            score: {
              distribution: {
                1: 1234,
                2: 1234,
                3: 1234,
                4: 1234,
                5: 1234,
                6: 1234,
                7: 1234,
                8: 1234,
                9: 1234,
                10: 1234,
              },
            },
          },
        },
      ],
    }

    // Set up mock response for MyAnimeList API
    global.fetch = vi.fn().mockResolvedValue(
      new Response(JSON.stringify(theData), { status: 200 })
    )

    const res = await api.request("/a_cool_user/initiate", { method: "POST" }, MOCK_ENV)

    expect(res.status).toBe(200)
    expect(await res.json()).toEqual({
      token: expect.any(String), // how to validate UUID?
      // data: theData.data,
    })
  })
})
