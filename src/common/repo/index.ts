import type { Octokit } from "octokit";
import { GitStorage } from "./git-storage";
import { GitHubPulls } from "./github-pulls";
import { GitHubSearch } from "./github-search";

export class Repo {
  private cache: object = {};

  readonly path: string; // Repo path e.i username/repo_name
  readonly owner: string;
  readonly name: string;
  readonly mainBranch: string;

  public originalOwner: string;
  public baseSha: string = "";
  public branches: string[];

  public api: Octokit;
  public search: GitHubSearch;
  public gitStorage: GitStorage;
  public pulls: GitHubPulls;

  constructor(path: string, mainBranch: string, api: Octokit) {
    this.path = path;
    this.owner = path.split("/")[0];
    this.name = path.split("/")[1];
    this.api = api;
    this.mainBranch = mainBranch;
    
    this.search = new GitHubSearch(this);
    this.gitStorage = new GitStorage(this);
    this.pulls = new GitHubPulls(this);
  }

  public setOriginalOwner(owner: string): string {
    return this.originalOwner = owner;
  }

  public async prepare() {
    var ref = await this.api.rest.git.getRef({
      owner: this.owner, repo: this.name, ref: `heads/${this.mainBranch}`
    });
    
    return this.baseSha = ref.data.object.sha;
  }

  public async analyze() {
    await this.search.search();

    return;
  }
}
