#!/usr/bin/env node
import { baseGitHubWorkflow } from "~common/github-base-workflow";
import type { Repo } from "~common/repo";
import { FilterMatchHeuristic, calcHeuristics } from "~filters";
import { generateWorkflowSteps } from "~generators";

export type WorkflowFile = {
  name: string,
  workflow: object
}

export const validateRepo = (name: string): boolean => {
  // Evaluates if a repo is a candidate or not
  return false;
}

export const genWorkflows = (repo: Repo): WorkflowFile[] => {
  let toolNames = findBuildTools(repo);
  let workflows = [];

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

    workflows.push({ name: `${toolName}-deploy`, workflow })
  });

  return workflows;
}


const findBuildTools = (repo: Repo): string[] => {
  let tools = [];

  const evaluations: FilterMatchHeuristic[] = calcHeuristics(repo);

  evaluations.forEach(heurictic => {
    if (heurictic.dataPoints.length > 0) {
      // TODO: better filtering
      tools.push(heurictic.name);
    }
  });

  return tools;
}
