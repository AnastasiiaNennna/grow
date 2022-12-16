const MAIN_WRAPPER = document.querySelector('#root');

class Controller {
    static API_KEY = '?api_key=7148347e54035e42dc1847fd6b413dd5';
    static DATA_ITEM_URL = `https://api.themoviedb.org/3/movie/`;
    static DATA_URL = `https://api.themoviedb.org/3/movie/upcoming`;
    static PERSON_URL = `https://api.themoviedb.org/3/search/person`;
    static MOVIE_URL = `https://api.themoviedb.org/3/search/movie`;
    static BASE_IMAGE_URL = 'https://image.tmdb.org/t/p/original';
    static BASE_VIDEO_URL = 'https://www.youtube.com/watch?v=';
    static TMDB = 'https://www.themoviedb.org/';
    #data;
    #filter = '';
    #filterType;
    #newUrl;

    constructor(container) {
        this.container = container;
        this.title = new Header({
            container: this.container,
            onSearch: (filter, type) => this.applyFilter(filter, type),
            onClear: () => this.clearFilter(),
        });
        this.contentContainer = this.#addContentContainer(this.container);

        this.#requestData();
    }

    applyFilter(filter, type) {
        this.#filter = filter;
        this.#filterType = type;
        this.#createQueryUrl(filter, type);
        this.#requestFilteredData();
    }

    #createQueryUrl(value, name) {
        this.#newUrl = `${window.location.protocol}//${window.location.host}${window.location.pathname}?${name}=${value}`;
        window.history.pushState({path:this.#newUrl},'',this.#newUrl);
    }

    clearFilter() {
        this.#filter = '';
        this.#filterType = '';
        this.#clearQueryUrl();
        this.#requestData();
    }

    #clearQueryUrl() {
        this.#newUrl = `${window.location.protocol}//${window.location.host}${window.location.pathname}`;
        window.history.pushState({path:this.#newUrl},'',this.#newUrl);
    }

    #requestData() {
        if (document.URL.includes('?actor') || document.URL.includes('?title')) {
            this.#filterType = document.URL.split('?')[1].slice(0, 5);
            this.#requestFilteredData(true);
        } else {
            this.#data = new Http({
                baseUrl: Controller.DATA_URL,
                apiKey: Controller.API_KEY,
            });
            this.#data.list()
                .then((list) => this.#renderContent(list));
        }
    }

    #requestFilteredData(flag = false) {
        const filterQuery = flag ? `&query=${document.URL.split('=')[1]}` : `&query=${this.#filter}`;
        this.#filter = flag ? document.URL.split('=')[1] : this.#filter;
        this.#data = new Http({
            baseUrl: this.#getSearchUrl(),
            apiKey: Controller.API_KEY,
        });

        this.#data.filterList(filterQuery)
            .then((list) => this.#renderContent(list));
    }

    #renderContent(list) {
        if (list.length > 0) {
            this.#renderPosts();
            this.#generateBlocks(list);
            this.#addButton(this.container);
        } else {
            const element = document.querySelector('#blog');
            const wrapper = document.createElement('div');
            element.remove();
            wrapper.id = 'blog';
            wrapper.style.cssText = 'grid-column: 2 / 3; grid-row: 3 / 4;';
            wrapper.innerHTML = `<p class="no-results">No result by filter "${this.#filter}". Try to clear filter.</p>`;
            this.container.append(wrapper);
        }
    }

    #renderPosts() {
        const element = document.querySelector('#blog');
        element.remove();
        this.contentContainer = this.#addContentContainer(this.container);
    }

    #addContentContainer(parentDiv) {
        const wrapper = document.createElement('div');
        wrapper.id = 'blog';
        wrapper.classList.add('blog');
        parentDiv.append(wrapper);
        return wrapper;
    }

    #generateBlocks(data) {
        this.block = new Block({
            container: this.contentContainer,
            data: data,
            apiKey: Controller.API_KEY,
            baseImageUrl: Controller.BASE_IMAGE_URL,
            baseVideoUrl: Controller.BASE_VIDEO_URL,
            itemUrl: Controller.DATA_ITEM_URL,
            isPersonSearch: this.#filterType === 'actor',
        });
    }

    #getSearchUrl() {
        return this.#filterType === 'actor' ? Controller.PERSON_URL : Controller.MOVIE_URL;
    }

    #addButton(parentDiv) {
        const fragment = document.createDocumentFragment();
        const wrapper = document.createElement('div');
        const button = document.createElement('button');
        wrapper.classList.add('main__more');
        button.classList.add('main__more-button', 'button', 'button-dark');
        button.textContent = 'Read more';
        button.addEventListener('click', this.onButtonClick.bind(this));
        wrapper.append(button);
        fragment.append(wrapper);
        parentDiv.append(fragment);
    }

    onButtonClick() {
        window.open(Controller.TMDB);
    }
}

const initPage = new Controller(MAIN_WRAPPER);
