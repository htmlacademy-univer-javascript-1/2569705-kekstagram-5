import { addFilters, operateScale, onFilterClick, setDefaultFilter,
  imagePreview, scaleOutput,filterButtonList } from './effects.js';
const form = document.querySelector('.img-upload__form');
const scaleDecreaseButton = form.querySelector('.scale__control--smaller');
const scaleAddButton = form.querySelector('.scale__control--bigger');

const MAX_HASHTAGS_COUNT = 5;
const VALID_SYMBOLS = /^#[a-zа-яё0-9]{1,19}$/i;
const ErrorText = {
  INVALID_COUNT: `Максимум ${MAX_HASHTAGS_COUNT} хештегов`,
  NOT_UNIQUE: 'Хештеги должны быть уникальными',
  INVALID_PATTERN: 'Неправильный хештег'
};


const overlay = form.querySelector('.img-upload__overlay');
const body = document.querySelector('body');
const hashtagField = form.querySelector('.text__hashtags');
const descriptionField = form.querySelector('.text__description');
const uploadInput = document.querySelector('.img-upload__input');


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
  document.activeElement === form.querySelector('.text__description');

function onDocumentKeydown(evt) {
  if (evt.key === 'Escape' && !isTextFieldFocused()) {
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

uploadInput.addEventListener('change', onFileInputChange);
form.querySelector('.img-upload__cancel').addEventListener('click', onCancelButtonClick);
