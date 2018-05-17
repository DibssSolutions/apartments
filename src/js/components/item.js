import {WIN, ACTIVE, HIDDEN, widthXS, winWidth} from '../constants';
import {TimelineMax, TweenMax} from 'gsap';
import PerfectScrollbar from 'perfect-scrollbar';

const containers = $('.js-item');
const ANIMATED = 'is-animated';
const DURATION = 400;
const SCROLL_DURATION = 400;
const watch = [];
const hideScroll = container => winWidth(widthXS) && container.perfectScrollbar.destroy();
let activeItem = null;

containers.each((index, container) => {
  container = $(container);
  const control = container.find('.js-item-control');
  const content = container.find('.js-item-content');
  const slides = container.find('.js-item-slide');
  const elements = container.find('.js-item-element');
  const scrollParent = container.closest('.js-scroll-wrap');
  const scrollParentDOM = scrollParent.get(0);
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

  watch.push(() => {
    if (!active) return;

    if (winWidth(widthXS)) {
      const scrollLeft = scrollParent.scrollLeft();
      const scrollParentLeft = scrollParent.offset().left;
      const containerLeft = container.offset().left;
      scrollParent.scrollLeft(scrollLeft + ( containerLeft - scrollParentLeft ));
      scrollParent.addClass(HIDDEN);
      hideScroll(scrollParentDOM);
    } else {
      scrollParentDOM.perfectScrollbar = new PerfectScrollbar(scrollParentDOM);
    };
  });

  control.on('click', e => {
    e.preventDefault();
    
    container
      .removeClass(ANIMATED)
      .toggleClass(ACTIVE);

    if (!active) {
      active = !active;
      show.play(0);
      content.slideDown(DURATION, () => winWidth(widthXS) && scrollParent.addClass(HIDDEN) );


      const scrollParentLeft = scrollParent.offset().left;
      const scrollParentRight = scrollParentLeft + scrollParent.outerWidth();
      const containerLeft = container.offset().left;
      const containerRight = containerLeft + container.outerWidth();
      const scrollLeft = scrollParent.scrollLeft();

      //scroll to right
      containerRight > scrollParentRight && scrollParent.animate({
        scrollLeft: scrollLeft + ( containerRight - scrollParentRight )
      }, SCROLL_DURATION, () => hideScroll(scrollParentDOM));

      //scroll to left
      containerLeft < scrollParentLeft && scrollParent.animate({
        scrollLeft: scrollLeft + ( containerLeft - scrollParentLeft )
      }, SCROLL_DURATION, () => hideScroll(scrollParentDOM));

      if (containerLeft >= scrollParentLeft || containerRight <= scrollParentRight) {
        hideScroll(scrollParentDOM);
      }

      activeItem && activeItem.index !== index && activeItem.hide();

      activeItem = {
        index,
        hide() {
          container
            .removeClass(ANIMATED)
            .removeClass(ACTIVE);
          active = !active;
          hide.play(0);
          scrollParent.removeClass(HIDDEN);
          content.slideUp(DURATION, () => {
            TweenMax.set([slides, elements, content],{clearProps:'all'});
            if (!winWidth(widthXS)) return;
            scrollParentDOM.perfectScrollbar = new PerfectScrollbar(scrollParentDOM);
          });
        }
      };

    } else {
      active = !active;
      hide.play(0);
      scrollParent.removeClass(HIDDEN);
      content.slideUp(DURATION, () => {
        TweenMax.set([slides, elements, content],{clearProps:'all'});
        if (!winWidth(widthXS)) return;
        scrollParentDOM.perfectScrollbar = new PerfectScrollbar(scrollParentDOM);
      });
    }
  });
});


watch.length && WIN.on('resize', () => watch.forEach(fn => fn()));
