import type { Repo } from "~common/repo";

const defaultGenerator = (repo: Repo): WorkflowSteps => {
  return []
}

type StepsGeneratorFn = typeof defaultGenerator

export type StepsGenerator = {
  name: string;
  fn: StepsGeneratorFn;
}

export type WorkflowSteps = object[]

