import { OPEN } from '../constants';
const accordeons = $('.js-accordion');
const accordeonTrigger = $('.js-accordion-trigger');
const accordeonsWrap = $('.js-accordion-wrap');

accordeonTrigger.on('click', function() {
  const that = $(this);
  const parent = that.parents('.js-accordion');
  const thatAccordeonWrap = parent.find('.js-accordion-wrap');
  if (!parent.hasClass(OPEN)) {
  	accordeons.removeClass(OPEN);
  	accordeonsWrap.slideUp();
  	parent.addClass(OPEN);
  	thatAccordeonWrap.slideDown();
  }
  else {
    parent.removeClass(OPEN);
    thatAccordeonWrap.slideUp();
  }
});
