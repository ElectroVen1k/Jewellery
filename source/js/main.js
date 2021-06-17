(function() {
  //Menu
  var headerElement = document.querySelector('.header');
  var menuToggler = document.querySelector('.header__menu-toggler');
  var body = document.querySelector('.body');

  window.onload = function() {
    headerElement.classList.remove('header--opened');
    headerElement.classList.remove('header--no-js');
    closeAllAnswers();
    // closeFilterOnLoad();
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

  // Filter
  var filterForm = document.querySelector('.filter');
  var filterOpenButton = document.querySelector('.filter__open-button');
  var filterCloseButton = document.querySelector('.filter__button--close');
  var filterBlocks = document.querySelectorAll('.filter__block');
  var filterTitles = document.querySelectorAll('.filter__block p');

  var openBlock = function (block) {
    block.classList.add('filter__block--opened');
  }

  var closeBlock = function (block) {
    block.classList.remove('filter__block--opened');
  }

  var filterBlockToggle = function (title) {
    title.addEventListener('click', function () {
      if (title.parentElement.classList.contains('filter__block--opened')) {
        closeBlock(title.parentElement);
      } else {
        openBlock(title.parentElement);
      }
    });
  }

  var onFilterBlockPressEnter = function (block) {
    return function (evt) {
      if (evt.key === 'Enter') {
        if (evt.target === this) {
          if (block.classList.contains('filter__block--opened')) {
            closeBlock(block);
          } else {
            openBlock(block);
          }
        }
      }
    }
  };

  for (var block of filterBlocks) {
    block.addEventListener('keydown', onFilterBlockPressEnter(block));
  }

  for (var title of filterTitles) {
    title.addEventListener('click', filterBlockToggle(title));
  }

  var openFilterForm = function () {
    filterForm.classList.add('filter--opened');
  }

  var closeFilterForm = function () {
    filterForm.classList.remove('filter--opened');
  }

  var closeFilterOnLoad = function () {
    filterForm.classList.remove('filter--opened');
    filterForm.classList.remove('filter--no-js');
  }

  filterOpenButton.addEventListener('click', openFilterForm);
  filterCloseButton.addEventListener('click', closeFilterForm);

  // Modal card

  var modalCard = document.querySelector('.modal-card');
  var openModalCardButton = document.querySelector('.product__info button');
  var closeModalCardButton = document.querySelector('.modal-card__close');
  var overlay = document.querySelector('.body__overlay');

  var openModalCard = function () {
    modalCard.classList.add('modal-card--opened');
    overlay.classList.add('body__overlay--opened');
    body.classList.add('body--noscroll');
    closeModalCardButton.addEventListener('click', closeModalCard);
    overlay.addEventListener('click', closeModalCard);
    document.addEventListener('keydown', onEscPress);
  }

  var closeModalCard = function () {
    modalCard.classList.remove('modal-card--opened');
    overlay.classList.remove('body__overlay--opened');
    closeModalCardButton.removeEventListener('click', closeModalCard);
    overlay.removeEventListener('click', closeModalCard);
    body.classList.remove('body--noscroll');
    document.removeEventListener('keydown', onEscPress);
  }

  var onEscPress = function (evt) {
    if (evt.key === 'Escape') {
      closeModalCard();
    }
  }

  openModalCardButton.addEventListener('click', openModalCard);


}());
