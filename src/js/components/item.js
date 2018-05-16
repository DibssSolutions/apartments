import {ACTIVE} from '../constants';

const control = $('.js-nav-control');
const containers = $('.js-item');

containers.each((i, container) => {
  container = $(container);
  const control = container.find('.js-item-control');
  const content = container.find('.js-item-content');

  control.on('click', e => {
    e.preventDefault();
    container.toggleClass(ACTIVE);
    content.stop(true, true, true).slideToggle(400);
  });
});
