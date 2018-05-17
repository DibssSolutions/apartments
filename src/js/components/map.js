export default class Map {

  constructor(config) {
    this._mapHTML = config.map.get(0);
    this._center = {
      lat: +config.map.data('center-lat'),
      lng: +config.map.data('center-lng')
    };

    this._init();
  }

  _init() {
    this._createMap();
  }

  _createMap() {
    this._map = new google.maps.Map(this._mapHTML, {
      center: this._center,
      zoom: 18,
      disableDefaultUI: true,
      scrollwheel: false,
      zoomControl: true
    });
  }

};
let map = $('.js-map');

if (map.length) {
  map.each(function() {
    new Map({
      map: $(this)
    });
  });
};

