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
  searchTerms: string[];
  fn: FilterFn;
}

export type FilterMatchHeuristic = {
  name: string;
  dataPoints: any[];
}

const prepareSearch = (repo: Repo) => {
  for (const filterName in filters) {
    if (Object.prototype.hasOwnProperty.call(filters, filterName)) {
      const filter = filters[filterName];

      repo.getSearch().addSearchTerms(filter.searchTerms);
    }
  }
}

export const calcHeuristics = (repo: Repo): FilterMatchHeuristic[] => {
  // Prepare search related filterings
  prepareSearch(repo);

  // Generate Repo analysis based on filters
  repo.analyze();

  // Gather heuristics per filter
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
