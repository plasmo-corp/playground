#!/usr/bin/env node
import { REPO_TYPES, Repo } from "~common/repo";
import { genGithubActions } from "~generators";

export const validateRepo = (name: string, type: REPO_TYPES): boolean => {
  // Evaluates if a repo is a candidate or not
  return false;
}

export const genActions = (repo: Repo): any[] => {
  // Only Github Repos are supported for now
  if (repo.source === REPO_TYPES.GITHUB_REPO) {
    return genGithubActions(repo);
  }

  return [{}];
}
