(function() {
  //Menu
  var headerElement = document.querySelector('.header');
  var menuToggler = document.querySelector('.header__menu-toggler');
  var body = document.querySelector('.body');

  window.onload = function() {
    headerElement.classList.remove('header--opened');
    headerElement.classList.remove('header--no-js');
    closeAllAnswers();
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

  //Q&A

  var questionsBlock = document.querySelectorAll('.questions__item');

  var openAnswer = function (block) {
    block.classList.add('questions__item--opened');
  }

  var closeAnswer = function (block) {
    block.classList.remove('questions__item--opened');
  }

  var questionsToggle = function (block) {
    block.addEventListener('click', function (evt) {
      if (block.classList.contains('questions__item--opened')) {
        closeAnswer(block);
      } else {
        openAnswer(block);
      }
    });
  }

  var onQuestionsBlockPressEnter = function (block) {
    return function(evt) {
      if (evt.key === 'Enter') {
        if (block.classList.contains('questions__item--opened')) {
          closeAnswer(block);
        } else {
          openAnswer(block);
        }
      }
    }
  };

  var closeAllAnswers = function () {
    for(var block of questionsBlock) {
      block.classList.remove('questions__item--opened');
    }
  }


  for (var block of questionsBlock) {
    block.addEventListener('click', questionsToggle(block));
    block.addEventListener('keydown', onQuestionsBlockPressEnter(block));
  }

}());
