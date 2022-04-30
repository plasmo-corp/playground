import type { Repo } from ".";

export enum BlobEncoding {
  UTF_8 = "utf-8",
  BSSE_64 = "base64"
}

export enum TreeItemType {
  BLOB = "blob",
  TREE = "tree",
  COMMIT = "commit"
}

export enum FileMode {
  NORMAL = "100644",
  EXECUTABLE = "100755",
  SUBDIRECTORY = "040000",
  SUBMODULE = "160000",
  SYMLINK = "120000"
}

export const Author = {
  name: "Plasmo Bot",
  email: "plasmo-github@plasmo.com",
  date: "2022-04-14T06:47:43.378Z"
}

// const d = new Date();
//     let text = d.toISOString();
export class GitStorage {
  private repo: Repo;

  constructor(repo: Repo){
    this.repo = repo;
  }

  public async branchExists(name: string): Promise<boolean> {
    try {
      const branch = await this.repo.api.rest.repos.getBranch({
        owner: this.repo.owner,
        repo: this.repo.name,
        branch: name
      });

      return branch.data.name === name;
    } catch (error) {
      return false
    }
  }

  public async createBranch(name: string): Promise<string> {
    let  existingBranch = await this.branchExists(name);

    if (existingBranch) {
      const branchRef = await this.repo.api.rest.git.getRef({
        owner: this.repo.owner, repo: this.repo.name, ref: `heads/${name}`
      });

      return branchRef.data.object.sha;
    } else {
      console.debug("Creating new branch: ", `heads/${name}`);

      const newBranch = await this.repo.api.rest.git.createRef({
        owner: this.repo.owner,
        repo: this.repo.name,
        ref: `refs/heads/${name}`,
        sha: this.repo.baseSha
      });

      return newBranch.data.object.sha;
    }
  }

  public async updateBranch(name: string, sha: string)  {
    var ref = await this.repo.api.rest.git.updateRef({
      owner: this.repo.owner,
      repo: this.repo.name,
      ref: `heads/${name}`,
      sha,
      force: true
    })

    return ref.data.url;
  }

  public async commitTree(treeSha: string, parents: string[], message: string) {
    const commit = await this.repo.api.rest.git.createCommit({
      owner: this.repo.owner,
      repo: this.repo.name,
      message,
      author: Author,
      parents,
      tree: treeSha,
      ...(process.env.PGP_SIGNATURE ? {} : { signature: process.env.PGP_SIGNATURE })
    });

    return commit.data.sha;
  }

  public async addFileToBranch(path: string, content: string, branchSha: string): Promise<string> {
    const blob = await this.repo.api.rest.git.createBlob({
      owner: this.repo.owner,
      repo: this.repo.name,
      encoding: BlobEncoding.UTF_8,
      content
    });

    const tree = await this.repo.api.rest.git.createTree({
      owner: this.repo.owner,
      repo: this.repo.name,
      tree: [
        {
          path,
          mode: FileMode.NORMAL,
          type: TreeItemType.BLOB,
          sha: blob.data.sha
        }
      ],
      base_tree: branchSha
    });

    return await this.commitTree(tree.data.sha, [branchSha], `Add ${path}`)
  }
}
