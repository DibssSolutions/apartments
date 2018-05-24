import { OPEN } from '../constants';
const accordeons = $('.js-accordion');
const accordeonsWrap = $('.js-accordion-wrap');
import PerfectScrollbar from 'perfect-scrollbar';

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
	    const wrapHeight = $('.location__wrap').outerHeight();
	    const mainHeight = $('.main.js-scroll-wrap').outerHeight();
	    const accordWrapHeught = that.find('.accordion__wrap').outerHeight();
	    const difference = $('.main.js-scroll-wrap').scrollTop() - accordWrapHeught;
    	if ( wrapHeight >= mainHeight ) {
    		$('.main.js-scroll-wrap').animate({
    			scrollTop: difference
    		}, 350);
    	}
	  }
  });

});

