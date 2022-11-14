function Slider(container, slider, slides, width) {
    this.container = document.querySelector(container);
    this.slider = document.querySelector(slider);
    this.slides = document.querySelectorAll(slides);
    this.slideWidth = width;
    let index = 1;
    const firstClone = this.slides[0].cloneNode(true);
    const lastClone = this.slides[this.slides.length - 1].cloneNode(true);
    let slideId;
    const interval = 3000;
    let isReverse = false;

    this.initSlider = () => {
        this.addTransform();
        addCloneNodes();
        this.startSlider();
    }

    this.onTransitionEnd = () => {
        this.slides = getSlides();
        switch (true) {
            case (this.slides[index].id === firstClone.id):
                switchToFirstSlide(); break;
            case (this.slides[index].id === lastClone.id): switchToLastSlide(); break;
        };
    };

    this.onSliderHover = () => {
        clearInterval(slideId);
    };

    this.onNextSlideButtonClick = () => {
        isReverse = false;
        clearInterval(slideId);
        slideId = setInterval(() => {
            this.slides = getSlides();
            if (index >= this.slides.length - 1) {
                return;
            };
            index++;
            this.addTransition();
            this.addTransform();
        }, interval);
    };

    this.onPrevSlideButtonClick = () => {
        isReverse = true;
        clearInterval(slideId);
        slideId = setInterval(() => {
            if (index <= 0) return;
            index--;
            this.addTransition();
            this.addTransform();
        }, interval);
    };

    this.startSlider = () => {
        isReverse ? this.onPrevSlideButtonClick() : this.onNextSlideButtonClick();
    };

    const getSlides = () => {
        return document.querySelectorAll(slides);
    };

    this.addTransition = () => {
        this.slider.classList.add('slider-transition-active');
    };

    this.addTransform = () => {
        this.slider.style.transform = `translateX(${-this.slideWidth * index}px)`;
    };

    const addCloneNodes = () => {
        firstClone.id = 'first-slide-clone';
        lastClone.id = 'last-slide-clone';
        this.slider.prepend(lastClone);
        this.slider.append(firstClone);
        return this.slider;
    };

    this.removeTransition = () => {
        this.slider.classList.remove('slider-transition-active');
    };

    const switchToFirstSlide = () => {
        this.removeTransition();
        index = 1;
        this.addTransform();
    };

    const switchToLastSlide = () => {
        this.removeTransition();
        index = this.slides.length - 2;
        this.addTransform();
    };
};

function TestimonialSlider(container, slider, slides, width) {
    Slider.apply(this, [container, slider, slides, width]);

    const prevSlideButton = document.querySelector('.slide__button-prev-testimonials');
    const nextSlideButton = document.querySelector('.slide__button-next-testimonials');
    this.slider.addEventListener('transitionend', this.onTransitionEnd);
    this.container.addEventListener('mouseover', this.onSliderHover);
    this.container.addEventListener('mouseout', this.initSlider);
    nextSlideButton.addEventListener('click', this.onNextSlideButtonClick);
    prevSlideButton.addEventListener('click', this.onPrevSlideButtonClick);
};

function LatestPortfolioSlider(container, slider, slides, width) {
    Slider.apply(this, [container, slider, slides, width]);

    const prevSlideButton = document.querySelector('.slide__button-prev-portfolio');
    const nextSlideButton = document.querySelector('.slide__button-next-portfolio');
    this.slider.addEventListener('transitionend', this.onTransitionEnd);
    this.container.addEventListener('mouseover', this.onSliderHover);
    this.container.addEventListener('mouseout', this.initSlider);
    nextSlideButton.addEventListener('click', this.onNextSlideButtonClick);
    prevSlideButton.addEventListener('click', this.onPrevSlideButtonClick);
};
