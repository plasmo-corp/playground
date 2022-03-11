#!/usr/bin/env node
import type { REPO_TYPES, Repo } from "~common/repo";

export const validateRepo = (name: string, type: REPO_TYPES): boolean => {
  // Evaluates if a repo is a candidate or not
  return false;
}

export const genActions = (repo: Repo): [any] => {
  return [{ step: "Test" }];
}
