const checkInputValue = () => {
  $('input, textarea').on('keyup', function() {
  	const that = $(this);
    const value = that.val();
    const parent = that.parent('.js-input');
    if (value) {
      parent.addClass('is-filled');
    } else {
      parent.removeClass('is-filled');
    }
  });
};
