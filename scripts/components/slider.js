import { tns } from 'tiny-slider/src/tiny-slider'

const sliderSelector = '.slider__main'

export const slider = () => {

  const sliders = document.querySelectorAll(sliderSelector)

  for (let i = 0; i < sliders.length; i++) {
    var slider = tns({
      autoplay: sliders[i].dataset.sliderAutoplay,
      autoplayHoverPause: true,
      mouseDrag: sliders[i].dataset.sliderMousedrag,
      container: sliders[i],
      items: 1,
      slideBy: 'page',
      speed: 800,
      swipeAngle: false,
      controlsContainer: '.slider__nav',
      prevButton: '.slider__nav-item--prev',
      nextButton: '.slider__nav-item--next',
      mode: 'gallery',
      animateIn: 'fadeInDown',
      animateOut: 'fadeOutDown',
      // animateNormal: 'tns-normal',
      animateDelay: 300,
    })
  }
}
