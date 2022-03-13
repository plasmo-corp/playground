import type { StepsGenerator } from "~common/generatorType";
import NPMGenerator from "./npm"

const generators: { [key: string]: StepsGenerator } = {
  npm: NPMGenerator
}

export default generators;