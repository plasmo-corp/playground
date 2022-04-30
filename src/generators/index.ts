import type { Repo } from "~common/repo";
import NPMGenerator from "./npm"

const generators: { [key: string]: StepsGenerator } = {
  npm: NPMGenerator
}

const defaultGenerator = (repo: Repo): WorkflowSteps => {
  return []
}

type StepsGeneratorFn = typeof defaultGenerator

export type StepsGenerator = {
  name: string;
  fn: StepsGeneratorFn;
}

export type WorkflowSteps = object[]

export const generateWorkflowSteps = (repo: Repo, buildToolName: string): WorkflowSteps => {
  const generator = generators[buildToolName];

  return generator.fn(repo);
}
