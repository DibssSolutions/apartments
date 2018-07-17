import slick from 'slick-carousel';
let items = $('.js-items-content');
let carouselopts = {
  responsive: [{
    breakpoint: 99999,
    settings: 'unslick'
  },{
    breakpoint: 768,
    settings: {
      dots: true,
      arrows: false,
      infinite: false,
      slidesToShow: 1,
      slidesToScroll: 1
    }
  }]
};

items.slick(carouselopts);
