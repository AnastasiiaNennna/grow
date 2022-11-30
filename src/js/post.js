const MAIN_WRAPPER = document.querySelector('#root');

async function getData(){
    try {
        const response =  await import('../assets/data/postData.json', {
                            assert: {
                                type: 'json'
                            }
        });
        return response.default
    } catch (err) {
        return err
    }
}

function init(data) {
    initPostSection(data);
    initSideSection(data);
}

function initPostSection(data) {
    const fragment = document.createDocumentFragment();
    const section = document.createElement('div');
    const sectionTitle = document.createElement('h1');
    const sectionHeading = document.createElement('div');
    const sectionImage = document.createElement('div');
    const sectionAudio = document.createElement('audio');
    section.classList.add('main__post');
    sectionTitle.classList.add('post__title');
    sectionTitle.textContent = data.title;
    sectionHeading.classList.add('post__header');
    sectionImage.classList.add('post__img');
    sectionAudio.classList.add('post__audio');
    sectionAudio.setAttribute('controls', 'controls');
    sectionAudio.setAttribute('src', `${data.audio}`);
    createPostHeading(sectionHeading, data);
    section.append(sectionTitle,
        sectionHeading,
        sectionImage,
        sectionAudio,
        createPostArticle(data),
        createPostSocials(data),
        createPostReviews(data),
    );
    fragment.append(section);
    MAIN_WRAPPER.append(fragment);
}

function initSideSection(data) {
    const fragment = document.createDocumentFragment();
    const section = document.createElement('div');
    section.classList.add('main__sidebar');
    section.innerHTML = `<div class="sidebar__posts">
                            <h2 class="sidebar__posts-title">Latest posts</h2>
                            <div class="sidebar__posts-wrap">
                                <div class="sidebar__posts-item">
                                    <div class="posts-item__img"></div>
                                        <div class="posts-item__wrap">
                                            <h3 class="wrap__title">
                                                Much cure inappropriate could this restrictions …
                                            </h3>
                                            <div class="wrap__info">
                                                <span class="wrap__info-data">20 oct, 2019</span>
                                                <span class="wrap__info-time">10 min read</span>
                                                <span class="wrap__info-comments">11</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="sidebar__posts-item">
                                        <div class="posts-item__img"></div>
                                            <div class="posts-item__wrap">
                                                <h3 class="wrap__title">
                                                    Much cure inappropriate could this restrictions …
                                                </h3>
                                                <div class="wrap__info">
                                                    <span class="wrap__info-data">20 oct, 2019</span>
                                                    <span class="wrap__info-time">10 min read</span>
                                                    <span class="wrap__info-comments">11</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <button class="sidebar__posts-button">More posts</button>
                                </div>
                                <div class="sidebar__categories">
                                    <h2 class="sidebar__categories-title">Categories</h2>
                                    <div class="sidebar__categories-wrapper">
                                        <div class="sidebar__categories-item">
                                            <p class="item__list">
                                                Restaurant food (3)
                                            </p>
                                        </div>
                                        <div class="sidebar__categories-item">
                                            <p class="item__list">
                                                Travel news (3)
                                            </p>
                                            <a href="#" class="item__element">Hiking</a>
                                            <a href="#" class="item__element">Bicycle trip</a>
                                            <a href="#" class="item__element">Mountains trip</a>
                                        </div>
                                        <div class="sidebar__categories-item">
                                            <p class="item__list">
                                                Modern technology (6)
                                            </p>
                                        </div>
                                        <div class="sidebar__categories-item">
                                            <p class="item__list">
                                                Product (4)
                                            </p>
                                        </div>
                                        <div class="sidebar__categories-item">
                                            <p class="item__list">
                                                Inspiration (2)
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div class="sidebar__tags">
                                    <h2 class="sidebar__tags-title">Tags</h2>
                                    <div class="sidebar__tags-wrapper">
                                        <button class="tags__button">Love</button>
                                        <button class="tags__button">Sings</button>
                                        <button class="tags__button">Waterfall</button>
                                        <button class="tags__button">Inspiration</button>
                                        <button class="tags__button">Quotes</button>
                                        <button class="tags__button">Sea</button>
                                        <button class="tags__button">Sense</button>
                                        <button class="tags__button">Coffee</button>
                                        <button class="tags__button">Gold</button>
                                        <button class="tags__button">Images</button>
                                        <button class="tags__button">Courage</button>
                                        <button class="tags__button">Dancing</button>
                                        <button class="tags__button">Video</button>
                                    </div>
                                </div>
                            </div>`;
    fragment.append(section);
    MAIN_WRAPPER.append(fragment);
}

function createPostHeading(parentDiv, data) {
    parentDiv.innerHTML = `<div class="post__header-title">${data.author}</div>
                            <div class="post__header-info">
                                <span class="info__data">${data.info.date}</span>
                                <span class="info__time">${data.info.reading}</span>
                                <span class="info__comments">${data.info.comments}</span>
                                <div class="info__rating">
                                    <img class="info__rating_star" src="${data.info.rating[0]}"/>
                                    <img class="info__rating_star" src="${data.info.rating[1]}"/>
                                    <img class="info__rating_star" src="${data.info.rating[2]}"/>
                                    <img class="info__rating_star" src="${data.info.rating[3]}"/>
                                    <img class="info__rating_star" src="${data.info.rating[4]}"/>
                                </div>
                            </div>`;
    return parentDiv;
}

function createPostArticle(data) {
    const fragment = document.createDocumentFragment();
    const articleData = data.text_article;
    fragment.append(firstArticleParagraph(articleData[0]));
    fragment.append(secondArticleParagraph(articleData[1]));
    fragment.append(thirdArticleParagraph(articleData[2]));
    fragment.append(forthArticleParagraph(articleData[3]));
    fragment.append(fifthArticleParagraph(articleData[4]));
    fragment.append(sixthArticleParagraph(articleData[5]));
    fragment.append(seventhArticleParagraph(articleData[6]));
    return fragment;
}

function firstArticleParagraph(data) {
    const fragment = document.createDocumentFragment();
    const paragraph = document.createElement('p');
    paragraph.classList.add('post__article');
    paragraph.innerHTML = `${data.main_text}
                            <span class="strong">${data.strong_text}</span>
                            ${data.end_text}`;
    fragment.append(paragraph);
    return fragment;
}

function secondArticleParagraph(data) {
    const fragment = document.createDocumentFragment();
    const paragraph = document.createElement('p');
    paragraph.classList.add('post__article');
    paragraph.textContent = data.main_text;
    fragment.append(paragraph);
    return fragment;
}

function thirdArticleParagraph(data) {
    const fragment = document.createDocumentFragment();
    const paragraph = document.createElement('p');
    paragraph.classList.add('post__article');
    paragraph.innerHTML = `${data.start_text}
                            <span class="strong">${data.strong_text}</span>
                            ${data.main_text}`;
    fragment.append(paragraph);
    return fragment;
}

function forthArticleParagraph(data) {
    const fragment = document.createDocumentFragment();
    const title = document.createElement('h2');
    const paragraph = document.createElement('p');
    title.classList.add('post__article-title');
    title.textContent = data.title;
    paragraph.classList.add('post__article');
    paragraph.textContent = data.main_text;
    fragment.append(title, paragraph);
    return fragment;
}

function fifthArticleParagraph(data) {
    const fragment = document.createDocumentFragment();
    const paragraph = document.createElement('p');
    paragraph.classList.add('post__article');
    paragraph.innerHTML = `${data.start_text}
                            <span class="crossed-out">${data.crossed_out_text}</span>
                            ${data.main_text}`;
    fragment.append(paragraph);
    return fragment;
}

function sixthArticleParagraph(data) {
    const fragment = document.createDocumentFragment();
    const paragraph = document.createElement('p');
    paragraph.classList.add('post__article', 'quote');
    paragraph.innerHTML = `<span class="strong">${data.strong_text}</span>
                            ${data.main_text}`;
    fragment.append(paragraph);
    return fragment;
}

function seventhArticleParagraph(data) {
    const fragment = document.createDocumentFragment();
    const title = document.createElement('h2');
    const paragraph = document.createElement('p');
    title.classList.add('post__article-title');
    title.textContent = data.title;
    paragraph.classList.add('post__article');
    paragraph.innerHTML = `${data.main_text}
                            <a href="${data.link_url}" class="link">${data.link_text}</a>
                            ${data.end_text}`;
    fragment.append(title, paragraph);
    return fragment;
}

function createPostSocials(data) {
    const fragment = document.createDocumentFragment();
    const socialsData = data.socials;
    const socialsWrapper = document.createElement('div');
    socialsWrapper.classList.add('post__socials');
    socialsWrapper.innerHTML = `<a href="${socialsData.likes_url}" class="socials__likes">${socialsData.likes_quantity}</a>
                                <div class="socials__wrap">
                                    <a href="${socialsData.socials_url[0].url}" target="_blank" class="socials__item"></a>
                                    <a href="${socialsData.socials_url[1].url}" target="_blank" class="socials__item"></a>
                                    <a href="${socialsData.socials_url[2].url}" target="_blank" class="socials__item"></a>
                                </div>`;
    fragment.append(socialsWrapper);
    return fragment;
}

function createPostReviews(data) {
    const fragment = document.createDocumentFragment();
    const section = document.createElement('div');
    const sectionTitle = document.createElement('h2');
    section.classList.add('post__reviews-wrapper');
    sectionTitle.classList.add('reviews__title');
    sectionTitle.textContent = data.review_title;
    section.append(sectionTitle, createReviews(data));
    fragment.append(section);
    return fragment;
}

function createReviews(data) {
    const reviewData = data.reviews;
    const fragment = document.createDocumentFragment();
    const reviewWrapper = document.createElement('div');
    const button = document.createElement('button');
    reviewWrapper.classList.add('reviews__wrapper');
    button.classList.add('review__button', 'button', 'button-light');
    button.innerHTML = data.more_reviews;

    for (let i = 0; i < reviewData.length; i++) {
        const parentDiv = document.createElement('div');
        parentDiv.classList.add('reviews__item', 'review');
        parentDiv.innerHTML = `<div class="review__info">
                                    <div class="info__wrapper">
                                        <h3 class="info__author">
                                            ${reviewData[i].author}
                                        </h3>
                                        <div class="info__rating">
                                            <img class="info__rating_star" src="${reviewData[i].rating[0]}"/>
                                            <img class="info__rating_star" src="${reviewData[i].rating[1]}"/>
                                            <img class="info__rating_star" src="${reviewData[i].rating[2]}"/>
                                            <img class="info__rating_star" src="${reviewData[i].rating[3]}"/>
                                            <img class="info__rating_star" src="${reviewData[i].rating[4]}"/>
                                        </div>
                                    </div>
                                    <div class="review__time">${reviewData[i].review_time}</div>
                                </div>
                                <p class="review__text">${reviewData[i].review}</p>
                                <a class="review__read" href="#">Read more</a>`;
        reviewWrapper.append(parentDiv);
    }
    reviewWrapper.append(button);
    fragment.append(reviewWrapper);
    customizeLastReview(reviewWrapper);
    return fragment;
}

function customizeLastReview(node) {
    const lastReview = node.getElementsByClassName('review')[2];
    lastReview.lastChild.remove();
}

getData().then((data) => init(data));
