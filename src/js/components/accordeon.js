import { OPEN } from '../constants';
const accordeons = $('.js-accordion');
const accordeonsWrap = $('.js-accordion-wrap');

accordeons.each(function() {
  const that = $(this);
  const thatAccordeonWrap = that.find('.js-accordion-wrap');
  const accordeonTrigger = that.find('.js-accordion-trigger');
  if (that.hasClass(OPEN)) {
    thatAccordeonWrap.show();
  }
  accordeonTrigger.on('click', () => {
	  if (!that.hasClass(OPEN)) {
	    accordeons.removeClass(OPEN);
	    accordeonsWrap.slideUp(350);
	    that.addClass(OPEN);
	    thatAccordeonWrap.slideDown(350);
	  }
	  else {
	    that.removeClass(OPEN);
	    thatAccordeonWrap.slideUp(350);
	  }
  });

});

