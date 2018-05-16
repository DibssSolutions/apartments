import {OPEN, ACTIVE} from '../constants';

const control = $('.js-nav-control');
const container = $('.js-nav');

control.on('click', e => {
  e.preventDefault();
  control.toggleClass(ACTIVE);
  container.toggleClass(OPEN);
});
