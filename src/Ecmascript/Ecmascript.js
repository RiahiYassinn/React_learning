const findLongestWord = (words) => {
    const wordsWithLength = words.map(mot => ({ mot, longueur: mot.length }));
    const longestWord = wordsWithLength.reduce((acc, curr) => curr.longueur > acc.longueur ? curr : acc);
    return longestWord;
  };
  const countOccurrences = (arr) => {
    const flattenedArray = arr.flat();
    return flattenedArray.reduce((acc, curr) => {
      acc[curr] = (acc[curr] || 0) + 1;
      return acc;
    }, {});
  };