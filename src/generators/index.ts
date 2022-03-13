import { Repo, REPO_TYPES } from "~common/repo";
import type { WorkflowSteps } from "~common/generatorType";
import GitHubWorkflowGenerators from './github';

export const generateWorkflowSteps = (repo: Repo, buildToolName: string): WorkflowSteps => {
  let steps = [];

  switch (repo.source) {
    case REPO_TYPES.GITHUB_REPO:
      const generator = GitHubWorkflowGenerators[buildToolName]

      steps = generator.fn(repo);
      break;
  
    default:
      break;
  }
  return steps;
}
