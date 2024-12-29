import {renderSmallPictures} from './small-pictures.js';
import { alertLoadError } from './util.js';
import { getData } from './fetch.js';
import { setFormSubmit } from './user-form.js';
import { addPhotosFilters } from './filters.js';

let photos = [];

const onLoadSuccess = (data) => {
  photos = data.slice();
  renderSmallPictures(photos);
  document.querySelector('.img-filters').classList.remove('img-filters--inactive');
};

getData(onLoadSuccess, alertLoadError);
setFormSubmit();
addPhotosFilters();

export {photos};
