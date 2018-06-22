import {WIN, OWL, ACTIVE, winWidth, widthSM, DOC} from '../constants';
import PerfectScrollbar from 'perfect-scrollbar';

DOC.ready(() => {
  const prev = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14.2 23.5" style="width: 0.604em; height: 1em;" class="interiors__icon"><path fill="currentColor" d="M13.7 3.2l-8.5 8.6 8.5 8.6c.7.7.7 1.9 0 2.6-.7.7-1.9.7-2.6 0L0 11.7 11.1.5c.7-.7 1.9-.7 2.6 0 .7.8.7 1.9 0 2.7z"/></svg>';
  const next = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14.2 23.5" style="width: 0.604em; height: 1em;" class="interiors__icon"><path fill="currentColor" d="M.5.5c.7-.7 1.9-.7 2.6 0l11.1 11.2L3.1 22.9c-.7.7-1.9.7-2.6 0-.7-.7-.7-1.9 0-2.6L9 11.7.5 3.1C-.2 2.4-.2 1.3.5.5z"/></svg>';
  const DISABLED = 'disabled';
  const directionPrev = 'prev';
  const directionNext = 'next';

  const setCurrent = (slideshow, thumbnails) => {
    const slideshowSlides = slideshow.find('[data-index]');
    const thumbnailsSlides = thumbnails.find('[data-index]');
    const currentSlide = slideshowSlides.filter((i, slide) => $(slide).closest('.active').length);
    const currentPreview = thumbnailsSlides.filter(`[data-index="${currentSlide.data('index')}"]`);
    
    if (!currentPreview.length) return;

    thumbnailsSlides.removeClass(ACTIVE);
    currentPreview.addClass(ACTIVE);

    const scrollLeft = thumbnails.scrollLeft();
    const thumbnailsLeft = thumbnails.offset().left;
    const thumbnailsRight = thumbnailsLeft + thumbnails.outerWidth();

    const currentPreviewLeft = currentPreview.offset().left;
    const currentPreviewRight = currentPreviewLeft + currentPreview.outerWidth();

    const thumbnailsDOM = thumbnails.get(0);

    const currentRight = currentPreview.is(':last-child') ? thumbnailsDOM.scrollWidth - thumbnailsDOM.clientWidth : scrollLeft + ( currentPreviewRight - thumbnailsRight );
    const currentLeft = currentPreview.is(':first-child') ? 0 : scrollLeft + ( currentPreviewLeft - thumbnailsLeft );

    currentPreviewRight > thumbnailsRight && thumbnails.stop().animate({
      scrollLeft: currentRight
    }, {
      duration: 300,
      progress() {
        thumbnailsDOM.perfectScrollbar.update();
      },
      complete() {
        scrolling = false;
      }
    });

    currentPreviewLeft < thumbnailsLeft && thumbnails.stop().animate({
      scrollLeft: currentLeft
    }, {
      duration: 300,
      progress() {
        thumbnailsDOM.perfectScrollbar.update();
      },
      complete() {
        scrolling = false;
      }
    });
  };

  const onScroll = props => {
    const {slideshow, slideshowDOM, scrollToPrev, scrollToNext} = props;
    const scrollPosition = slideshow.scrollLeft();
    const scrollEnd = slideshowDOM.scrollWidth - slideshowDOM.clientWidth;

    if (scrollPosition - threshold <= 0) scrollToPrev.addClass(DISABLED);
    else scrollToPrev.removeClass(DISABLED);

    if (scrollPosition + threshold >= scrollEnd) scrollToNext.addClass(DISABLED);
    else scrollToNext.removeClass(DISABLED);
  };

  const watch = [];
  const threshold = 5;

  $('.js-interiors').each((i, container) => {
    
    container = $(container);
    const slideshow = container.find('.js-interiors-slideshow');
    const slideshowDOM = slideshow.get(0);
    const thumbnails = container.find('.js-interiors-thumbnails');
    const scrollTo = container.find('.js-interiors-scroll-to');
    const scrollToPrev = scrollTo.filter('[data-direction="prev"]');
    const scrollToNext = scrollTo.filter('[data-direction="next"]');

    let sliderActive = false;
    let scrollEnabled = false;

    thumbnails
      .find('[data-index]')
      .on('click', e => {
        e.preventDefault();
        slideshow.trigger('to.owl.carousel', $(e.currentTarget).index());
      });

    slideshow.on('scroll', () => scrollEnabled && onScroll({
      slideshow,
      slideshowDOM,
      scrollToPrev,
      scrollToNext
    }));

    onScroll({
      slideshow,
      slideshowDOM,
      scrollToPrev,
      scrollToNext
    });
    
    let currentIndex = 0;
    let scrolling = false;

    scrollTo.on('click', e => {
      e.preventDefault();
      
      const direction = $(e.currentTarget).data('direction');
      const scrollLeft = slideshow.scrollLeft();
      const scrollRight = scrollLeft + slideshow.outerWidth();
      const offsetLeft = slideshow.offset().left;
      const offsetRight = offsetLeft + slideshow.outerWidth();

      let currentSlide = slideshow
        .find('[data-index]')
        .filter((i, slide) => {
          slide = $(slide);

          const left = slide.offset().left;
          const right = left + slide.outerWidth();
          
          switch (direction) {
            case directionPrev: 
              if (left + threshold < offsetLeft && right + threshold < offsetRight) return slide;
              break;
            case directionNext: 
              if (left - threshold > offsetLeft && right - threshold > offsetRight) return slide;
              break;
          }
        });

      let scrollPosition = 0;
      let currentSlideLeft = 0;

      if (!currentSlide.length) return;

      switch (direction) {
        case directionPrev: 
          currentSlide = currentSlide.last();
          scrollPosition = scrollLeft - (offsetLeft - currentSlide.offset().left);
          break;
        case directionNext: 
          currentSlide = currentSlide.first();
          scrollPosition = scrollLeft + currentSlide.offset().left;
          break;
      }

      if (scrolling) return;
      scrolling = true;

      slideshow.animate({
        scrollLeft: scrollPosition
      }, {
        duration: 300,
        progress() {
          slideshowDOM.perfectScrollbar.update();
        },
        complete() {
          scrolling = false;
        }
      });
    });

    watch.push(() => {
      if (winWidth(widthSM)) {
        if (sliderActive) {
          sliderActive = false;
          slideshow
            .trigger('destroy.owl.carousel')
            .removeClass(OWL);
        }

        if (!scrollEnabled) {
          scrollEnabled = true;
          currentIndex = 0;
          slideshowDOM.perfectScrollbar = new PerfectScrollbar(slideshowDOM, {
            minScrollbarLength: 50
          });
        }
        
      } else if (!winWidth(widthSM) && !sliderActive) {
        scrollEnabled && slideshowDOM.perfectScrollbar.destroy();
        scrollEnabled = false;

        sliderActive = true;
        slideshow
          .addClass(OWL)
          .owlCarousel({
            items: 1,
            nav: true,
            dots: false,
            navClass: [ 'interiors__arrow interiors__prev', 'interiors__arrow interiors__next' ],
            navText: [ prev, next ],
            onTranslated: () => setCurrent(slideshow, thumbnails),
            onInitialized: () => setCurrent(slideshow, thumbnails)
          });
      }
    });

  });


  if (!watch.length) return;
  watch.forEach(fn => fn());
  WIN.on('resize', () => watch.forEach(fn => fn())); 

});

