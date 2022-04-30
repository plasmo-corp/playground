import type { StepsGenerator } from "./index";
import type { Repo } from "~common/repo";


const generator: StepsGenerator = {
  name: 'npm',
  fn: (repo: Repo) => {
    return [
      {uses: "actions/checkout@v2"},
      {run: "yarn install"},
      { run: "yarn build"},
      { name: "Browser Platform Publish" },
      { uses: "plasmo-corp/bpp@v2" },
      {
        with: {
          keys: "${{ secrets.SUBMIT_KEYS }}"
        }
      }
    ]
  }
}

export default generator;
