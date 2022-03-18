import { Repo } from "~common/repo";
import { genWorkflows, validateRepo } from "~lib/candidate";

const repos: string[] = [
  "plasmo-foss/playground"
]

for (let i = 0; i < repos.length; i++) {
  const repoName: string = repos[i];
  const repo = new Repo(repoName);
  console.log("Validating: ", repoName, " result: ", validateRepo(repoName));

  console.log("Generating Workflows: ", repoName, " results: ");
  console.log(genWorkflows(repo));
};
