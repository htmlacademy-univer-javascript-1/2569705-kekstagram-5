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

const onModalKeydown = (evt) => {
  closeOnEscKeyDown(evt, deleteResultMessage());
};

const onModalButtonClick = () => {
  deleteResultMessage();
};

const awayModalClick = (evt) => {
  if (evt.target === document.body.lastElementChild) {
    deleteResultMessage();
  }
};

function deleteResultMessage () {
  const addedMessage = document.body.lastElementChild;
  addedMessage.querySelector('button').removeEventListener('click', onModalButtonClick);
  document.removeEventListener('keydown', onModalKeydown);
  document.removeEventListener('click', awayModalClick);
  addedMessage.remove();

}

const alertLoadError = () => {
  const messageAlert = document.createElement('div');
  messageAlert.style.position = 'absolute';
  messageAlert.style.left = 0;
  messageAlert.style.top = 0;
  messageAlert.style.right = 0;
  messageAlert.style.fontSize = '20px';
  messageAlert.style.backgroundColor = 'rgb(60, 54, 20)';
  messageAlert.style.textAlign = 'center';
  messageAlert.textContent = 'Ошибка подключения к серверу';
  messageAlert.style.lineHeight = '35px';
  document.body.append(messageAlert);
};

const showModal = (templateId) => {
  const messageTemplate = document.querySelector(`#${templateId}`).content;
  const message = messageTemplate.cloneNode(true);
  const messageFragment = document.createDocumentFragment();
  messageFragment.appendChild(message);
  document.body.appendChild(messageFragment);
};

const showResultMessage = (templateId) => {
  showModal(templateId);
  const btn = document.querySelector(`.${templateId}__button`);
  document.addEventListener('keydown', onModalKeydown);
  document.addEventListener('click', awayModalClick);
  btn.addEventListener('click', onModalButtonClick);
};

const showUploadSucccessMessage = () => showResultMessage('success');
const showUploadErrorMessage = () => showResultMessage('error');

export {getRandomInteger, getRandomArrayElement, createRandomNumber, closeOnEscKeyDown, createNumbersMassive, alertLoadError, showUploadErrorMessage, showUploadSucccessMessage};
