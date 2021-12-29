import { TextProcessorFluentApi } from "./textProcessorFluentAPI.js";

export class TextProcessorFacade {
  #textProcessorFluentAPI;
  constructor(text) {
    this.#textProcessorFluentAPI = new TextProcessorFluentApi(text);
  }

  getPeopleFromPDF() {
    return this.#textProcessorFluentAPI
      .extractPeopleData()
      .divideTextInColumns()
      .removeEmptyChars()
      .mapPerson()
      .build();
  }
}
