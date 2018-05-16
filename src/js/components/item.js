import {ACTIVE} from '../constants';
import {TimelineMax} from 'gsap';

const containers = $('.js-item');
const ANIMATED = 'is-animated';

containers.each((i, container) => {
  container = $(container);
  const control = container.find('.js-item-control');
  const content = container.find('.js-item-content');
  const slides = container.find('.js-item-slide');
  const elements = container.find('.js-item-element');

  const animation = new TimelineMax({ paused: true })
    .addLabel('start')
    .staggerTo(slides, 0.3, {
      opacity: 1,
      y: 0,
      ease: Power1.easeOut
    }, 0.2)
    .eventCallback('onComplete', () => container.addClass(ANIMATED))
    .eventCallback('onReverseComplete', () => container.addClass(ANIMATED));

  control.on('click', e => {
    e.preventDefault();
    
    content.stop(true, true, true).slideToggle(400);
    container.toggleClass(ACTIVE);

    if (container.hasClass(ACTIVE)) {
      animation.play(0);
    }
  });
});
