import { addFilters, operateScale, onFilterClick, setDefaultFilter,
  imagePreview, scaleOutput, filterButtonList, imageForm } from './effects.js';
import { uploadData } from './fetch.js';
import { setPreview } from './user-file.js';
import { showUploadErrorMessage, showUploadSucccessMessage } from './util.js';

const MAX_HASHTAGS_COUNT = 5;
const VALID_SYMBOLS = /^#[a-zа-яё0-9]{1,19}$/i;
const MAX_COMMENT_LENGTH = 140;

const ErrorText = {
  INVALID_COUNT: `Максимум ${MAX_HASHTAGS_COUNT} хештегов`,
  NOT_UNIQUE: 'Хештеги должны быть уникальными',
  INVALID_PATTERN: 'Неправильный хештег'
};

const form = document.querySelector('.img-upload__form');
const scaleDecreaseButton = form.querySelector('.scale__control--smaller');
const scaleAddButton = form.querySelector('.scale__control--bigger');
const overlay = form.querySelector('.img-upload__overlay');
const body = document.querySelector('body');
const hashtagField = form.querySelector('.text__hashtags');
const descriptionField = form.querySelector('.text__description');
const uploadInput = document.querySelector('.img-upload__input');
const uploudCancel = form.querySelector('.img-upload__cancel');
const submitButton = document.querySelector('.img-upload__submit');
const SubmitButtonText = {
  IDLE: 'Опубликовать',
  SENDING: 'Публикую'
};

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper'
});

const showModal = () => {
  overlay.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
  scaleAddButton.addEventListener('click', operateScale);
  scaleDecreaseButton.addEventListener('click', operateScale);
  addFilters();
  setPreview();
};

const hideModal = () => {
  form.reset();
  pristine.reset();
  overlay.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  uploadInput.value = '';
  descriptionField.value = '';
  hashtagField.value = '';
  scaleOutput.value = '100%';
  imagePreview.style.transform = 'scale(1)';
  setDefaultFilter();
  scaleAddButton.removeEventListener('click', operateScale);
  scaleDecreaseButton.removeEventListener('click', operateScale);
  filterButtonList.removeEventListener('click', onFilterClick);
};

const nomalizeHashtags = (hashtagString) =>
  hashtagString
    .trim()
    .split(' ')
    .filter((tag) => Boolean(tag.length));

const isTextFieldFocused = () =>
  document.activeElement === hashtagField ||
  document.activeElement === descriptionField;

function onDocumentKeydown(evt) {
  if (evt.key === 'Escape' && !isTextFieldFocused() && !document.querySelector('.error')) {
    evt.preventDefault();
    hideModal();
  }
}

const hasValidCount = (value) =>
  nomalizeHashtags(value).length <= MAX_HASHTAGS_COUNT;

const hasValidHashtags = (value) =>
  nomalizeHashtags(value).every((tag) => VALID_SYMBOLS.test(tag));

const hasUniqueHashtags = (value) =>{
  const lowerCaseHashtags = nomalizeHashtags(value).map((tag) => tag.toLowerCase());
  return lowerCaseHashtags.length === new Set(lowerCaseHashtags).size;
};

const onCancelButtonClick = () => hideModal();
const onFileInputChange = () => showModal();

pristine.addValidator(
  hashtagField,
  hasValidCount,
  ErrorText.INVALID_COUNT,
  3,
  true
);

pristine.addValidator(
  hashtagField,
  hasValidHashtags,
  ErrorText.INVALID_PATTERN,
  2,
  true
);

pristine.addValidator(
  hashtagField,
  hasUniqueHashtags,
  ErrorText.NOT_UNIQUE,
  1,
  true
);

const validateComments = (value) => {
  value = value.trim();
  return value.length <= MAX_COMMENT_LENGTH;
};

pristine.addValidator(descriptionField, validateComments, 'Комментарий длиннее 140 символов');

uploadInput.addEventListener('change', onFileInputChange);
uploudCancel.addEventListener('click', onCancelButtonClick);

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = SubmitButtonText.SENDING;
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = SubmitButtonText.IDLE;
};

const onFormSubmitSuccess = () => {
  showUploadSucccessMessage();
  hideModal();
};

const setFormSubmit = () => {
  imageForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();
    if(isValid){
      blockSubmitButton();
      uploadData(onFormSubmitSuccess, showUploadErrorMessage, new FormData(evt.target))
        .finally(() => unblockSubmitButton());
    }
  });
};

export {setFormSubmit};
