const elements = document.getElementsByClassName('has-animation');
console.log(elements);

if (elements && elements.length > 0) {
  elements.forEach((element) => {
    if (window.scrollTop() + window.height() > element.offset().top + element.outerHeight()) {
      element.delay(element.data('delay')).queue(() => {
        element.addClass('animate-in');
      });
    }
  });

  window.scroll(() => {
    elements.forEach((element) => {
      if (window.scrollTop() + window.height() > element.offset().top) {
        element.delay(element.data('delay')).queue(() => {
          element.addClass('animate-in');
        });
      }
    });
  });
}
