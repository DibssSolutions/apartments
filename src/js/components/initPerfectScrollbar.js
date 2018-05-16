import PerfectScrollbar from 'perfect-scrollbar';
import { DOC } from '../constants';

DOC.ready(() => {
  const containers = document.querySelectorAll('.js-scroll-wrap');

  if (!containers) return;
  for (var i = 0; i <= containers.length - 1; i++) {
  	new PerfectScrollbar(containers[i]);
  }
});
