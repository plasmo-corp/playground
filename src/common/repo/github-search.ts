import type { Repo } from ".";

const SearchDataObj = {
  query: "",
  count: 0,
  result: null,
}

export type SearchData = typeof SearchDataObj;

export class GitHubSearch {
  private repo: Repo;
  private searchTerms: string[] = [];
  private cache: object = {};

  constructor(repo: Repo){
    this.repo = repo;
  }

  public addSearchTerm(term: string) {
    this.searchTerms.push(term)
  }

  public addSearchTerms(terms: string[]) {
    this.searchTerms = this.searchTerms.concat(terms);
  }

  public getResultsFor(terms: string[]) : SearchData[] {
    var results: SearchData[] = [];

    terms.forEach(term => {
      if (this.cache[term]) {
        results.push({ ...SearchDataObj, ...this.cache[term]})
      }
    });

    return results;
  }

  public search() {
    // Search github for each of the terms and report any relevant data
  }
}