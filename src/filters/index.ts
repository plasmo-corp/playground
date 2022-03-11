import type { Repo } from "~common/repo";

export type FilterMatchHeuristic = {
  name: string;
  score: number;
} 

export const matchFilters = (repo: Repo): FilterMatchHeuristic[] => {
  // TODO: IF THE SOURCE IS GITHUB, THEN GO TRHOUGH GITHUB MATCH FILTERS AND MATCH
  return [
    { name: 'Test0', score: 0 },
    { name: 'Test1', score: 1 },
    { name: 'Test2', score: 2 },
    { name: 'Test-1', score: -1 },
    { name: 'Test-other0', score: 0 }
  ];
}