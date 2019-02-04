import slick from 'slick-carousel';

let schemeSlider = $('.js-scheme-slider');

schemeSlider.slick({
  infinite: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: true,
  prevArrow: '<button type="button" class="slick-prev"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14.2 23.5" style="width: 0.604em; height: 1em;" class="interiors__icon"><path fill="currentColor" d="M13.7 3.2l-8.5 8.6 8.5 8.6c.7.7.7 1.9 0 2.6-.7.7-1.9.7-2.6 0L0 11.7 11.1.5c.7-.7 1.9-.7 2.6 0 .7.8.7 1.9 0 2.7z"/></svg></button>',
  nextArrow: '<button type="button" class="slick-next"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14.2 23.5" style="width: 0.604em; height: 1em;" class="interiors__icon"><path fill="currentColor" d="M.5.5c.7-.7 1.9-.7 2.6 0l11.1 11.2L3.1 22.9c-.7.7-1.9.7-2.6 0-.7-.7-.7-1.9 0-2.6L9 11.7.5 3.1C-.2 2.4-.2 1.3.5.5z"/></svg></button>',
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3
      }
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        dots: true
      }
    }
  ]
});

