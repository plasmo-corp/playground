import type { GitHubRepo } from "~common/repo";
import type { FilterMatchHeuristic } from "~common/filterType";
import { calcHeuristics } from "~filters";

export const genGithubActions = (repo: GitHubRepo): any[] => {
  const evaluations: FilterMatchHeuristic[] = calcHeuristics(repo);
  let actions: any[] = [];

  evaluations.forEach(filterHeuristic => {
    if (filterHeuristic.score > 0) {
      // TODO: generate the actions for this filter/process
      actions.push({ name: filterHeuristic.name });
    }
  });

  return actions;
}
