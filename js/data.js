import {getRandomInteger, getRandomArrayElement, createRandomNumber} from './util.js';
const NAMES = [
  'Мария',
  'Никита',
  'Тимофей',
  'Елизавета',
  'Милена',
  'Виктория',
  'Денис',
  'Полина',
  'Анна',
  'Ксения'
];

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const DESCRIPTIONS = [
  'На отдыхе',
  'На чилле, на расслабоне',
  'Здесь нет описания, хотя оно должно было быть'
];

const generateId = createRandomNumber(1, 25);
const generateUrl = createRandomNumber(1, 25);
const generateCntOfLikes = createRandomNumber(15, 200);
const generateCommentId = createRandomNumber(1, 10000);
const generateAvatar = createRandomNumber(1, 6);

const createComment = () => ({
  id: generateCommentId(),
  avatar: `img/avatar-${ generateAvatar }.svg`,
  message: getRandomArrayElement(MESSAGES),
  name: getRandomArrayElement(NAMES)
});

const createPhotoDescription = () => ({
  id: generateId,
  url: `photos/${ generateUrl() }.jpg`,
  description: getRandomArrayElement(DESCRIPTIONS),
  likes: generateCntOfLikes(),
  comments: Array.from({length: getRandomInteger(0, 30)}, createComment)
});

const photoDiscriptions = () => Array.from({length: 25}, createPhotoDescription);
export {photoDiscriptions};
