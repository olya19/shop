window.addEventListener('load', () => {
  let storage = window.localStorage;
  class slider {
    constructor() {
      this._slidesDesktop = ['img/slider/desktop/slide-1.png', 'img/slider/desktop/slide-2.png', 'img/slider/desktop/slide-3.png'];
      this._slidesTablet = ['img/slider/tablet/slide-1.png', 'img/slider/tablet/slide-2.png', 'img/slider/tablet/slide-3.png'];
      this._slidesMobile = ['img/slider/mobile/slide-1.png', 'img/slider/mobile/slide-2.png', 'img/slider/mobile/slide-3.png'];
      this._nextSlide = 0;
      this._currentSlide = 0;
      this._intervalFunction;
      this._slideContainer = document.getElementById('slides');
      this._slideContainer.addEventListener('click', (event) => {
        if (event.target.type === 'button') {
          if (event.target.id === 'btnPrev') {
            this._nextSlide = (this._currentSlide - 1) === -1 ? 2 : this._currentSlide - 1;
          }
          this.setImage(this.getImageUrl(), this._currentSlide);
          this.clearIntervalFunction();
          this.startSlider();
        } else {
          if (this._currentSlide % 2 === 0) {
            location.href = 'catalog.html';
          } else {
            storage.setItem("itemFromCatalog", JSON.stringify({hrefToItem: 'items/item-5.html', imgUrl: 'img/catalog/item-5.png'}));
            location.href = 'items/item-5.html';
          }
        }
      });
      this.setImage(this.getImageUrl(), this._currentSlide);
    }

    changeSlide(nextSlide) {
      this._nextSlide = nextSlide;
      this.setImage(this.getImageUrl(), this._currentSlide);
      this.clearIntervalFunction();
      this.startSlider();
    }

    getImageUrl() {
      let slide = '';
      this._currentSlide = this._nextSlide;
      if (document.documentElement.clientWidth > 1024) {
        slide = this._slidesDesktop[this._nextSlide];
      } else if (document.documentElement.clientWidth > 768) {
        slide = this._slidesTablet[this._nextSlide];
      } else {
        slide = this._slidesMobile[this._nextSlide];
      }
      if (this._nextSlide === 2) {
        this._nextSlide = 0;
      } else {
        this._nextSlide++;
      }
      return slide;
    }

    startSlider() {
      this._intervalFunction = setInterval(() => {
        this.setImage(this.getImageUrl(), this._currentSlide);
      }, 10000);
    }

    clearIntervalFunction() {
      clearInterval(this._intervalFunction);
    }

    setImage(imgUrl, slideIndex, callback) {
      this._slideContainer.style.background = `url('${imgUrl}') center center no-repeat`;
      this._slideContainer.style.backgroundSize = 'cover';
      changeSliderButtonClassName(slideIndex);
    }

  }

  let slider_ = new slider();
  slider_.startSlider();
  let buttons = document.getElementsByClassName('slider-nav-button');
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', () => {
      slider_.changeSlide(i);
      changeSliderButtonClassName(i);
    });
  }

  function changeSliderButtonClassName(indexActiveBtn) {
    let buttons = document.getElementsByClassName('slider-nav-button');
    for (let i = 0; i < 3; i++) {
      if (i === indexActiveBtn) {
        buttons[i].className += ' active';
      } else {
        buttons[i].className = 'slider-nav-button';
      }
    }
  }


  let nike = document.querySelector('.nike');
  nike.addEventListener('click', (event) => {
    event.preventDefault();
    storage.setItem("itemFromCatalog", JSON.stringify({hrefToItem: 'items/item-8.html', imgUrl: 'img/catalog/item-8.png'}));
    location.href = 'items/item-8.html';
  });

});