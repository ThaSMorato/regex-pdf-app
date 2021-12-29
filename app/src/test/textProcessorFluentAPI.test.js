import { describe, it, expect } from "@jest/globals";
import { Person } from "../classes/person";
import { TextProcessorFluentApi } from "../classes/textProcessorFluentAPI";
import { mock } from "./mock/valid";

describe("TextProcessor API", () => {
  it("build", () => {
    const result = new TextProcessorFluentApi(mock).build();
    expect(result).toStrictEqual(mock);
  });

  it("extractPeopleData", () => {
    const result = new TextProcessorFluentApi(mock).extractPeopleData().build();

    const expected = [
      [
        "Xuxa da Silva, brasileira, casada, CPF 235.743.420-12, residente e ",
        "domiciliada a Rua dos bobos, zero, bairro Alphaville, São Paulo.",
      ].join("\n"),
      [
        "Arya Robbin, belga, casado, CPF 884.112.200-52, residente e ",
        "domiciliada a Av. paulista, 1400, bairro Consolação, São Paulo.",
      ].join("\n"),
      [
        "Júlia Menezes, brasileira, solteira, CPF 297.947.800-81, residente e ",
        "domiciliada a Av. dos Estados, 99, bairro Jardins, São Paulo.",
      ].join("\n"),
    ];

    expect(result).toStrictEqual(expected);
  });

  it("divideTextInColumns", () => {
    const content = [
      [
        "Xuxa da Silva, brasileira, casada, CPF 235.743.420-12, residente e ",
        "domiciliada a Rua dos bobos, zero, bairro Alphaville, São Paulo.",
      ].join("\n"),
      [
        "Arya Robbin, belga, casado, CPF 884.112.200-52, residente e ",
        "domiciliada a Av. paulista, 1400, bairro Consolação, São Paulo.",
      ].join("\n"),
      [
        "Júlia Menezes, brasileira, solteira, CPF 297.947.800-81, residente e ",
        "domiciliada a Av. dos Estados, 99, bairro Jardins, São Paulo.",
      ].join("\n"),
    ];

    const result = new TextProcessorFluentApi(content).divideTextInColumns().build();

    const expected = [
      [
        "Xuxa da Silva",
        " brasileira",
        " casada",
        " CPF 235.743.420-12",
        " residente e \ndomiciliada a Rua dos bobos",
        " zero",
        " bairro Alphaville",
        " São Paulo.",
      ],
      [
        "Arya Robbin",
        " belga",
        " casado",
        " CPF 884.112.200-52",
        " residente e \ndomiciliada a Av. paulista",
        " 1400",
        " bairro Consolação",
        " São Paulo.",
      ],
      [
        "Júlia Menezes",
        " brasileira",
        " solteira",
        " CPF 297.947.800-81",
        " residente e \ndomiciliada a Av. dos Estados",
        " 99",
        " bairro Jardins",
        " São Paulo.",
      ],
    ];

    expect(result).toStrictEqual(expected);
  });

  it("removeEmptyChars", () => {
    const content = [
      [
        "Xuxa da Silva",
        " brasileira",
        " casada",
        " CPF 235.743.420-12",
        " residente e \ndomiciliada a Rua dos bobos",
        " zero",
        " bairro Alphaville",
        " São Paulo.",
      ],
      [
        "Arya Robbin",
        " belga",
        " casado",
        " CPF 884.112.200-52",
        " residente e \ndomiciliada a Av. paulista",
        " 1400",
        " bairro Consolação",
        " São Paulo.",
      ],
      [
        "Júlia Menezes",
        " brasileira",
        " solteira",
        " CPF 297.947.800-81",
        " residente e \ndomiciliada a Av. dos Estados",
        " 99",
        " bairro Jardins",
        " São Paulo.",
      ],
    ];

    const result = new TextProcessorFluentApi(content).removeEmptyChars().build();

    const expected = [
      [
        "Xuxa da Silva",
        "brasileira",
        "casada",
        "CPF 235.743.420-12",
        "residente e domiciliada a Rua dos bobos",
        "zero",
        "bairro Alphaville",
        "São Paulo.",
      ],
      [
        "Arya Robbin",
        "belga",
        "casado",
        "CPF 884.112.200-52",
        "residente e domiciliada a Av. paulista",
        "1400",
        "bairro Consolação",
        "São Paulo.",
      ],
      [
        "Júlia Menezes",
        "brasileira",
        "solteira",
        "CPF 297.947.800-81",
        "residente e domiciliada a Av. dos Estados",
        "99",
        "bairro Jardins",
        "São Paulo.",
      ],
    ];

    expect(result).toStrictEqual(expected);
  });

  it("mapPerson", () => {
    const content = [
      [
        "Xuxa da Silva",
        "brasileira",
        "casada",
        "CPF 235.743.420-12",
        "residente e domiciliada a Rua dos bobos",
        "zero",
        "bairro Alphaville",
        "São Paulo.",
      ],
      [
        "Arya Robbin",
        "belga",
        "casado",
        "CPF 884.112.200-52",
        "residente e domiciliada a Av. paulista",
        "1400",
        "bairro Consolação",
        "São Paulo.",
      ],
      [
        "Júlia Menezes",
        "brasileira",
        "solteira",
        "CPF 297.947.800-81",
        "residente e domiciliada a Av. dos Estados",
        "99",
        "bairro Jardins",
        "São Paulo.",
      ],
    ];

    const result = new TextProcessorFluentApi(content).mapPerson().build();

    const expected = [
      new Person([
        "Xuxa da Silva",
        "brasileira",
        "casada",
        "CPF 235.743.420-12",
        "residente e domiciliada a Rua dos bobos",
        "zero",
        "bairro Alphaville",
        "São Paulo.",
      ]),
      new Person([
        "Arya Robbin",
        "belga",
        "casado",
        "CPF 884.112.200-52",
        "residente e domiciliada a Av. paulista",
        "1400",
        "bairro Consolação",
        "São Paulo.",
      ]),
      new Person([
        "Júlia Menezes",
        "brasileira",
        "solteira",
        "CPF 297.947.800-81",
        "residente e domiciliada a Av. dos Estados",
        "99",
        "bairro Jardins",
        "São Paulo.",
      ]),
    ];

    expect(result).toStrictEqual(expected);
  });
});
