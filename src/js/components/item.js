import {ACTIVE} from '../constants';
import {TimelineMax, TweenMax} from 'gsap';

const containers = $('.js-item');
const ANIMATED = 'is-animated';
const DURATION = 400;
const SCROLL_DURATION = 400;

containers.each((i, container) => {
  container = $(container);
  const control = container.find('.js-item-control');
  const content = container.find('.js-item-content');
  const slides = container.find('.js-item-slide');
  const elements = container.find('.js-item-element');
  const scrollParent = container.closest('.js-scroll-wrap');
  let active = false;

  const show = new TimelineMax({ paused: true })
    .addLabel('start')
    .addLabel('content', '+=0.3')
    .staggerTo(slides, 0.3, {
      opacity: 1,
      y: 0,
      ease: Power1.easeOut
    }, 0.2, 'start')
    .staggerTo(elements, 0.2, {
      opacity: 1,
      y: 0,
      ease: Power1.easeOut
    }, 0.1, 'content')
    .eventCallback('onComplete', () => container.addClass(ANIMATED));

  const hide = new TimelineMax({ paused: true }).to(content, 0.4, { opacity: 0 });

  control.on('click', e => {
    e.preventDefault();
    
    container
      .removeClass(ANIMATED)
      .toggleClass(ACTIVE);

    if (!active) {
      active = !active;
      show.play(0);
      content.slideDown(DURATION);


      const scrollParentLeft = scrollParent.offset().left;
      const scrollParentRight = scrollParentLeft + scrollParent.outerWidth();
      const containerLeft = container.offset().left;
      const containerRight = containerLeft + container.outerWidth();
      const scrollLeft = scrollParent.scrollLeft();

      //scroll to right
      containerRight > scrollParentRight && scrollParent.animate({
        scrollLeft: scrollLeft + ( containerRight - scrollParentRight )
      }, SCROLL_DURATION);

      //scroll to left
      containerLeft < scrollParentLeft && scrollParent.animate({
        scrollLeft: scrollLeft + ( containerLeft - scrollParentLeft )
      }, SCROLL_DURATION);

    } else {
      active = !active;
      hide.play(0);
      content.slideUp(DURATION, () => {
        TweenMax.set([slides, elements, content],{clearProps:'all'});
      });
    }
  });
});
