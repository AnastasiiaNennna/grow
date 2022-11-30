function Slider(options) {
    this.container = document.querySelector(options.container);
    this.slider = document.querySelector(options.slider);
    this.slides = document.querySelectorAll(options.slides);
    this.slidesSelector = options.slides;
    this.slideWidth = options.width;

    const firstClone = this.slides[0].cloneNode(true);
    const lastClone = this.slides[this.slides.length - 1].cloneNode(true);
    const interval = 3000;
    let index = 1;
    let slideId;
    let isReverse = false;

    this.initSlider = () => {
        addTransform();
        addCloneNodes();
        startSlider();
    }

    this.onTransitionEnd = () => {
        this.slides = getSlides();

        switch (true) {
            case (this.slides[index].id === firstClone.id):
                switchToFirstSlide(); break;
            case (this.slides[index].id === lastClone.id): 
                switchToLastSlide(); break;
        }
    }

    this.onSliderHover = () => clearInterval(slideId);

    this.onNextSlideButtonClick = () => {
        isReverse = false;
        clearInterval(slideId);
        slideId = setInterval(() => {
            this.slides = getSlides();

            if (index >= this.slides.length - 1) {
                return;
            }

            index++;
            addTransition();
            addTransform();
        }, interval);
    }

    this.onPrevSlideButtonClick = () => {
        isReverse = true;
        clearInterval(slideId);
        slideId = setInterval(() => {

            if (index <= 0) return;

            index--;
            addTransition();
            addTransform();
        }, interval);
    }

    const startSlider = () => isReverse ? this.onPrevSlideButtonClick() : this.onNextSlideButtonClick();

    const getSlides = () => document.querySelectorAll(this.slidesSelector);

    const addTransition = () => this.slider.classList.add('slider-transition-active');

    const addTransform = () => this.slider.style.transform = `translateX(${-this.slideWidth * index}px)`;

    const addCloneNodes = () => {
        firstClone.id = 'first-slide-clone';
        lastClone.id = 'last-slide-clone';
        this.slider.prepend(lastClone);
        this.slider.append(firstClone);
        return this.slider;
    }

    const removeTransition = () => this.slider.classList.remove('slider-transition-active');

    const switchToFirstSlide = () => {
        removeTransition();
        index = 1;
        addTransform();
    }

    const switchToLastSlide = () => {
        removeTransition();
        index = this.slides.length - 2;
        addTransform();
    }
}

function TestimonialSlider(options) {
    Slider.apply(this, [options]);
    this.nextBtn = options.nextBtn;
    this.prevBtn = options.prevBtn;
    this.slider.addEventListener('transitionend', this.onTransitionEnd);
    this.container.addEventListener('mouseover', this.onSliderHover);
    this.container.addEventListener('mouseout', this.initSlider);
    this.nextBtn.addEventListener('click', this.onNextSlideButtonClick);
    this.prevBtn.addEventListener('click', this.onPrevSlideButtonClick);
}

function LatestPortfolioSlider(options) {
    Slider.apply(this, [options]);
    this.nextBtn = options.nextBtn;
    this.prevBtn = options.prevBtn;
    this.slider.addEventListener('transitionend', this.onTransitionEnd);
    this.container.addEventListener('mouseover', this.onSliderHover);
    this.container.addEventListener('mouseout', this.initSlider);
    this.nextBtn.addEventListener('click', this.onNextSlideButtonClick);
    this.prevBtn.addEventListener('click', this.onPrevSlideButtonClick);
}
