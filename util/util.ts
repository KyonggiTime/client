export const zeroFill = (numberString: string, stringLength: number) => {
  if (stringLength - numberString.length <= 0)
    return numberString;
  return "0".repeat(stringLength - numberString.length) + numberString;
}

export const splitTime = (timeString: string) => {
  const result: Record<string, string[]> = {
    '월': [],
    '화': [],
    '수': [],
    '목': [],
    '금': [],
  };
  timeString.split(' ')
    .reduce((savedDay: string, currentValue: string) => {
      if (currentValue == '월' || currentValue == '화' || currentValue == '수' || currentValue == '목' || currentValue == '금')
        return currentValue;
      result[savedDay].push(currentValue);
      return savedDay;
    });
  return result;
}

export const hasDuplicates = (arr: unknown[]) => {
  return new Set(arr).size !== arr.length;
}
