import safeRegex from "safe-regex";
import { InvalidRegexError } from "./InvalidRegexError.js";

export const evaluateRegex = (exp) => {
  const isSafe = safeRegex(exp);

  if (!isSafe) throw new InvalidRegexError(exp);

  return exp;
};
