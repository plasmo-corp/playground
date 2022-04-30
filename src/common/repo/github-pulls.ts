import type { Repo } from ".";

export class GitHubPulls {
  private repo: Repo;
  private cache: object = {};

  constructor(repo: Repo){
    this.repo = repo;
  }

  public async createPR(title: string, branch: string, body: string) {
    try {
      const pr = await this.repo.api.rest.pulls.create({
        owner: this.repo.owner,
        repo: this.repo.name,
        base: this.repo.mainBranch,
        title,
        head: `${this.repo.owner}:${branch}`,
        body
      });
  
      return pr.url;
    } catch (error) {
      return "Pull Request already exists."
    }
  }
}
