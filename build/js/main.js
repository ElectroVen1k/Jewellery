(function() {
  var overlay = document.querySelector('.body__overlay');
  var body = document.querySelector('.body');

  //Menu
  try {
    var headerElement = document.querySelector('.header');
    var menuToggler = document.querySelector('.header__menu-toggler');

    window.onload = function () {
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
    };

    menuToggler.addEventListener('click',  () => {
      if (headerElement.classList.contains('header--opened')){
        closeMenu();
      } else {
        openMenu();
      }
    });
  } catch (e) {
    console.log();
  }

  //Q&A
  try {
    var questionsBlock = document.querySelectorAll('.questions__item');

    var openAnswer = function (block) {
      block.classList.add('questions__item--opened');
    };

    var closeAnswer = function (block) {
      block.classList.remove('questions__item--opened');
    };

    var questionsToggle = function (block) {
      block.addEventListener('click', () => {
        if (block.classList.contains('questions__item--opened')) {
          closeAnswer(block);
        } else {
          openAnswer(block);
        }
      });
    };

    var onQuestionsBlockPressEnter = function (block) {
      return function(evt) {
        if (evt.key === 'Enter') {
          if (block.classList.contains('questions__item--opened')) {
            closeAnswer(block);
          } else {
            openAnswer(block);
          }
        }
      };
    };

    var closeAllAnswers = function () {
      for(var block of questionsBlock) {
        block.classList.remove('questions__item--opened');
      }
    };


    for (var block of questionsBlock) {
      block.addEventListener('click', questionsToggle(block));
      block.addEventListener('keydown', onQuestionsBlockPressEnter(block));
    }
  } catch (e) {
    console.log();
  }


  // Filter
  var enableFilter = function () {
    var filterForm = document.querySelector('.filter');
    var filterOpenButton = document.querySelector('.filter__open-button');
    var filterCloseButton = document.querySelector('.filter__button--close');
    var filterBlocks = document.querySelectorAll('.filter__block');
    var filterTitles = document.querySelectorAll('.filter__block p');

    var openBlock = function (block) {
      block.classList.add('filter__block--opened');
    };

    var closeBlock = function (block) {
      block.classList.remove('filter__block--opened');
    };

    var filterBlockToggle = function (title) {
      title.addEventListener('click', () => {
        if (title.parentElement.classList.contains('filter__block--opened')) {
          closeBlock(title.parentElement);
        } else {
          openBlock(title.parentElement);
        }
      });
    };

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
      };
    };

    for (var block of filterBlocks) {
      block.addEventListener('keydown', onFilterBlockPressEnter(block));
    }

    for (var title of filterTitles) {
      title.addEventListener('click', filterBlockToggle(title));
    }

    var openFilterForm = function () {
      filterForm.classList.add('filter--opened');
      // body.classList.add('body--noscroll');
    };

    var closeFilterForm = function () {
      filterForm.classList.remove('filter--opened');
      // body.classList.remove('body--noscroll');
    };

    var closeFilterOnLoad = function () {
      filterForm.classList.remove('filter--opened');
      filterForm.classList.remove('filter--no-js');
    };

    var closeFilterBlocksOnLoad = function () {
      for (var i = 0; i < filterBlocks.length; i++) {
        if (i !== 0 && i !== 3) {
          filterBlocks[i].classList.remove('filter__block--opened');
        }
      }
    };

    filterOpenButton.addEventListener('click', openFilterForm);
    filterCloseButton.addEventListener('click', closeFilterForm);
    closeFilterOnLoad();
    closeFilterBlocksOnLoad();
  };

  try {
    enableFilter();
  } catch (e) {
    console.log();
  }

  // Slider
  try {
    var slider = document.querySelector('.new__list');
    var sliderItems = document.querySelectorAll('.new__item');
    var sliderPadeItems = document.querySelectorAll('.new__slider-item');
    var previousSlideButton = document.querySelector('.new__slider-button--previous');
    var nextSlideButton = document.querySelector('.new__slider-button--next');
    var mobilePageSliderCounter = document.querySelector('.new__slider-pages--mobile span');

    var currentSlideIndex = 0;
    var lastSlideIndex = 0;
    var sliderGap = 30;
    var percentSymbol = '% - ';
    var slidesCount;
    var startPos;

    var windowDesktopSize = window.matchMedia('(min-width: 1024px)');
    var windowTabletSize = window.matchMedia('(min-width: 768px)');


    var enableSlider = function () {
      if (windowDesktopSize.matches) {
        slidesCount = 3;
        nextSlideButton.addEventListener('click', toNextSlide);
        previousSlideButton.addEventListener('click', toPreviousSlide);
        sliderPageButtons();
      } else if (windowTabletSize.matches) {
        slidesCount = 6;
        nextSlideButton.addEventListener('click', toNextSlide);
        previousSlideButton.addEventListener('click', toPreviousSlide);
        sliderPageButtons();
        swipeSlider();
      } else {
        slidesCount = 6;
        swipeSlider();
      }
    };

    var pushSlide = function (buttonIndex) {
      sliderPadeItems[lastSlideIndex].classList.remove('new__slider-item--active');
      for (var i = 0; i < sliderItems.length; i++) {
        currentSlideIndex = buttonIndex;
        sliderItems[i].style.left = 'calc(-' + (100 * currentSlideIndex) + percentSymbol + (sliderGap * currentSlideIndex) + 'px)';
      }
      sliderPadeItems[currentSlideIndex].classList.add('new__slider-item--active');
      lastSlideIndex = currentSlideIndex;
    };

    var changeSlideOnPressPage = function (index) {
      sliderPadeItems[index].addEventListener('click', () => {
        pushSlide(index);
      });
    };

    var sliderPageButtons = function () {
      for (var i = 0; i < slidesCount; i++) {
        changeSlideOnPressPage(i);
      }
    };

    var toNextSlide = function () {
      currentSlideIndex = currentSlideIndex + 1;
      if (currentSlideIndex === slidesCount) {
        currentSlideIndex = slidesCount -1;
      }
      pushSlide(currentSlideIndex);
    };

    var toPreviousSlide = function () {
      currentSlideIndex = currentSlideIndex - 1;
      if (currentSlideIndex === -1) {
        currentSlideIndex = 0;
      }
      pushSlide(currentSlideIndex);
    };

    var swipeSlider = function () {
      var swipeRange = 50;

      slider.addEventListener('touchstart', (evt) => {
        startPos = evt.touches[0].clientX;
        document.addEventListener('touchmove', touchMove);
      });

      var touchMove = function (moveEvt) {
        var movePos = moveEvt.touches[0].clientX;

        if (movePos - startPos > swipeRange) {
          toPreviousSlide();
          sliderPageNumber();
          document.removeEventListener('touchmove', touchMove);
        }

        if (startPos - movePos > swipeRange) {
          toNextSlide();
          sliderPageNumber();
          document.removeEventListener('touchmove', touchMove);
        }
      };
    };

    var sliderPageNumber = function () {
      var pageNumber = currentSlideIndex + 1;
      mobilePageSliderCounter.innerHTML = pageNumber;
    };

    enableSlider();
  } catch (e) {
    console.log();
  }

  // Modal card
  try {
    var modalCard = document.querySelector('.modal-card');
    var openModalCardButton = document.querySelector('.product__info button');
    var closeModalCardButton = document.querySelector('.modal-card__close');

    var openModalCard = function () {
      modalCard.classList.add('modal-card--opened');
      overlay.classList.add('body__overlay--opened');
      body.classList.add('body--noscroll');
      closeModalCardButton.addEventListener('click', closeModalCard);
      overlay.addEventListener('click', closeModalCard);
      document.addEventListener('keydown', onEscPress);
    };

    var closeModalCard = function () {
      modalCard.classList.remove('modal-card--opened');
      overlay.classList.remove('body__overlay--opened');
      closeModalCardButton.removeEventListener('click', closeModalCard);
      overlay.removeEventListener('click', closeModalCard);
      body.classList.remove('body--noscroll');
      document.removeEventListener('keydown', onEscPress);
    };

    var onEscPress = function (evt) {
      if (evt.key === 'Escape') {
        closeModalCard();
      }
    };

    openModalCardButton.addEventListener('click', openModalCard);
  } catch (e) {
    console.log();
  }

  // Login
  try {
    var loginPopup = document.querySelector('.login-popup');
    var loginOpenButton = document.querySelector('.top-header__login');
    var loginCloseButton = document.querySelector('.login-popup__close');
    var emailInput = document.querySelector('.login-popup input[type="email"]');

    var openLoginPopup = function (evt) {
      evt.preventDefault();
      overlay.classList.add('body__overlay--opened');
      loginPopup.classList.add('login-popup--opened');
      body.classList.add('body--noscroll');
      loginCloseButton.addEventListener('click', closeLoginPopup);
      overlay.addEventListener('click', closeLoginPopup);
      document.addEventListener('keydown', onEscPress);
      emailInput.focus();
    };

    var closeLoginPopup = function () {
      overlay.classList.remove('body__overlay--opened');
      loginPopup.classList.remove('login-popup--opened');
      body.classList.remove('body--noscroll');
      loginCloseButton.removeEventListener('click', closeLoginPopup);
      overlay.removeEventListener('click', closeLoginPopup);
      document.removeEventListener('keydown', onEscPressPopup);
    };

    var onEscPressPopup = function (evt) {
      if (evt.key === 'Escape') {
        closeLoginPopup();
      }
    };

    loginOpenButton.addEventListener('click', openLoginPopup);

  } catch (e) {
    console.log();
  }

  // Catalog slider

  var catalogSliderEnable = function () {
    var slider = document.querySelector('.another-products__list');
    var sliderItems = document.querySelectorAll('.another-products__item');
    var sliderPadeItems = document.querySelectorAll('.another-products__slider-item');
    var previousSlideButton = document.querySelector('.another-products__slider-button--previous');
    var nextSlideButton = document.querySelector('.another-products__slider-button--next');
    var mobilePageSliderCounter = document.querySelector('.another-products__slider-pages--mobile span');

    var currentSlideIndex = 0;
    var lastSlideIndex = 0;
    var sliderGap = 30;
    var percentSymbol = '% - ';
    var slidesCount;
    var startPos;

    var windowDesktopSize = window.matchMedia('(min-width: 1024px)');
    var windowTabletSize = window.matchMedia('(min-width: 768px)');


    var enableSlider = function () {
      if (windowDesktopSize.matches) {
        slidesCount = 3;
        nextSlideButton.addEventListener('click', toNextSlide);
        previousSlideButton.addEventListener('click', toPreviousSlide);
        sliderPageButtons();
      } else if (windowTabletSize.matches) {
        slidesCount = 6;
        nextSlideButton.addEventListener('click', toNextSlide);
        previousSlideButton.addEventListener('click', toPreviousSlide);
        sliderPageButtons();
        swipeSlider();
      } else {
        slidesCount = 6;
        swipeSlider();
      }
    };

    var pushSlide = function (buttonIndex) {
      sliderPadeItems[lastSlideIndex].classList.remove('another-products__slider-item--active');
      for (var i = 0; i < sliderItems.length; i++) {
        currentSlideIndex = buttonIndex;
        sliderItems[i].style.left = 'calc(-' + (100 * currentSlideIndex) + percentSymbol + (sliderGap * currentSlideIndex) + 'px)';
      }
      sliderPadeItems[currentSlideIndex].classList.add('another-products__slider-item--active');
      lastSlideIndex = currentSlideIndex;
    };

    var changeSlideOnPressPage = function (index) {
      sliderPadeItems[index].addEventListener('click', () => {
        pushSlide(index);
      });
    };

    var sliderPageButtons = function () {
      for (var i = 0; i < slidesCount; i++) {
        changeSlideOnPressPage(i);
      }
    };

    var toNextSlide = function () {
      currentSlideIndex = currentSlideIndex + 1;
      if (currentSlideIndex === slidesCount) {
        currentSlideIndex = slidesCount -1;
      }
      pushSlide(currentSlideIndex);
    };

    var toPreviousSlide = function () {
      currentSlideIndex = currentSlideIndex - 1;
      if (currentSlideIndex === -1) {
        currentSlideIndex = 0;
      }
      pushSlide(currentSlideIndex);
    };

    var swipeSlider = function () {
      var swipeRange = 50;

      slider.addEventListener('touchstart', (evt) => {
        startPos = evt.touches[0].clientX;
        document.addEventListener('touchmove', touchMove);
        return startPos;
      });

      var touchMove = function (moveEvt) {
        var movePos = moveEvt.touches[0].clientX;

        if (movePos - startPos > swipeRange) {
          toPreviousSlide();
          sliderPageNumber();
          document.removeEventListener('touchmove', touchMove);
        }

        if (startPos - movePos > swipeRange) {
          toNextSlide();
          sliderPageNumber();
          document.removeEventListener('touchmove', touchMove);
        }
      };
    };

    var sliderPageNumber = function () {
      var pageNumber = currentSlideIndex + 1;
      mobilePageSliderCounter.innerHTML = pageNumber;
    };

    enableSlider();
  };

  try {
    catalogSliderEnable();
  } catch (e) {
    console.log();
  }
}());
