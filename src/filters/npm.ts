import type { RepoFilter } from "./index";
import type { Repo } from "~common/repo";

const SEARCH_TERMS = ['eslint', "build", "lint"];

const Filter: RepoFilter = {
  name: 'npm',
  searchTerms: SEARCH_TERMS,
  fn: (repo: Repo) => {
    // Look through search results. If identify package.json file then big points

    // var searchResults = repo.search.getResultsFor(SEARCH_TERMS);

    // for (let index = 0; index < SEARCH_TERMS.length; index++) {
    //   const term = SEARCH_TERMS[index];
      
    //   console.log("For npm search term: ", term, " got result: ", searchResults[index]);
    // }

    // TODO: actually do something meaningful with the results
    return ['package.json']
  }
}

export default Filter;