import { evaluateRegex } from "../util/index.js";

export class Person {
  constructor([nome, nacionalidade, estadoCivil, documento, rua, numero, bairro, estado]) {
    const firstLetterExp = evaluateRegex(/^(\w{1})([a-zA-Z]+$)/g);
    const street = evaluateRegex(/(?<=\sa\s).*$/);
    const district = evaluateRegex(/(?<=\s).*$/);

    const formatFirstLetter = (prop) =>
      prop.replace(
        firstLetterExp,
        (fullMatch, group1, group2, index) => `${group1.toUpperCase()}${group2.toLowerCase()}`
      );

    this.nome = nome;
    this.nacionalidade = formatFirstLetter(nacionalidade);
    this.estadoCivil = formatFirstLetter(estadoCivil);
    this.documento = documento.replace(evaluateRegex(/\D/g), "");
    this.rua = rua.match(street).join();
    this.numero = numero;
    this.bairro = bairro.match(district).join();
    this.estado = estado.replace(evaluateRegex(/\.$/), "");
  }
}
