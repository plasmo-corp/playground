
import type { RepoFilter } from "~common/filterType";
import NpmFilter from "./npm";

const filters: { [key: string]: RepoFilter } = {
  npm: NpmFilter,
}

export default filters;
