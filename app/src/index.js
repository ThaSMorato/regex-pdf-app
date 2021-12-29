import { readFile } from "fs/promises";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { PdfData as pdf } from "pdfdataextract";

import { TextProcessorFacade } from "./classes/textProcessorFacade.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const pdfDir = join(__dirname, "./../../docs/contrato.pdf");

const dataBuffer = await readFile(pdfDir);
const data = await pdf.extract(dataBuffer);

const instance = new TextProcessorFacade(data.text[0]);
const people = instance.getPeopleFromPDF();

console.log(people);
