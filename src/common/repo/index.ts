import type { Octokit } from "octokit";
import { GitHubSearch } from "./github-search";

export class Repo {
  readonly name: string; // Repo Name
  private cache: object = {};

  public api: Octokit;
  public search: GitHubSearch;

  constructor(name: string, api: Octokit) {
    this.name = name;
    this.api = api;
    this.search = new GitHubSearch(this);
  }

  public async analyze() {
    await this.search.search();

    return;
  }
}
