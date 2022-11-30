class Post {
    static API_KEY = '?api_key=7148347e54035e42dc1847fd6b413dd5';
    static DATA_ITEM_URL = `https://api.themoviedb.org/3/movie/`;
    static BASE_IMAGE = './img/blog_post_1.png';
    static TMDB = 'https://www.themoviedb.org/';
    static MONTH = ['jan', 'feb', 'mar', 'apr', 'may', 'june', 'july', 'aug', 'sept', 'oct', 'nov', 'dec'];

    constructor(options) {
        this.container = options.container;
        this.filter = options.filter;
        this.apiKey = Post.API_KEY;
        this.list = [];
        this.itemUrl = Post.DATA_ITEM_URL;
    }

    renderPost(list) {
        const fragment = document.createDocumentFragment();
        this.createArticle(fragment, list);
        this.container.append(fragment);
        this.list = list;
        this.initRatings();
        return this.list;
    }

    createArticle(parentNode, data) {
        console.log(parentNode);
        console.log(data);
    }

    initRatings() {
        const ratings = document.querySelectorAll('.rating__body');

        if (ratings.length > 0) {
            this.#initRatings(ratings);
        }
    }

    #initRatings(ratings) {
        for (let i = 0; i < ratings.length; i++) {
            const rating = ratings[i];
            let ratingValue = rating.querySelector('.rating__value');
            let ratingActive = rating.querySelector('.rating__active');
            ratingActive.style.width = `${ratingValue.innerHTML.trim()*10}%`;
        }
    }

    getMoviePoster(url, path) {
        let posterUrl = url + path;

        if (path === null) {
            posterUrl = Post.BASE_IMAGE;
            return posterUrl;
        }

        return posterUrl;
    }

    onReadMoreButtonClick() {
        const itemId = this.item.id;
        const getData = new Http({
            baseUrl: this.itemUrl + itemId + '/watch/providers',
            apiKey: this.apiKey,
        });
        getData.list().then((list) => this.getMovieDetails(list));
    }

    getMovieDetails(list) {
        if (list.hasOwnProperty('US')) {
            return window.open(list.US.link);
        }

        return window.open(Post.TMDB);
    }

    getDataList(data) {
        return this.marker === 'actor' ?
            data[0].known_for[this.listItem] :
            data[this.listItem];
    }

    getPostTitle(data) {
        return data.original_title === undefined ?
            data.original_name :
            data.original_title;
    }

    getPostPremier(data) {
        const date = data.release_date === undefined
                        ? data.first_air_date
                        : data.release_date;
        return this.convertDate(date);
    }

    convertDate(date) {
        const dateArray = date.split('-');
        return `${dateArray[2]} ${Post.MONTH[+dateArray[1]]}, ${dateArray[0]}`;
    }
}

class VideoPost extends Post {
    static DATA_URL = `https://api.themoviedb.org/3/movie/upcoming`;
    static BASE_IMAGE_URL = 'https://image.tmdb.org/t/p/original';
    static VIDEO_BASE_URL = 'https://www.youtube.com/watch?v=';

    constructor(options) {
        super(options);
        this.blockClass = options.blockClass;
        this.listItem = options.itemIndex;
        this.filter = options.filter;
        this.item = null;
        this.dataResource = new Http({
            baseUrl: VideoPost.DATA_URL,
            apiKey: this.apiKey,
            filter: this.filter,
        });
        this.dataResource.list()
            .then((list) => this.renderPost(list));
    }

    createArticle(parentNode, data) {
        const fragment = document.createDocumentFragment();
        const itemData = data[this.listItem];
        const parentDiv = document.createElement('div');
        const imageWrapper = document.createElement('div');
        const image = document.createElement('img');
        const article = document.createElement('div');
        const articleHeader = document.createElement('div');
        const articleTitle = document.createElement('h3');
        const articleText = document.createElement('p');
        const articleButton = document.createElement('button');
        const videoButton = document.createElement('div');
        parentDiv.classList.add('blog__item', this.blockClass);
        imageWrapper.classList.add('item__img');
        image.setAttribute('src',
            `${VideoPost.BASE_IMAGE_URL}${itemData.backdrop_path}`);
        article.classList.add('item__post', 'post');
        articleHeader.classList.add('post__header');
        console.log(itemData)
        articleHeader.innerHTML = `<img class="post__header-photo" 
                                        src="${VideoPost.BASE_IMAGE_URL}${itemData.poster_path}">
                                    <div class="post__header-title">
                                        ${itemData.original_title}
                                    </div>
                                    <div class="post__header-info">
                                        <span class="info__data">
                                            ${this.convertDate(itemData.release_date)}
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
                                                ${itemData.vote_average}
                                            </span>
                                        </div>
                                        <span class="info__comments">
                                            ${itemData.vote_count}
                                        </span>`;
        articleTitle.classList.add('post__title');
        articleTitle.textContent = itemData.title;
        articleText.classList.add('post__text');
        articleText.textContent = itemData.overview;
        articleButton.classList.add('post__button', 'button', 'button-light');
        articleButton.textContent = 'Read more';
        videoButton.classList.add('item__video-button');
        imageWrapper.append(image,
            videoButton);
        article.append(articleHeader,
            articleTitle,
            articleText,
            articleButton);
        parentDiv.append(imageWrapper, article);
        fragment.append(parentDiv);
        parentNode.append(fragment);
        articleButton.addEventListener('click',
            this.onReadMoreButtonClick.bind(this));
        videoButton.addEventListener('click',
            this.onVideoButtonClick.bind(this));
        return this.item = itemData;
    }

    onVideoButtonClick() {
        const itemId = this.item.id;
        const getData = new Http({
            baseUrl: this.itemUrl + itemId + '/videos',
            apiKey: this.apiKey,
        });
        getData.list()
            .then((list) => this.getVideoLink(list, VideoPost.VIDEO_BASE_URL));
    }

    getVideoLink(list, url) {
        const videoItem = this.getRandom(0, list.length - 1);
        window.open(url + list[videoItem].key);
    }

    getRandom(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}

class AudioPost extends Post {
    static DATA_URL = `https://api.themoviedb.org/3/movie/top_rated`;
    static BASE_IMAGE_URL = 'https://image.tmdb.org/t/p/original';

    constructor(options) {
        super(options);
        this.blockClass = options.blockClass;
        this.listItem = options.itemIndex;
        this.filter = options.filter;
        this.item = null;
        this.dataResource = new Http({
            baseUrl: AudioPost.DATA_URL,
            apiKey: this.apiKey,
            filter: this.filter,
        });
        this.dataResource.list().then((list) => this.renderPost(list));
    }

    createArticle(parentNode, data) {
        const fragment = document.createDocumentFragment();
        const itemData = data[this.listItem];
        const parentDiv = document.createElement('div');
        const imageWrapper = document.createElement('div');
        const image = document.createElement('img');
        const article = document.createElement('div');
        const articleHeader = document.createElement('div');
        const articleTitle = document.createElement('h3');
        const articleText = document.createElement('p');
        const articleButton = document.createElement('button');
        const sectionAudio = document.createElement('audio');
        parentDiv.classList.add('blog__item', this.blockClass);
        imageWrapper.classList.add('item__img');
        console.log(itemData)
        image.setAttribute('src',
            `${AudioPost.BASE_IMAGE_URL}${itemData.backdrop_path}`);
        article.classList.add('item__post', 'post');
        articleHeader.classList.add('post__header');
        articleHeader.innerHTML = `<img class="post__header-photo" 
                                        src="${AudioPost.BASE_IMAGE_URL}${itemData.poster_path}">
                                    <div class="post__header-title">
                                        ${itemData.original_title}
                                    </div>
                                    <div class="post__header-info">
                                        <span class="info__data">
                                            ${this.convertDate(itemData.release_date)}
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
                                                ${itemData.vote_average}
                                            </span>
                                        </div>
                                        <span class="info__comments">
                                            ${itemData.vote_count}
                                        </span>`;
        articleTitle.classList.add('post__title');
        articleTitle.textContent = itemData.title;
        articleText.classList.add('post__text');
        articleText.textContent = itemData.overview;
        articleButton.classList.add('post__button', 'button', 'button-light');
        articleButton.textContent = 'Read more';
        sectionAudio.classList.add('post__audio');
        sectionAudio.setAttribute('controls', 'controls');
        sectionAudio.setAttribute('src',
            `https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3`);
        imageWrapper.append(image);
        article.append(articleHeader,
            articleTitle,
            sectionAudio,
            articleText,
            articleButton);
        parentDiv.append(imageWrapper, article);
        fragment.append(parentDiv);
        parentNode.append(fragment);
        articleButton.addEventListener('click',
            this.onReadMoreButtonClick.bind(this));
        return this.item = itemData;
    }
}

class ImagePost extends Post {
    static DATA_URL = `https://api.themoviedb.org/3/movie/popular`;
    static BASE_IMAGE_URL = 'https://image.tmdb.org/t/p/original';
    constructor(options) {
        super(options);
        this.blockClass = options.blockClass;
        this.listItem = options.itemIndex;
        this.filter = options.filter;
        this.item = null;
        this.dataResource = new Http({
            baseUrl: ImagePost.DATA_URL,
            apiKey: this.apiKey,
            filter: this.filter,
        });
        this.dataResource.list().then((list) => this.renderPost(list));
    }

    createArticle(parentNode, data) {
        const fragment = document.createDocumentFragment();
        const itemData = data[this.listItem];
        const parentDiv = document.createElement('div');
        const imageWrapper = document.createElement('div');
        const image = document.createElement('img');
        const article = document.createElement('div');
        const articleHeader = document.createElement('div');
        const articleTitle = document.createElement('h3');
        const articleText = document.createElement('p');
        const articleButton = document.createElement('button');
        parentDiv.classList.add('blog__item', this.blockClass);
        imageWrapper.classList.add('item__img');
        console.log(itemData)
        image.setAttribute('src',
            `${ImagePost.BASE_IMAGE_URL}${itemData.backdrop_path}`);
        article.classList.add('item__post', 'post');
        articleHeader.classList.add('post__header');
        articleHeader.innerHTML = `<img class="post__header-photo" 
                                        src="${ImagePost.BASE_IMAGE_URL}${itemData.poster_path}">
                                    <div class="post__header-title">
                                        ${itemData.original_title}
                                    </div>
                                    <div class="post__header-info">
                                        <span class="info__data">
                                            ${this.convertDate(itemData.release_date)}
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
                                                ${itemData.vote_average}
                                            </span>
                                        </div>
                                        <span class="info__comments">
                                            ${itemData.vote_count}
                                        </span>`;
        articleTitle.classList.add('post__title');
        articleTitle.textContent = itemData.title;
        articleText.classList.add('post__text');
        articleText.textContent = itemData.overview;
        articleButton.classList.add('post__button', 'button', 'button-light');
        articleButton.textContent = 'Read more';
        imageWrapper.append(image);
        article.append(articleHeader,
            articleTitle,
            articleText,
            articleButton);
        parentDiv.append(imageWrapper, article);
        fragment.append(parentDiv);
        parentNode.append(fragment);
        articleButton.addEventListener('click',
            this.onReadMoreButtonClick.bind(this));
        return this.item = itemData;
    }
}

class TextPost extends Post {
    static DATA_URL = `https://api.themoviedb.org/3/movie/now_playing`;
    static BASE_IMAGE_URL = 'https://image.tmdb.org/t/p/original';
    constructor(options) {
        super(options);
        this.blockClass = options.blockClass;
        this.listItem = options.itemIndex;
        this.filter = options.filter;
        this.item = null;
        this.dataResource = new Http({
            baseUrl: TextPost.DATA_URL,
            apiKey: this.apiKey,
            filter: this.filter,
        });
        this.dataResource.list()
            .then((list) => this.renderPost(list));
    };

    createArticle(parentNode, data) {
        const fragment = document.createDocumentFragment();
        const itemData = data[this.listItem];
        console.log(itemData)
        const parentDiv = document.createElement('div');
        const article = document.createElement('div');
        const articleHeader = document.createElement('div');
        const articleTitle = document.createElement('h3');
        const articleText = document.createElement('p');
        const articleButton = document.createElement('button');
        parentDiv.classList.add('blog__item', this.blockClass);
        article.classList.add('item__post', 'post');
        articleHeader.classList.add('post__header');
        articleHeader.innerHTML = `<img class="post__header-photo" 
                                        src="${TextPost.BASE_IMAGE_URL}${itemData.poster_path}">
                                    <div class="post__header-title">
                                        ${itemData.original_title}
                                    </div>
                                    <div class="post__header-info">
                                        <span class="info__data">
                                            ${this.convertDate(itemData.release_date)}
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
                                                ${itemData.vote_average}
                                            </span>
                                        </div>
                                        <span class="info__comments">
                                            ${itemData.vote_count}
                                        </span>`;
        articleTitle.classList.add('post__title');
        articleTitle.textContent = itemData.title;
        articleText.classList.add('post__text');
        articleText.textContent = itemData.overview;
        articleButton.classList.add('post__button', 'button', 'button-light');
        articleButton.textContent = 'Read more';
        article.append(articleHeader,
            articleTitle,
            articleText,
            articleButton);
        parentDiv.append(article);
        fragment.append(parentDiv);
        parentNode.append(fragment);
        articleButton.addEventListener('click',
            this.onReadMoreButtonClick.bind(this));
        return this.item = itemData;
    }
}

class FilterVideoPost extends Post {
    static DATA_URL = `https://api.themoviedb.org/3/search/movie`;
    static BASE_IMAGE_URL = 'https://image.tmdb.org/t/p/original';
    static VIDEO_BASE_URL = 'https://www.youtube.com/watch?v=';
    static BASE_QUERY = '&query=';

    constructor(options) {
        super(options);
        this.url = options.url;
        this.blockClass = options.blockClass;
        this.listItem = options.itemIndex;
        this.filter = options.filter;
        this.marker = options.marker;
        this.filterQuery = FilterVideoPost.BASE_QUERY + this.filter;
        this.item = null;
        this.dataResource = new Http({
            baseUrl: this.url,
            apiKey: this.apiKey,
            filter: this.filter,
        });
        this.dataResource.filterList(this.filterQuery)
            .then((list) => this.renderPost(list));
    }

    createArticle(parentNode, data) {
        const fragment = document.createDocumentFragment();
        const itemData = this.getDataList(data);

        if (itemData === undefined) {
            return;
        };

        const parentDiv = document.createElement('div');
        const imageWrapper = document.createElement('div');
        const image = document.createElement('img');
        const article = document.createElement('div');
        const articleHeader = document.createElement('div');
        const articleTitle = document.createElement('h3');
        const articleText = document.createElement('p');
        const articleButton = document.createElement('button');
        const videoButton = document.createElement('div');
        parentDiv.classList.add('blog__item', this.blockClass);
        imageWrapper.classList.add('item__img');
        image.setAttribute('src',
            `${this.getMoviePoster(
                FilterVideoPost.BASE_IMAGE_URL,
                itemData.backdrop_path
            )}`);
        article.classList.add('item__post', 'post');
        articleHeader.classList.add('post__header');
        articleHeader.innerHTML = `<img class="post__header-photo" src="
                                    ${this.getMoviePoster(
                                        FilterVideoPost.BASE_IMAGE_URL,
                                        itemData.poster_path
                                    )}
                                    ">
                                    <div class="post__header-title">
                                        ${this.getPostTitle(itemData)}
                                    </div>
                                    <div class="post__header-info">
                                        <span class="info__data">
                                            ${this.getPostPremier(itemData)}
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
                                                ${itemData.vote_average}
                                            </span>
                                        </div>
                                        <span class="info__comments">
                                            ${itemData.vote_count}
                                        </span>`;
        articleTitle.classList.add('post__title');
        articleTitle.textContent = itemData.title;
        articleText.classList.add('post__text');
        articleText.textContent = itemData.overview;
        articleButton.classList.add('post__button', 'button', 'button-light');
        articleButton.textContent = 'Read more';
        videoButton.classList.add('item__video-button');
        imageWrapper.append(image,
            videoButton);
        article.append(articleHeader,
            articleTitle,
            articleText,
            articleButton);
        parentDiv.append(imageWrapper, article);
        fragment.append(parentDiv);
        parentNode.append(fragment);
        articleButton.addEventListener('click',
            this.onReadMoreButtonClick.bind(this));
        videoButton.addEventListener('click',
            this.onVideoButtonClick.bind(this));
        return this.item = itemData;
    }

    onVideoButtonClick() {
        const itemId = this.item.id;
        const getData = new Http({
            baseUrl: this.itemUrl + itemId + '/videos',
            apiKey: this.apiKey,
        });
        getData.list()
            .then((list) => this.getVideoLink(list, FilterVideoPost.VIDEO_BASE_URL));
    }

    getVideoLink(list, url) {
        const videoItem = this.getRandom(0, list.length - 1);
        window.open(url + list[videoItem].key);
    }

    getRandom(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}

class FilterAudioPost extends Post {
    static DATA_URL = `https://api.themoviedb.org/3/search/movie`;
    static BASE_IMAGE_URL = 'https://image.tmdb.org/t/p/original';
    static BASE_QUERY = '&query=';

    constructor(options) {
        super(options);
        this.url = options.url;
        this.blockClass = options.blockClass;
        this.listItem = options.itemIndex;
        this.filter = options.filter;
        this.marker = options.marker;
        this.filterQuery = FilterAudioPost.BASE_QUERY + this.filter;
        this.item = null;
        this.dataResource = new Http({
            baseUrl: this.url,
            apiKey: this.apiKey,
            filter: this.filter,
        });
        this.dataResource.filterList(this.filterQuery)
            .then((list) => this.renderPost(list));
    }

    createArticle(parentNode, data) {
        const fragment = document.createDocumentFragment();
        const itemData = this.getDataList(data);

        if (itemData === undefined) {
            return;
        }

        const parentDiv = document.createElement('div');
        const imageWrapper = document.createElement('div');
        const image = document.createElement('img');
        const article = document.createElement('div');
        const articleHeader = document.createElement('div');
        const articleTitle = document.createElement('h3');
        const articleText = document.createElement('p');
        const articleButton = document.createElement('button');
        const sectionAudio = document.createElement('audio');
        parentDiv.classList.add('blog__item', this.blockClass);
        imageWrapper.classList.add('item__img');
        image.setAttribute('src',
            `${this.getMoviePoster(
                FilterAudioPost.BASE_IMAGE_URL,
                itemData.backdrop_path
            )}`);
        article.classList.add('item__post', 'post');
        articleHeader.classList.add('post__header');
        articleHeader.innerHTML = `<img class="post__header-photo" src="
                                        ${this.getMoviePoster(
                                            FilterAudioPost.BASE_IMAGE_URL,
                                            itemData.poster_path
                                        )}
                                    ">
                                    <div class="post__header-title">
                                        ${this.getPostTitle(itemData)}
                                    </div>
                                    <div class="post__header-info">
                                        <span class="info__data">
                                            ${this.getPostPremier(itemData)}
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
                                                ${itemData.vote_average}
                                            </span>
                                        </div>
                                        <span class="info__comments">
                                            ${itemData.vote_count}
                                        </span>`;
        articleTitle.classList.add('post__title');
        articleTitle.textContent = itemData.title;
        articleText.classList.add('post__text');
        articleText.textContent = itemData.overview;
        articleButton.classList.add('post__button', 'button', 'button-light');
        articleButton.textContent = 'Read more';
        sectionAudio.classList.add('post__audio');
        sectionAudio.setAttribute('controls', 'controls');
        sectionAudio.setAttribute('src',
            `https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3`);
        imageWrapper.append(image);
        article.append(articleHeader,
            articleTitle,
            sectionAudio,
            articleText,
            articleButton);
        parentDiv.append(imageWrapper, article);
        fragment.append(parentDiv);
        parentNode.append(fragment);
        articleButton.addEventListener('click',
            this.onReadMoreButtonClick.bind(this));
        return this.item = itemData;
    }
}

class FilterImagePost extends Post {
    static DATA_URL = `https://api.themoviedb.org/3/search/movie`;
    static BASE_IMAGE_URL = 'https://image.tmdb.org/t/p/original';
    static BASE_QUERY = '&query=';

    constructor(options) {
        super(options);
        this.url = options.url;
        this.blockClass = options.blockClass;
        this.listItem = options.itemIndex;
        this.filter = options.filter;
        this.marker = options.marker;
        this.filterQuery = FilterImagePost.BASE_QUERY + this.filter;
        this.item = null;
        this.dataResource = new Http({
            baseUrl: this.url,
            apiKey: this.apiKey,
            filter: this.filter,
        });
        this.dataResource.filterList(this.filterQuery)
            .then((list) => this.renderPost(list));
    }

    createArticle(parentNode, data) {
        const fragment = document.createDocumentFragment();
        const itemData = this.getDataList(data);

        if (itemData === undefined) {
            return;
        }

        const parentDiv = document.createElement('div');
        const imageWrapper = document.createElement('div');
        const image = document.createElement('img');
        const article = document.createElement('div');
        const articleHeader = document.createElement('div');
        const articleTitle = document.createElement('h3');
        const articleText = document.createElement('p');
        const articleButton = document.createElement('button');
        parentDiv.classList.add('blog__item', this.blockClass);
        imageWrapper.classList.add('item__img');
        image.setAttribute('src',
            `${this.getMoviePoster(
                FilterImagePost.BASE_IMAGE_URL,
                itemData.backdrop_path
            )}`);
        article.classList.add('item__post', 'post');
        articleHeader.classList.add('post__header');
        articleHeader.innerHTML = `<img class="post__header-photo" src="
                                        ${this.getMoviePoster(
                                            FilterImagePost.BASE_IMAGE_URL,
                                            itemData.poster_path
                                        )}
                                    ">
                                    <div class="post__header-title">
                                        ${this.getPostTitle(itemData)}
                                    </div>
                                    <div class="post__header-info">
                                    <span class="info__data">
                                        ${this.getPostPremier(itemData)}
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
                                            ${itemData.vote_average}
                                        </span>
                                    </div>
                                    <span class="info__comments">
                                        ${itemData.vote_count}
                                    </span>`;
        articleTitle.classList.add('post__title');
        articleTitle.textContent = itemData.title;
        articleText.classList.add('post__text');
        articleText.textContent = itemData.overview;
        articleButton.classList.add('post__button', 'button', 'button-light');
        articleButton.textContent = 'Read more';
        imageWrapper.append(image);
        article.append(articleHeader,
            articleTitle,
            articleText,
            articleButton);
        parentDiv.append(imageWrapper, article);
        fragment.append(parentDiv);
        parentNode.append(fragment);
        articleButton.addEventListener('click',
            this.onReadMoreButtonClick.bind(this));
        return this.item = itemData;
    }
}

class FilterTextPost extends Post {
    static DATA_URL = `https://api.themoviedb.org/3/search/movie`;
    static BASE_IMAGE_URL = 'https://image.tmdb.org/t/p/original';
    static BASE_QUERY = '&query=';

    constructor(options) {
        super(options);
        this.url = options.url;
        this.blockClass = options.blockClass;
        this.listItem = options.itemIndex;
        this.filter = options.filter;
        this.marker = options.marker;
        this.filterQuery = FilterTextPost.BASE_QUERY + this.filter;
        this.item = null;
        this.dataResource = new Http({
            baseUrl: this.url,
            apiKey: this.apiKey,
            filter: this.filter,
        });
        this.dataResource.filterList(this.filterQuery)
            .then((list) => this.renderPost(list));
    }

    createArticle(parentNode, data) {
        const fragment = document.createDocumentFragment();
        const itemData = this.getDataList(data);

        if (itemData === undefined) {
            return;
        }

        const parentDiv = document.createElement('div');
        const article = document.createElement('div');
        const articleHeader = document.createElement('div');
        const articleTitle = document.createElement('h3');
        const articleText = document.createElement('p');
        const articleButton = document.createElement('button');
        parentDiv.classList.add('blog__item', this.blockClass);
        article.classList.add('item__post', 'post');
        articleHeader.classList.add('post__header');
        articleHeader.innerHTML = `<img class="post__header-photo" src="
                                        ${this.getMoviePoster(
                                            FilterTextPost.BASE_IMAGE_URL,
                                            itemData.poster_path
                                        )}
                                    ">
                                    <div class="post__header-title">
                                        ${this.getPostTitle(itemData)}
                                    </div>
                                    <div class="post__header-info">
                                        <span class="info__data">
                                            ${this.convertDate(itemData.release_date)}
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
                                                ${itemData.vote_average}
                                            </span>
                                        </div>
                                        <span class="info__comments">
                                            ${itemData.vote_count}
                                        </span>`;
        articleTitle.classList.add('post__title');
        articleTitle.textContent = itemData.title;
        articleText.classList.add('post__text');
        articleText.textContent = itemData.overview;
        articleButton.classList.add('post__button', 'button', 'button-light');
        articleButton.textContent = 'Read more';
        article.append(articleHeader,
            articleTitle,
            articleText,
            articleButton);
        parentDiv.append(article);
        fragment.append(parentDiv);
        parentNode.append(fragment);
        articleButton.addEventListener('click',
            this.onReadMoreButtonClick.bind(this));
        return this.item = itemData;
    }
}
