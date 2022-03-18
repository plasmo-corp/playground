import type { Repo } from "~common/repo";
import NpmFilter from "./npm";

const filters: { [key: string]: RepoFilter } = {
  npm: NpmFilter,
}

const defaultFilter = (repo: Repo) => {
  return []
}

type FilterFn = typeof defaultFilter

export type RepoFilter = {
  name: string;
  fn: FilterFn;
}

export type FilterMatchHeuristic = {
  name: string;
  dataPoints: any[];
}

export const calcHeuristics = (repo: Repo): FilterMatchHeuristic[] => {
  let heuristics: FilterMatchHeuristic[] = [];

  for (const filterName in filters) {
    if (Object.prototype.hasOwnProperty.call(filters, filterName)) {
      const filter = filters[filterName];

      heuristics.push({
        name: filter.name,
        dataPoints: filter.fn(repo)
      });
    }
  }

  return heuristics;
}
