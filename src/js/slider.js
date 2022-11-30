document.onreadystatechange = function() {
    if (document.readyState === 'complete') {
        const sliderWrapper = document.querySelector('.testimonials__wrap');
        const prevSlideButton = document.querySelector('#slide__button-prev');
        const nextSlideButton = document.querySelector('#slide__button-next');
        const interval = 4000;
        const slides = document.querySelectorAll('.testimonials__slide');
        let current = 0;
        let slideId;

        const reset = () => {
            for (let i = 0; i < slides.length; i++) {
                slides[i].style.display = 'none';
            }
        };

        const initSlide = (container) => {
            reset();
            slides[0].style.display = 'flex';
            startSlider();
            container.addEventListener('mouseenter', onSliderHover);
            container.addEventListener('mouseleave', startSlider);
            nextSlideButton.addEventListener('click', onNextSlideButtonClick);
            prevSlideButton.addEventListener('click', onPrevSlideButtonClick);
        };

        const startSlider = () => {
            slideId = setInterval(() => {
                onPrevSlideButtonClick();
            }, interval);
        };

        const onNextSlideButtonClick = () => {
            if (current === 0) {
                current = slides.length;
            }
            slidePrev();
        };

        const onPrevSlideButtonClick = () => {
            if (current === slides.length - 1) {
                current = -1;
            }
            slideNext();
        };

        const slideNext = () => {
            reset();
            slides[current + 1].style.display = 'flex';
            current++;
        };

        const slidePrev = () => {
            reset();
            slides[current - 1].style.display = 'flex';
            current--;
        };

        const onSliderHover = () => {
            clearInterval(slideId);
        };

        initSlide(sliderWrapper);
    };
};
