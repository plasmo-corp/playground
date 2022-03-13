import type { Repo } from "~common/repo";

const defaultFilter = (repo: Repo) => {
  return 0
}

type FilterFn = typeof defaultFilter

export type RepoFilter = {
  name: string;
  fn: FilterFn;
}

export type FilterMatchHeuristic = {
  name: string;
  score: number;
}