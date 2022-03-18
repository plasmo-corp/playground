import type { StepsGenerator } from "./index";
import type { Repo } from "~common/repo";


const generator: StepsGenerator = {
  name: 'npm',
  fn: (repo: Repo) => {
    return []
  }
}

export default generator;
