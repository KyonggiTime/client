export const zeroFill = (numberString: string, stringLength: number) => {
  if (stringLength - numberString.length <= 0)
    return numberString;
  return "0".repeat(stringLength - numberString.length) + numberString;
}
