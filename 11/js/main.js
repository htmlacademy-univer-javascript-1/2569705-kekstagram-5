import {renderSmallPictures} from './smallPictures.js';
import { alertLoadError } from './util.js';
import { getData } from './fetch.js';
import './userForm.js';
import { setFormSubmit } from './userForm.js';
let photos = [];

const onLoadSuccess = (data) => {
  photos = data.slice();
  renderSmallPictures(photos);
  document.querySelector('.img-filters').classList.remove('img-filters--inactive');
};

getData(onLoadSuccess, alertLoadError);
setFormSubmit();
