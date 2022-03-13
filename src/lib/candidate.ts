#!/usr/bin/env node
import type { FilterMatchHeuristic } from "~common/filterType";
import { baseGitHubWorkflow } from "~common/githubType";
import { REPO_TYPES, Repo } from "~common/repo";
import { calcHeuristics } from "~filters";
import { generateWorkflowSteps } from "~generators";

export type WorkflowFile = {
  name: string,
  workflow: object
}

export const validateRepo = (name: string, type: REPO_TYPES): boolean => {
  // Evaluates if a repo is a candidate or not
  return false;
}

export const genWorkflows = (repo: Repo): WorkflowFile[] => {
  let toolNames = findBuildTools(repo);
  let workflows = [];
  
  // Only Github Repos are supported for now
  switch (repo.source) {
    case REPO_TYPES.GITHUB_REPO:
      toolNames.forEach(toolName => {
        const workflow = {
          ...baseGitHubWorkflow,
          jobs: {
            ...baseGitHubWorkflow.jobs,
            build: {
              ...baseGitHubWorkflow.jobs.build,
              steps: baseGitHubWorkflow.jobs.build.steps.concat(
                generateWorkflowSteps(repo, toolName)
              )
            }
          }
        }

        workflows.push({ name: `${toolName}_deploy`, workflow })
      });
      break;
  
    default:
      break;
  }

  return workflows;
}


const findBuildTools = (repo: Repo): string[] => {
  let tools = [];

  const evaluations: FilterMatchHeuristic[] = calcHeuristics(repo);

  evaluations.forEach(heurictic => {
    if (heurictic.score > 0) {
      // TODO: better filtering
      tools.push(heurictic.name);
    }
  });

  return tools;
}
