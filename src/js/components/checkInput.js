const control = $('input, textarea');

const checkInputValue = (that) => {
  const value = that.val();
  const parent = that.parent('.js-input');
  const filled = 'is-filled';
  if (value) {
    parent.addClass(filled);
  } else {
    parent.removeClass(filled);
  }
};
control
  .each(function() {
    const that = $(this);
    checkInputValue(that);
  })
  .on('keyup', function() {
    const that = $(this);
    checkInputValue(that);
  });
