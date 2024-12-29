const closeOnEscKeyDown = (evt, closeFunction) => {
  if (evt.key === 'Escape') {
    closeFunction();
  }
};

const onModalEscKeydown = (evt) => {
  closeOnEscKeyDown(evt, deleteResultMessage);
};

const onModalButtonClick = () => {
  deleteResultMessage();
};

const onAwayModalClick = (evt) => {
  if (evt.target === document.body.lastElementChild) {
    deleteResultMessage();
  }
};

function deleteResultMessage () {
  const addedMessage = document.body.lastElementChild;
  addedMessage.querySelector('button').removeEventListener('click', onModalButtonClick);
  document.removeEventListener('keydown', onModalEscKeydown);
  document.removeEventListener('click', onAwayModalClick);
  addedMessage.remove();

}

const alertLoadError = () => {
  const messageAlert = document.createElement('div');
  messageAlert.classList.add('data-error');
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
  document.addEventListener('keydown', onModalEscKeydown);
  document.addEventListener('click', onAwayModalClick);
  btn.addEventListener('click', onModalButtonClick);
};

const showUploadSucccessMessage = () => showResultMessage('success');
const showUploadErrorMessage = () => showResultMessage('error');

const debounce = (callback, timeoutDelay) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

const shuffleArray = (array) => {
  for (let i = array.length - 1; i >= 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

export {closeOnEscKeyDown, alertLoadError, showUploadErrorMessage, showUploadSucccessMessage, debounce, shuffleArray};
