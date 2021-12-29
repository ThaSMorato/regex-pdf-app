import { evaluateRegex } from "../util/index.js";
import { Person } from "./person.js";

export class TextProcessorFluentApi {
  #content;

  constructor(content) {
    this.#content = content;
  }

  extractPeopleData() {
    const matchPerson = evaluateRegex(/(?<=contratada:\s{1}|contratante:\s{1})(?!\s)(.*\n.*)$/gim);
    const onlyPerson = this.#content.match(matchPerson);

    this.#content = onlyPerson;

    return this;
  }

  divideTextInColumns() {
    const splitRegex = evaluateRegex(/,/);
    this.#content = this.#content.map((line) => line.split(splitRegex));
    return this;
  }

  removeEmptyChars() {
    const trimSpaces = evaluateRegex(/^\s+|\n|\s+$/g);
    this.#content = this.#content.map((line) => line.map((item) => item.replace(trimSpaces, "")));
    return this;
  }

  mapPerson() {
    this.#content = this.#content.map((line) => new Person(line));
    return this;
  }

  build() {
    return this.#content;
  }
}
