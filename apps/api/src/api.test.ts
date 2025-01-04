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
})
