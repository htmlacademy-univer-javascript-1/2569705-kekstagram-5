const DEFAULT_VOLUME = 100;
const SCALE_DIFFERENCE = 25;
const MIN_SCALE = 25;
const MAX_SCALE = 100;

class Filter {
  constructor(name, min, max, step) {
    this.name = name;
    this.min = min;
    this.max = max;
    this.step = step;
  }
}

const FILTERS = {
  'effect-chrome' : new Filter('grayscale', 0, 1, 0.1),
  'effect-sepia' : new Filter('sepia', 0 , 1, 0.1),
  'effect-marvin' : new Filter('invert', 0, 1, 0.01),
  'effect-phobos' : new Filter('blur', 0, 3, 0.1),
  'effect-heat' : new Filter('brightness', 1, 3, 0.1)
};

const imageForm = document.querySelector('.img-upload__form');
const slider = document.querySelector('.effect-level__slider');
const effectLevel = imageForm.querySelector('.effect-level__value');
const imagePreview = imageForm.querySelector('.img-upload__preview img');
const scaleOutput = imageForm.querySelector('.scale__control--value');
const filterButtonList = document.querySelector('.effects__list');

slider.parentElement.classList.add('hidden');

noUiSlider.create(slider, {
  range : {
    min : 0,
    max : 1
  },
  step : 0.1,
  start : 1,
  connect: 'lower',
});

const operateSliderValue = (filter) => {
  if (filter.name === 'blur') {
    return `${slider.noUiSlider.get()}px`;
  }

  return `${slider.noUiSlider.get()}`;
};

const operateScale = (evt) => {
  let scale = parseInt(scaleOutput.value, 10);
  if (evt.target.classList.contains('scale__control--bigger') && scale + SCALE_DIFFERENCE <= MAX_SCALE) {
    scale += SCALE_DIFFERENCE;
  } else if (evt.target.classList.contains('scale__control--smaller') && scale - SCALE_DIFFERENCE >= MIN_SCALE) {
    scale -= SCALE_DIFFERENCE;
  }

  scaleOutput.value = `${scale}%`;
  imagePreview.style.transform = `scale(${scale / 100})`;
};

const setDefaultFilter = () => {
  slider.parentElement.classList.add('hidden');
  imagePreview.style.filter = null;
  effectLevel.value = DEFAULT_VOLUME;
  document.querySelector('#effect-none').checked = true;
};

const onFilterClick = (evt) => {
  if (evt.target.matches('input[type=radio]')) {
    if (evt.target.id !== 'effect-none') {
      slider.parentElement.classList.remove('hidden');
      const filter = FILTERS[`${evt.target.id}`];
      slider.noUiSlider.updateOptions({
        range: {
          min: filter.min,
          max: filter.max
        },
        step: filter.step,
        start: filter.max,
      });
      slider.noUiSlider.on('update', () => {
        imagePreview.style.filter = `${filter.name}(${operateSliderValue(filter)})`;
        effectLevel.value = slider.noUiSlider.get() / filter.max;
      });
    } else {
      setDefaultFilter();
    }
  }
};

const addFilters = () => filterButtonList.addEventListener('click', onFilterClick);
export {
  addFilters, operateScale, onFilterClick, setDefaultFilter,
  imagePreview, scaleOutput, filterButtonList};
