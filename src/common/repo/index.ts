export enum REPO_TYPES {
  GITHUB_REPO = 'github',
};

export class Repo {
  readonly name: string; // Repo Name
  readonly source: string; // GitHub, GitLab etc...

  constructor(name: string, source: string) {
    this.name = name;
    this.source = source; 
  }
}

export class GitHubRepo extends Repo {
  /**
   * Builds a GitHubRepo resource
   */
  constructor(name: string) {
    super(name, REPO_TYPES.GITHUB_REPO);
  }
}