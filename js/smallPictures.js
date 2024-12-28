import {showBigPicture} from './showBigPicture.js';

const smallPictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const container = document.querySelector('.pictures');

const createSmallPicture = (picture) => {
  const {url, comments, likes, description} = picture;
  const smallPicture = smallPictureTemplate.cloneNode(true);
  smallPicture.querySelector('.picture__img').src = url;
  smallPicture.querySelector('.picture__img').alt = description;
  smallPicture.querySelector('.picture__comments').textContent = comments.length;
  smallPicture.querySelector('.picture__likes').textContent = likes;

  const onPictureElementClick = (evt) => {
    evt.preventDefault();
    showBigPicture(picture);
  };
  smallPicture.addEventListener('click', onPictureElementClick);

  return smallPicture;
};

const renderSmallPictures = (pictures) => {
  const fragment = document.createDocumentFragment();
  pictures.forEach((picture) => {
    const smallPicture = createSmallPicture(picture);
    fragment.append(smallPicture);
  });
  container.append(fragment);
};

const deletePhotos = () => container.querySelectorAll('.picture').forEach((element) => element.remove());

export {renderSmallPictures, deletePhotos};
