import { Octokit } from "octokit";
import { retry } from "@octokit/plugin-retry";
import { throttling } from "@octokit/plugin-throttling";

import apiConfig from "~lib/api-config";
import { processRepos } from "~lib/candidate";

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
    onSecondaryRateLimit: (retryAfter, options) => {
      // does not retry, only logs a warning
      octokit.log.warn(
        `SecondaryRateLimit detected for request ${options.method} ${options.url}`
      );
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

// Can fetch these from the Air table repo
// const repos: string[] = [
//   "plasmo-foss/playground"
// ]
const repos = process.argv.slice(2);

// Need a list of actual repos and we want to fork them to plasmo-foss
processRepos(repos, octokit).then(data => {
  console.log("Created PRS: ", data);
});
