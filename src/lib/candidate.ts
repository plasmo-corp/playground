#!/usr/bin/env node
import type { Octokit } from "octokit";
import { baseGitHubWorkflow } from "~common/github-base-workflow";
import { Repo } from "~common/repo";
import { FilterMatchHeuristic, calcHeuristics } from "~filters";
import { generateWorkflowSteps } from "~generators";
import yaml from 'js-yaml';

export type WorkflowFile = {
  name: string,
  workflow: object
}

export const validateRepo = (name: string): boolean => {
  // Evaluates if a repo is a candidate or not
  return false;
}

export const genWorkflows = async (repo: Repo): Promise<WorkflowFile[]> => {
  const toolNames = await findBuildTools(repo);

  return toolNames.map(toolName => {
    const workflow = {
      ...baseGitHubWorkflow,
      jobs: {
        ...baseGitHubWorkflow.jobs,
        build: {
          ...baseGitHubWorkflow.jobs.build,
          steps: [
            ...baseGitHubWorkflow.jobs.build.steps,
            ...generateWorkflowSteps(repo, toolName)
          ]
        }
      }
    }

    return { name: `${toolName}-deploy`, workflow };
  });
}


const findBuildTools = async (repo: Repo): Promise<string[]> => {
  const evaluations: FilterMatchHeuristic[] = await calcHeuristics(repo);

  return evaluations.filter(heurictic => heurictic.dataPoints.length > 0).map(heurictic => heurictic.name);
} 

const forkRepo = async (name: string, octokit: Octokit): Promise<Repo> => {
  const [owner, repoName] = name.trim().split("/");

  const fork = await octokit.rest.repos.createFork({ owner, repo: repoName });
  const defaultBranch = fork.data.default_branch;

  const repo = new Repo(fork.data.full_name, defaultBranch, octokit);
  repo.setOriginalOwner(owner);
  await repo.prepare();

  return repo;
}

export const processRepos = async (repos: string[], octokit: Octokit) => {
  var repoPrs = {};

  await Promise.all(repos.map(async sourceRepoName => {
    repoPrs[sourceRepoName] = [];

    const repo = await forkRepo(sourceRepoName, octokit);
  
    const workflowFiles = await genWorkflows(repo);
  
    console.debug("Validating: ", sourceRepoName, " result: ", validateRepo(sourceRepoName));

    console.debug("Generating Workflows: ", sourceRepoName, " results: ");
    console.debug(workflowFiles);
    console.debug("Yaml: ")

    await Promise.all(workflowFiles.map(async file => {
      console.debug("File: ", file.name)
      console.debug(yaml.dump(file.workflow))

      const branchName = `plasmo/${file.name}`;
      const branchSha = await repo.gitStorage.createBranch(branchName);
      console.debug("Created branch sha: ", branchSha);

      const commitSha = await repo.gitStorage.addFileToBranch(
        ".github/workflows/submit.yml", yaml.dump(file.workflow), branchSha
      );

      const updatedBranch = await repo.gitStorage.updateBranch(branchName, commitSha);

      console.debug("Updated branch: ", updatedBranch);

      const submitPrLink = `[Submit Pull Request to Root](https://github.com/${repo.originalOwner}/${repo.name}/compare/${repo.mainBranch}...${repo.owner}:${branchName})`
      const pr = await repo.pulls.createPR(
        `Generated Workflow for ${file.name}`,
        branchName,
        "Once you have validated that this pr is valid, you may click the link below to proceed to creating a pull request against the main repo. \n"
        + submitPrLink
      );

      repoPrs[sourceRepoName] = repoPrs[sourceRepoName].concat(pr);
    }));
  }));

  return repoPrs;
}
