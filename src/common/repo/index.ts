import { GitHubSearch } from "./github-search";

export class Repo {
  readonly name: string; // Repo Name
  private search: GitHubSearch;

  private cache: object = {};

  constructor(name: string) {
    this.name = name;
    this.search = new GitHubSearch(this);
  }

  public analyze() {
    this.search.search();
  }

  public getSearch() { return this.search }
}
