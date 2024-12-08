function getRandomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

function createRandomNumber (min, max) {
  const previousValues = [];

  return function () {
    let currentValue = getRandomInteger(min, max);
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomInteger(min, max);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
}

function createNumbersMassive (min, max) {
  const numbersMassive = [];

  for(let i = min; i <= max; i++) {
    numbersMassive.push(i);
  }
  return numbersMassive;
}

const closeOnEscKeyDown = (evt, closeFunction) => {
  if (evt.key === 'Escape') {
    closeFunction();
  }
};
export {getRandomInteger, getRandomArrayElement, createRandomNumber, closeOnEscKeyDown, createNumbersMassive};
