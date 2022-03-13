import type { RepoFilter } from "~common/filterType";
import type { Repo } from "~common/repo";

const Filter: RepoFilter = {
  name: 'npm',
  fn: (repo: Repo) => {
    return 1
  }
}

export default Filter;