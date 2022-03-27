import type { RepoFilter } from "./index";
import type { Repo } from "~common/repo";

const Filter: RepoFilter = {
  name: 'npm',
  searchTerms: ['package.json'],
  fn: (repo: Repo) => {
    return ['package.json']
  }
}

export default Filter;