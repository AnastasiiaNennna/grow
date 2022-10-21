const MAIN_WRAPPER = document.querySelector('#root');
const PORTFOLIO_IMAGES = [
    '/src/assets/img/portfolio_bg_1.png', 
    '/src/assets/img/portfolio_bg_2.png', 
    '/src/assets/img/portfolio_bg_3.png', 
    '/src/assets/img/portfolio_bg_1.png', 
    '/src/assets/img/portfolio_bg_2.png', 
    '/src/assets/img/portfolio_bg_3.png'
]

async function getData(){
    try {
        const response =  await import('../assets/data/homeData.JSON', {
                            assert: {
                                type: 'json'
                            }
        });
        return response.default
    } catch (err) {
            return err
    }
}

const initContent = (data) => {
    initAboutSection(data);
    initBlogSection(data);
    initPortfolioSection(data);
    initTestimonialsSection(data);
    initContactSection(data);
};

const initAboutSection = (data) => {
    const fragment = document.createDocumentFragment();
    const section = document.createElement('section');
    const sectionTitle = document.createElement('div');
    const sectionHeading = document.createElement('h2');
    const sectionText = document.createElement('h4');
    const sectionWrapper = document.createElement('div');
    section.id = 'about';
    section.classList.add('about');
    sectionTitle.classList.add('section__title', 'section__title-about');
    sectionHeading.classList.add('section__heading');
    sectionText.classList.add('section__text');
    sectionWrapper.classList.add('about__cards-wrap');
    sectionHeading.innerHTML = data.sections[0].title;
    sectionText.innerHTML = data.sections[0].subtitle;
    sectionWrapper.innerHTML = `<div class="about__cards">
                                    <div class="card__wrap card__typography">
                                        <div class="card__img"></div>
                                        <h4 class="card__title">
                                            ${data.sections[0].tabsTitles[0]}
                                        </h4>
                                    </div>
                                    <div class="card__wrap card__iconset">
                                        <div class="card__img"></div>
                                        <h4 class="card__title">
                                            ${data.sections[0].tabsTitles[1]}
                                        </h4>
                                    </div>
                                    <div class="card__wrap card__accurate">
                                        <div class="card__img"></div>
                                        <h4 class="card__title">
                                            ${data.sections[0].tabsTitles[2]}
                                        </h4>
                                    </div>
                                </div>
                                <div class="about__video">
                                    <div class="about__video-button"></div>
                                </div>`;
    sectionTitle.append(sectionHeading);
    sectionTitle.append(sectionText);
    section.append(sectionTitle);
    section.append(sectionWrapper);
    fragment.append(section);
    MAIN_WRAPPER.append(fragment);
};

const initBlogSection = (data) => {
    const fragment = document.createDocumentFragment();
    const section = document.createElement('section');
    const sectionTitle = document.createElement('div');
    const sectionHeading = document.createElement('h2');
    const sectionText = document.createElement('h4');
    const sectionWrapper = document.createElement('div');
    const postsWrapper = document.createElement('div');
    section.id = 'blog';
    section.classList.add('blog');
    sectionTitle.classList.add('section__title', 'section__title-blog');
    sectionHeading.classList.add('section__heading');
    sectionText.classList.add('section__text');
    sectionWrapper.classList.add('about__cards-wrap');
    postsWrapper.classList.add('blog__posts');
    createBlogPost(postsWrapper, data);
    sectionHeading.innerHTML = data.sections[1].title;
    sectionText.innerHTML = data.sections[1].subtitle;
    sectionTitle.append(sectionHeading);
    sectionTitle.append(sectionText);
    section.append(sectionTitle);
    section.append(postsWrapper);
    fragment.append(section);
    MAIN_WRAPPER.append(fragment);
};

const initPortfolioSection = (data) => {
    const fragment = document.createDocumentFragment();
    const section = document.createElement('section');
    const sectionTitle = document.createElement('div');
    const sectionHeading = document.createElement('h2');
    const sectionText = document.createElement('h4');
    const slidesWrapper = document.createElement('div');
    const sectionButton = document.createElement('button');
    section.id = 'portfolio';
    section.classList.add('portfolio');
    sectionTitle.classList.add('section__title', 'section__title-portfolio');
    sectionHeading.classList.add('section__heading');
    sectionText.classList.add('section__text');
    slidesWrapper.classList.add('portfolio__slides');
    sectionButton.classList.add('portfolio__button', 'button', 'button-light');
    createPortfolioSlide(slidesWrapper, data);
    sectionHeading.innerHTML = data.sections[2].title;
    sectionText.innerHTML = data.sections[2].subtitle;
    sectionButton.textContent = data.sections[2].buttonText;
    sectionTitle.append(sectionHeading);
    sectionTitle.append(sectionText);
    section.append(sectionTitle);
    section.append(slidesWrapper);
    section.append(sectionButton);
    fragment.append(section);
    MAIN_WRAPPER.append(fragment);
};

const initTestimonialsSection = (data) => {
    const fragment = document.createDocumentFragment();
    const section = document.createElement('section');
    const sectionTitle = document.createElement('div');
    const sectionHeading = document.createElement('h2');
    const slidesWrapper = document.createElement('div');
    section.id = 'testimonials';
    section.classList.add('testimonials');
    sectionTitle.classList.add('section__title', 'section__title-testimonials');
    sectionHeading.classList.add('section__heading');
    slidesWrapper.classList.add('testimonials__wrap');
    createTestimonialsSlide(slidesWrapper, data);
    sectionHeading.innerHTML = data.sections[3].title;
    sectionTitle.append(sectionHeading);
    section.append(sectionTitle);
    section.append(slidesWrapper);
    fragment.append(section);
    MAIN_WRAPPER.append(fragment);
};

const initContactSection = (data) => {
    const fragment = document.createDocumentFragment();
    const section = document.createElement('section');
    const sectionTitle = document.createElement('div');
    const sectionHeading = document.createElement('h2');
    const sectionText = document.createElement('h4');
    const sectionWrapper = document.createElement('div');
    section.id = 'contact';
    section.classList.add('contact');
    sectionTitle.classList.add('section__title', 'section__title-contact');
    sectionHeading.classList.add('section__heading');
    sectionText.classList.add('section__text');
    sectionWrapper.classList.add('contact__wrap');
    sectionHeading.innerHTML = data.sections[4].title;
    sectionText.innerHTML = data.sections[4].subtitle;
    sectionWrapper.innerHTML = `<div class="contact__item">
                                    <div class="socials__wrap
                                                socials__wrap-contact">
                                        <a href="${data.socials.facebook}" target="_blank" class="socials__item"></a>
                                        <a href="${data.socials.instagram}" target="_blank" class="socials__item"></a>
                                        <a href="${data.socials.dribbble}" target="_blank" class="socials__item"></a>
                                    </div>
                                        <h2 class="contact__title">
                                            ${data.sections[4].info.title}
                                        </h2>
                                    <div class="contact__info">
                                        <div class="contact__step">
                                            <h5 class="contact__step_title">
                                                <span class="light">${data.sections[4].info.steps[0].id}.</span>
                                                ${data.sections[4].info.steps[0].title}
                                            </h5>
                                            <p class="contact__step_text">
                                                ${data.sections[4].info.steps[0].text}
                                            </p>
                                        </div>
                                        <div class="contact__step">
                                            <h5 class="contact__step_title">
                                                <span class="light">${data.sections[4].info.steps[1].id}.</span>
                                                ${data.sections[4].info.steps[1].title}
                                            </h5>
                                            <p class="contact__step_text">
                                                ${data.sections[4].info.steps[1].text}
                                            </p>
                                        </div>
                                        <div class="contact__step">
                                            <h5 class="contact__step_title">
                                                <span class="light">${data.sections[4].info.steps[2].id}.</span>
                                                ${data.sections[4].info.steps[2].title}
                                            </h5>
                                            <p class="contact__step_text">
                                                ${data.sections[4].info.steps[2].text}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div class="contact__item">
                                    <p class="contact__form_info">
                                        ${data.sections[4].formTitle}
                                        <strong>${data.sections[4].timeForReply}</strong>
                                    </p>
                                    <div class="contact__form_wrap">
                                        <div class="form__fields">
                                            <label class="form__label"
                                                    for="contact_username">
                                                    ${data.sections[4].formFields[0]}
                                            </label>
                                            <input class="form__input"
                                                    type="text"
                                                    id="contact_username"/>
                                            <label class="form__label"
                                                    for="contact_email">
                                                    ${data.sections[4].formFields[1]}
                                            </label>
                                            <input class="form__input"
                                                    type="email"
                                                    id="contact_email"/>
                                            <label class="form__label"
                                                    for="contact_password">
                                                    ${data.sections[4].formFields[2]}
                                            </label>
                                            <input class="form__input"
                                                    type="password"
                                                    id="contact_password"/>
                                            <div class="form__show-password">show</div>
                                            <button class="form__button
                                                            button
                                                            button-dark"
                                                            type="submit">
                                                            ${data.sections[4].formFields[3]}
                                            </button>
                                            <p class="form__info">
                                                ${data.sections[4].formText}
                                                <a href="${data.sections[4].contactEmail}">
                                                    <span class="strong">
                                                    ${data.sections[4].contactEmail}</span>
                                                </a>
                                            </p>
                                        </div>
                                        <div class="contact__map"></div>
                                    </div>
                                </div>`;
    sectionTitle.append(sectionHeading);
    sectionTitle.append(sectionText);
    section.append(sectionTitle);
    section.append(sectionWrapper);
    fragment.append(section);
    MAIN_WRAPPER.append(fragment);
};

const createBlogPost = (parentNode, data) => {
    const posts = data.sections[1].posts;
    for (let i = 0; i < posts.length; i++) {
        const fragment = document.createDocumentFragment();
        const parentDiv = document.createElement('div');
        parentDiv.classList.add('post__wrap');
        parentDiv.innerHTML = `<div class="post__img"></div>
                        <div class="post__description">
                            <h3>
                                <a class="post__title" href="#">
                                    ${posts[i].title}
                                </a>
                            </h3>
                            <p class="post__text">
                                ${posts[i].text}
                            </p>
                            <div class="post__info">
                                <span class="post__info-date">
                                    ${posts[i].info.date}
                                </span>
                                <span class="post__info-time">
                                    ${posts[i].info.reading}
                                </span>
                                <span class="post__info-comments">
                                    ${posts[i].info.comments}
                                </span>
                            </div>
                        </div>`;
        fragment.append(parentDiv);
        parentNode.append(fragment);
    };
    return parentNode;
};

const createPortfolioSlide = (parentNode, data) => {
    const fragment = document.createDocumentFragment();
    const sliderWrapper = document.createElement('div');
    const sliderControls = document.createElement('div');
    sliderWrapper.classList.add('portfolio__slide-wrap')
    const slides = data.sections[2].slides;
    for (let i = 0; i < slides.length; i++) {
        const parentDiv = document.createElement('div');
        parentDiv.classList.add('portfolio__slide');
        parentDiv.innerHTML = `<img class="portfolio__slide_image" src=${PORTFOLIO_IMAGES[i]}>
                                <h3 class="portfolio__slide_title">
                                    ${slides[i].title}
                                </h3>
                                <h4 class="portfolio__slide_text">
                                    ${slides[i].text}
                                </h4>
                                <a href="#"
                                    class="portfolio__slide_hover hover_link"></a>
                                <a href="#"
                                    class="portfolio__slide_hover hover_lens"></a>`;
        sliderWrapper.append(parentDiv);
    };
    sliderControls.classList.add('slide__buttons_wrap');
    sliderControls.innerHTML = `<button class="slide__button slide__button-prev slide__button-prev-portfolio">
                                </button_slide_button>
                                <button class="slide__button slide__button-next slide__button-next-portfolio">
                                </button_slide_button>`;
    fragment.append(sliderWrapper, sliderControls);
    parentNode.append(fragment);
    return parentNode;
};

const createTestimonialsSlide = (parentNode, data) => {
    const slidesData = data.sections[3].slides;
    const fragment = document.createDocumentFragment();
    const sliderWrapper = document.createElement('div');
    const sliderControls = document.createElement('div');
    const prevButton = document.createElement('button');
    const nextButton = document.createElement('button');
    sliderWrapper.classList.add('testimonials__slider');
    sliderControls.classList.add('testimonials__slider-controls');
    prevButton.classList.add(
        'slide__button',
        'slide__button-prev',
        'slide__button-prev-testimonials'
    );
    nextButton.classList.add(
        'slide__button',
        'slide__button-next',
        'slide__button-next-testimonials'
    );
    for (let i = 0; i < slidesData.length; i++) {
        const parentDiv = document.createElement('div');
        parentDiv.classList.add('testimonials__slide');
        parentDiv.innerHTML = `<div class="testimonials__info">
                        <h4 class="testimonials__text">
                            ${slidesData[i].text}
                        </h4>
                        <h5 class="testimonials__author">${slidesData[i].author}</h5>
                        <h5 class="testimonials__author-prof">
                            ${slidesData[i].profession}
                        </h5>
                    </div>
                    <div class="testimonials__photo">
                        <img src='${slidesData[i].image}'>
                    </div>`;
        sliderWrapper.append(parentDiv);
    };
    sliderControls.append(prevButton, nextButton);
    fragment.append(sliderWrapper, sliderControls);
    parentNode.append(fragment);
    return parentNode;
};

getData().then(data => initContent(data));