import type { GitHubRepo } from "~common/repo";
import { FilterMatchHeuristic, matchFilters } from "~filters";

export const genGithubActions = (repo: GitHubRepo): any[] => {
  const evaluations: FilterMatchHeuristic[] = matchFilters(repo);
  let actions: any[] = [];

  evaluations.forEach(filterHeuristic => {
    if (filterHeuristic.score > 0) {
      // TODO: generate the actions for this filter/process
      actions.push({ name: filterHeuristic.name });
    }
  });

  return actions;
}
