import { renderSmallPictures, deletePhotos } from './small-pictures.js';
import { debounce, shuffleArray } from './util.js';
import { photos } from './main.js';

const TIMEOUT_DELAY = 500;
const RANDOM_PHOTOS_LENGTH = 10;
const BUTTON_ACTIVITY_CLASS = 'img-filters__button--active';

const Filters = {
  'filter-default': () => photos.slice(),
  'filter-random': () => shuffleArray(photos.slice(0, RANDOM_PHOTOS_LENGTH)),
  'filter-discussed': () => photos.slice().sort((a, b) => b.comments.length - a.comments.length)
};

const imgFilters = document.querySelector('.img-filters');
const imgFiltersForm = imgFilters.querySelector('.img-filters__form');

const isButton = (evt) => evt.target.tagName === 'BUTTON';

const onImgFiltersFormClick = debounce((evt) => {
  if (isButton(evt)) {
    deletePhotos();
    renderSmallPictures(Filters[evt.target.id]());
  }
}, TIMEOUT_DELAY);

const onButtonCLick = (evt) => {
  if (isButton(evt)) {
    const activeButton = imgFiltersForm.querySelector(`.${BUTTON_ACTIVITY_CLASS}`);

    if (activeButton) {
      activeButton.classList.remove(BUTTON_ACTIVITY_CLASS);
      activeButton.disabled = true;
    }

    evt.target.classList.add(BUTTON_ACTIVITY_CLASS);
    activeButton.disabled = false;
  }
};

const addPhotosFilters = () => {
  imgFiltersForm.addEventListener('click', onImgFiltersFormClick);
  imgFiltersForm.addEventListener('click', onButtonCLick);
};

export {addPhotosFilters};
