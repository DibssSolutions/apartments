import fancybox from '@fancyapps/fancybox';

let video = $('.js-fancybox');

video.fancybox({
  protect 		  : true,
  keyboard        : true,
  animationEffect : false,
  arrows          : true,
  clickContent    : false
});
