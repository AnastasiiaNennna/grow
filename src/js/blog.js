const MAIN_WRAPPER = document.querySelector('#root');
const blogClasses = ['blog__item-video', 'blog__item-audio', 'blog__item-img', 'blog__item-text'];

async function getData(){
    try {
        const response =  await import('../assets/data/blogData.json', {
                            assert: {
                                type: 'json',
                            };
        });
        return response.default;
    } catch (err) {
        return err;
    }
}

function init(data) {
    initTitle(data);
    initArticles(data);
    initButton(data);
}

function initTitle(data) {
    const fragment = document.createDocumentFragment();
    const title = document.createElement('h2');
    const searchInput = document.createElement('input');
    const searchImage = document.createElement('div');
    title.classList.add('main__title');
    title.innerHTML = data.title;
    searchInput.classList.add('main__search-form');
    searchInput.setAttribute('type', 'text');
    searchInput.setAttribute('placeholder', 'Search by author');
    searchImage.classList.add('main__search-elem');
    fragment.append(title);
    fragment.append(searchInput);
    fragment.append(searchImage);
    MAIN_WRAPPER.append(fragment);
}

function initArticles(data) {
    const fragment = document.createDocumentFragment();
    const wrapper = document.createElement('div');
    wrapper.classList.add('blog');
    createArticle(wrapper, data);
    fragment.append(wrapper);
    MAIN_WRAPPER.append(fragment);
}

function initButton(data) {
    const fragment = document.createDocumentFragment();
    const wrapper = document.createElement('div');
    const button = document.createElement('button');
    wrapper.classList.add('main__more');
    button.classList.add('main__more-button', 'button', 'button-dark');
    button.textContent = data.buttonText;
    wrapper.append(button);
    fragment.append(wrapper);
    MAIN_WRAPPER.append(fragment);
}

function createArticle(parentNode, data) {
    const fragment = document.createDocumentFragment();
    const articles = data.articles;

    for (let i = 0; i < articles.length; i++) {
        const parentDiv = document.createElement('div');
        const image = document.createElement('div');
        const article = document.createElement('div');
        const articleHeader = document.createElement('div');
        const articleTitle = document.createElement('h3');
        const articleText = document.createElement('p');
        parentDiv.classList.add('blog__item', blogClasses[i]);
        parentDiv.setAttribute('data-item', articles[i].id);
        image.classList.add('item__img');
        article.classList.add('item__post', 'post');
        articleHeader.classList.add('post__header');
        articleHeader.innerHTML = `<div class="post__header-title">${articles[i].author}</div>
                                        <div class="post__header-info">
                                            <span class="info__data">${articles[i].info.date}</span>
                                            <span class="info__time">${articles[i].info.reading}</span>
                                            <span class="info__comments">${articles[i].info.comments}</span>
                                            <div class="info__rating">
                                                <img class="info__rating-star" src="${articles[i].info.rating[0]}"/>
                                                <img class="info__rating-star" src="${articles[i].info.rating[1]}"/>
                                                <img class="info__rating-star" src="${articles[i].info.rating[2]}"/>
                                                <img class="info__rating-star" src="${articles[i].info.rating[3]}"/>
                                                <img class="info__rating-star" src="${articles[i].info.rating[4]}"/>
                                        </div>`;
        articleTitle.classList.add('post__title');
        articleTitle.textContent = articles[i].title;
        articleText.classList.add('post__text');
        articleText.textContent = articles[i].text;
        article.append(articleHeader);
        article.append(articleTitle);
        article.append(articleText);
        parentDiv.append(image);
        parentDiv.append(article);
        fragment.append(parentDiv);
    }
    parentNode.append(fragment);
    customizeArticles(parentNode);
    return parentNode;
}

function customizeArticles(parentNode) {
    const customizeTextArticle = parentNode.getElementsByClassName(`${blogClasses[3]}`)[0];
    const customizeImageArticle = parentNode.getElementsByClassName(`${blogClasses[0]}`)[0];
    const videoButton = document.createElement('div');
    customizeTextArticle.getElementsByClassName('item__img')[0].remove();
    videoButton.classList.add('item__video-btn');
    customizeImageArticle.append(videoButton);
}

getData().then((data) => init(data));
