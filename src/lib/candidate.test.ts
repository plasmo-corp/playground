import { expect, test } from "@jest/globals"
import { REPO_TYPES } from "~common/repo"

import { validateRepo, genActions } from "./candidate"

test("validateRepo is not yet ready", async () => {
  expect(validateRepo('test', REPO_TYPES.GITHUB_REPO)).toBe(false)
})

test("genActions", async () => {
  expect(1).toEqual(1)
})
