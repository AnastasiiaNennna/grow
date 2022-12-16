class Block {
    static CONTENT_CLASSES = [
        'blog__item-video',
        'blog__item-audio',
        'blog__item-img',
        'blog__item-text',
    ];
    static MONTH = ['jan', 'feb', 'mar', 'apr', 'may', 'june', 'july', 'aug', 'sept', 'oct', 'nov', 'dec'];

    constructor(options) {
        this.container = options.container;
        this.data = options.data;
        this.apiKey = options.apiKey;
        this.baseImageUrl = options.baseImageUrl;
        this.baseVideoUrl = options.baseVideoUrl;
        this.itemUrl = options.itemUrl;
        this.isPersonSearch = options.isPersonSearch;
        this.item = null;

        this.#renderPost();
    }

    #renderPost() {
        const fragment = document.createDocumentFragment();
        this.createArticle(fragment);
        this.container.append(fragment);
        this.#initRatings();
    }

    createArticle(parentNode) {
        const blockClasses = Block.CONTENT_CLASSES;
        this.data = this.isPersonSearch ? this.data[0].known_for : this.data;

        for (let i = 0; i < blockClasses.length; i++) {

            if (this.data[i] === undefined) {
                return;
            }

            const fragment = document.createDocumentFragment();
            const itemData = this.data[i];
            const parentDiv = document.createElement('div');
            const article = document.createElement('div');
            const articleHeader = document.createElement('div');
            const articleTitle = document.createElement('h3');
            const articleText = document.createElement('p');
            const articleButton = document.createElement('button');

            this.#createArticleHeader(articleHeader, itemData);

            parentDiv.classList.add('blog__item', blockClasses[i]);
            article.classList.add('item__post', 'post');
            articleHeader.classList.add('post__header');
            articleTitle.classList.add('post__title');
            articleText.classList.add('post__text');
            articleButton.classList.add('post__button', 'button', 'button-light');

            articleTitle.textContent = itemData.title;
            articleText.textContent = itemData.overview;
            articleButton.textContent = 'Read more';

            article.append(articleHeader,
                articleTitle,
                articleText,
                articleButton);

            this.#addBlockImage(parentDiv, blockClasses[i], itemData);

            parentDiv.append(article);
            fragment.append(parentDiv);

            parentNode.append(fragment);

            articleButton.addEventListener('click',
                this.onReadMoreButtonClick.bind(this));
        }
    }

    #createArticleHeader(wrapper, data) {
        wrapper.innerHTML = `<img class="post__header-photo" 
                                            src="${this.baseImageUrl}${data.poster_path}"
                                            alt="block poster">
                                        <div class="post__header-title">
                                            ${data.original_title}
                                        </div>
                                        <div class="post__header-info">
                                            <span class="info__data">
                                                ${this.#convertDate(data.release_date)}
                                            </span>
                                            <div class="rating__body">
                                                <div class="rating__active"></div>
                                                <div class="rating__items">
                                                    <input type="radio" class="rating__item" value="1" name="rating">
                                                    <input type="radio" class="rating__item" value="2" name="rating">
                                                    <input type="radio" class="rating__item" value="3" name="rating">
                                                    <input type="radio" class="rating__item" value="4" name="rating">
                                                    <input type="radio" class="rating__item" value="5" name="rating">
                                                </div>
                                                <span class="rating__value">
                                                    ${data.vote_average}
                                                </span>
                                            </div>
                                            <span class="info__comments">
                                                ${data.vote_count}
                                            </span>`;
    }

    #addBlockImage(wrapper, className, data) {

        if (className !== 'blog__item-text') {
            const imageWrapper = document.createElement('div');
            const image = document.createElement('img');

            imageWrapper.classList.add('item__img');
            image.setAttribute('src',
                `${this.baseImageUrl}${data.backdrop_path}`);
            imageWrapper.append(image);
            wrapper.append(imageWrapper)

            this.#addVideoButton(imageWrapper, className, data);
            this.#addBlockAudio(className, data);
        }
    }

    #addVideoButton(wrapper, className, data) {

        if (className === 'blog__item-video') {
            this.item = data;
            const videoButton = document.createElement('div');
            videoButton.classList.add('item__video-button');
            wrapper.append(videoButton);

            videoButton.addEventListener('click',
                this.onVideoButtonClick.bind(this));
        }
    }

    #addBlockAudio(className, data) {

        if (className === 'blog__item-audio') {
            this.item = data;

            setTimeout(() => {
                const wrapper = document.querySelector('.blog__item-audio .post');
                const sectionAudio = document.createElement('audio');

                sectionAudio.classList.add('post__audio');
                sectionAudio.setAttribute('controls', 'controls');
                sectionAudio.setAttribute('src',
                    `https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3`);
                wrapper.append(sectionAudio);
            }, 0)
        }
    }


    #initRatings() {
        const ratings = document.querySelectorAll('.rating__body');

        if (ratings.length > 0) {
            this.#initRating(ratings);
        }
    }

    #initRating(ratings) {
        for (let i = 0; i < ratings.length; i++) {
            const rating = ratings[i];
            let ratingValue = rating.querySelector('.rating__value');
            let ratingActive = rating.querySelector('.rating__active');
            ratingActive.style.width = `${ratingValue.innerHTML.trim()*10}%`;
        }
    }

    #getMovieDetails(list) {

        if (list.hasOwnProperty('US')) {
            return window.open(list.US.link);
        }

        return window.open(Block.TMDB);
    }

    #getVideoLink(list, url) {
        const videoItem = this.#getRandom(0, list.length - 1);
        window.open(url + list[videoItem].key);
    }

    #getRandom(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    #convertDate(date) {
        const dateArray = date.split('-');
        return `${dateArray[2]} ${Block.MONTH[+dateArray[1] - 1]}, ${dateArray[0]}`;
    }

    onReadMoreButtonClick() {
        const itemId = this.item.id;
        const getData = new Http({
            baseUrl: this.itemUrl + itemId + '/watch/providers',
            apiKey: this.apiKey,
        });
        getData.list().then((list) => this.#getMovieDetails(list));
    }

    onVideoButtonClick() {
        const itemId = this.item.id;
        const getData = new Http({
            baseUrl: this.itemUrl + itemId + '/videos',
            apiKey: this.apiKey,
        });

        getData.list()
            .then((list) => this.#getVideoLink(list, this.baseVideoUrl));
    }
}
