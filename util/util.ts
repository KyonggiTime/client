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
        if (currentValue == '1L') {
          result[savedDay].push('1');
          result[savedDay].push('2');
          return savedDay;
        }
        if (currentValue == '2L') {
          result[savedDay].push('2');
          result[savedDay].push('3');
          return savedDay;
        }
        if (currentValue == '2.5L') {
          result[savedDay].push('2');
          result[savedDay].push('3');
          return savedDay;
        }
        if (currentValue == '3L') {
          result[savedDay].push('3');
          result[savedDay].push('4');
          return savedDay;
        }
        if (currentValue == '4L') {
          result[savedDay].push('4');
          result[savedDay].push('5');
          return savedDay;
        }
        if (currentValue == '5.5L') {
          result[savedDay].push('5');
          result[savedDay].push('6');
          return savedDay;
        }
        if (currentValue == '6L') {
          result[savedDay].push('6');
          result[savedDay].push('7');
          return savedDay;
        }
        if (currentValue == '7L') {
          result[savedDay].push('7');
          result[savedDay].push('8');
          return savedDay;
        }
        if (currentValue == '7.5L') {
          result[savedDay].push('7');
          result[savedDay].push('8');
          return savedDay;
        }
      result[savedDay].push(currentValue);
      return savedDay;
    });
  return result;
}

export const hasDuplicates = (arr: unknown[]) => {
  return new Set(arr).size !== arr.length;
}
