function checkStringLength (string, maxLength) {
  return string.length <= maxLength;
}

checkStringLength('проверяемая строка', 20);
checkStringLength('проверяемая строка', 18);
checkStringLength('проверяемая строка', 10);

function isPalindrom (string) {
  const normalizedString = string.replaceAll(' ', '').toLowerCase();
  let newString = '';
  for (let charIndex = normalizedString.length - 1; charIndex >= 0; charIndex--) {
    newString += normalizedString[charIndex];
  }
  return newString === normalizedString;
}

isPalindrom('топот');
isPalindrom('ДовОд');
isPalindrom('Кекс');
isPalindrom('Лёша на полке клопа нашёл ');
