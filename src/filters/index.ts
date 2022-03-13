import type { FilterMatchHeuristic } from "~common/filterType";
import { Repo, REPO_TYPES } from "~common/repo";
import GitHubFilters from "./github";


export const calcHeuristics = (repo: Repo): FilterMatchHeuristic[] => {
  const source: string = repo.source;
  let heuristics: FilterMatchHeuristic[] = [];

  switch (source) {
    case REPO_TYPES.GITHUB_REPO:
      for (const filterName in GitHubFilters) {
        if (Object.prototype.hasOwnProperty.call(GitHubFilters, filterName)) {
          const filter = GitHubFilters[filterName];

          heuristics.push({
            name: filter.name,
            score: filter.fn(repo)
          });
        }
      }
      break;
  
    default:
      break;
  }
  
  return heuristics;
}
