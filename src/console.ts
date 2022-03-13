import { GitHubRepo, REPO_TYPES } from "~common/repo";
import { genWorkflows, validateRepo } from "~lib/candidate";

const repos: string[] = [
  "plasmo-foss/playground"
]

for (let i = 0; i < repos.length; i++) {
  const repoName: string = repos[i];
  const repo = new GitHubRepo(repoName);
  console.log("Validating: ", repoName, " result: ", validateRepo(repoName, REPO_TYPES.GITHUB_REPO));

  console.log("Generating Workflows: ", repoName, " results: ");
  console.log(genWorkflows(repo));
};
