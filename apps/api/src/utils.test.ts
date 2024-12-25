import { afterEach, describe, expect, test, vi } from "vitest"

import { Context } from "hono"
import { malFetch } from "./utils"
import { WatchlistEndpointResponseListStatusSchema, WatchlistEndpointResponseListStatus } from "./mal_schema"

describe("utility functions", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  })

  test("malFetch with normal schema", async () => {
    const myObject: WatchlistEndpointResponseListStatus = {
      status: "watching",
      score: 10,
      num_episodes_watched: 12,
      is_rewatching: false,
      updated_at: "2021-10-01",
    }

    global.fetch = vi.fn().mockResolvedValue(
      new Response(JSON.stringify(myObject), { status: 200 })
    )

    const c: Partial<Context> = { env: { MAL_CLIENT_ID: "test" } }

    const response = await malFetch("/test", c as Context, WatchlistEndpointResponseListStatusSchema)

    expect(response).toStrictEqual({
      data: myObject,
      response: { status: 200 }
    })
  })

  test("malFetch with invalid schema", async () => {
    const myObject = {
      status: "tacos",
      score: 10,
      num_episodes_watched: '12',
      is_rewatching: false,
      updated_at: "2021-10-01",
    }

    global.fetch = vi.fn().mockResolvedValue(
      new Response(JSON.stringify(myObject), { status: 200 })
    )

    const c: Partial<Context> = { env: { MAL_CLIENT_ID: "test" } }

    const response = await malFetch("/test", c as Context, WatchlistEndpointResponseListStatusSchema)

    expect(response).toStrictEqual({
      data: undefined,
      response: { status: 200 }
    })
  })
})

