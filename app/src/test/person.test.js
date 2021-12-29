import { describe, it, expect } from "@jest/globals";
import { Person } from "../classes/person";
import { evaluateRegex, InvalidRegexError } from "../util";

describe("Person", () => {
  it("should generate a person instance from properties list", () => {
    const content = [
      "Xuxa da Silva",
      "brasileira",
      "casada",
      "CPF 235.743.420-12",
      "residente e domiciliada a Rua dos bobos",
      "zero",
      "bairro Alphaville",
      "São Paulo.",
    ];
    const result = new Person(content);

    const expected = {
      nome: "Xuxa da Silva",
      nacionalidade: "Brasileira",
      estadoCivil: "Casada",
      documento: "23574342012",
      rua: "Rua dos bobos",
      numero: "zero",
      bairro: "Alphaville",
      estado: "São Paulo",
    };

    expect(JSON.parse(JSON.stringify(result))).toStrictEqual(expected);
  });
});
