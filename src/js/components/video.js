import fancybox from 'fancybox/dist/js/jquery.fancybox.pack';

let video = $('.js-fancybox');

video.fancybox({
  protect 		  : true,
  keyboard        : true,
  animationEffect : false,
  arrows          : true,
  clickContent    : false
});
