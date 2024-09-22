function checkStringLength (string, maxLength) {
  return string.length <= maxLength;
}

function isPalindrom (string) {
  let normalizedString = string.replaceAll(' ', '').toLowerCase();
  let newString = '';
  for (let charIndex = normalizedString.length - 1; charIndex >= 0; charIndex--) {
    newString += normalizedString[charIndex];
  }
  return newString === normalizedString;
}
