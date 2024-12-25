import { describe, expect, test } from "vitest"

import api from "./api"

describe("api endpoints", () => {
  test("GET /", async () => {
    const res = await api.request("/")
    expect(await res.json()).toStrictEqual({ message: "はいAPIです" })
  })
})

