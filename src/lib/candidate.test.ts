import { expect, test } from "@jest/globals"

import { validateRepo, genWorkflows } from "./candidate"

test("validateRepo is not yet ready", async () => {
  expect(validateRepo('test')).toBe(false)
})

test("genActions", async () => {
  expect(1).toEqual(1)
})
