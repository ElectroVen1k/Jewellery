(function() {
  var headerElement = document.querySelector('.header');
  var menuToggler = document.querySelector('.header__menu-toggler');
  var body = document.querySelector('.body');


  window.onload = function() {
    headerElement.classList.remove('header--opened');
    headerElement.classList.remove('header--no-js');
  };

  var openMenu = function () {
    headerElement.classList.add('header--opened');
    body.classList.add('body--noscroll');
  };


  var closeMenu = function () {
    headerElement.classList.remove('header--opened');
    body.classList.remove('body--noscroll');
  }

  menuToggler.addEventListener('click',  () => {
    if (headerElement.classList.contains('header--opened')){
      closeMenu();
    } else {
      openMenu();
    }
  });
}());
