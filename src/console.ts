import { Octokit } from "octokit";
import { retry } from "@octokit/plugin-retry";
import { throttling } from "@octokit/plugin-throttling";

import { Repo } from "~common/repo";
import apiConfig from "~lib/api-config";
import { genWorkflows, validateRepo } from "~lib/candidate";

const RetryAndThrottleOctokit = Octokit.plugin(retry, throttling);

var octokit =  new RetryAndThrottleOctokit({
  ...apiConfig,
  throttle: {
    onRateLimit: (retryAfter, { method, url, request }) => {
      octokit.log.warn(
        `Request quota exhausted for request ${method} ${url}`
      );

      if (request.retryCount === 0) {
        // only retries once
        octokit.log.info(`Retrying after ${retryAfter} seconds!`);
        return true;
      }
      return false;
    },
    onAbuseLimit: (options) => {
      // does not retry, only logs a warning
      octokit.log.warn(
        `Abuse detected for request ${options.method} ${options.url}`
      );
    },
  },
  retry: {
    doNotRetry: ["429"],
  },
});

const repos: string[] = [
  "plasmo-foss/playground"
]

for (let i = 0; i < repos.length; i++) {
  const repoName: string = repos[i];
  const repo = new Repo(repoName, octokit);

  genWorkflows(repo).then(response => {
    console.log("Validating: ", repoName, " result: ", validateRepo(repoName));

    console.log("Generating Workflows: ", repoName, " results: ");
    console.log(response);
  });
};
