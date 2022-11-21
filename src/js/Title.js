class Title {
    static SEARCH_ACTOR_ID = 'search-button-actor';
    static SEARCH_TITLE_ID = 'search-button-title';

    constructor(options) {
        this._options = options;
        this._title = this.initTitle();
        this._searchForm = this.addSearchForms();
        this.filter = null;
        this.actorMarker = 'actor';
        this.titleMarker = 'title';
    }

    initTitle() {
        const fragment = document.createDocumentFragment();
        const title = document.createElement('h2');
        title.classList.add('main__title');
        title.innerHTML = 'Blog';
        fragment.append(title);
        this._options.container.append(fragment);
    }

    addSearchForms() {
        this.addActorSearch();
        this.addTitleSearch();
    }

    addActorSearch() {
        const fragment = document.createDocumentFragment();
        const searchInput = document.createElement('input');
        const searchImage = document.createElement('div');
        searchInput.id = 'search-by-actor';
        searchInput.classList.add('main__search-form');
        searchInput.setAttribute('type', 'text');
        searchInput.setAttribute('placeholder', 'Search by actor');
        searchImage.id = 'search-button-actor';
        searchImage.classList.add('main__search-elem');
        fragment.append(searchInput);
        fragment.append(searchImage);
        this._options.container.append(fragment);
        searchInput.addEventListener('focusout', this.setFilter.bind(this));
        searchImage.addEventListener('click', this.onSearchButtonClick.bind(this));
    }

    addTitleSearch() {
        const fragment = document.createDocumentFragment();
        const searchInput = document.createElement('input');
        const searchImage = document.createElement('div');
        searchInput.id = 'search-by-title';
        searchInput.classList.add('main__search-form');
        searchInput.setAttribute('type', 'text');
        searchInput.setAttribute('placeholder', 'Search by title');
        searchImage.id = 'search-button-title';
        searchImage.classList.add('main__search-elem');
        fragment.append(searchInput);
        fragment.append(searchImage);
        this._options.container.append(fragment);
        searchInput.addEventListener('focusout', this.setFilter.bind(this));
        searchImage.addEventListener('click', this.onSearchButtonClick.bind(this));
    }

    setFilter(event) {
        let filterInStorage = null;

        if (event) {
            return this.getInputFilter(event);
        }

        filterInStorage = localStorage.getItem('filter');
        this.filter = filterInStorage;
        return this.filter = filterInStorage;
    }

    getInputFilter(event) {
        if (this.validateInput(event.target.value)) {
            localStorage.setItem('filter', event.target.value);
            this.filter = localStorage.getItem('filter');
            event.target.value = '';
        }

        return this.filter;
    }

    validateInput(value) {
        return this.isInputValid(value);
    }

    isInputValid(string) {
        const regExp = /^[A-Z](?=.*[a-z])[a-zA-Z\d\s!\-.:,?]{5,60}$/g;
        const validationResult = regExp.test(string) ?
            true :
            false;

        if (!validationResult) {
            alert(`
                1. Input can't be empty;
                2. Must be at least 6 characters and no Long than 60;
                3. First sigh must be a letter in uppercase;
                4. Must contains latin letters in lowercase;
                5. Can contains latin letters in uppercase and numbers;
                6. Can contains a special symbols: space ! : - ? . ,
            `);
        }

        return validationResult;
    }

    onSearchButtonClick(event) {
        event.target.id === Title.SEARCH_ACTOR_ID ?
            this._options.onSearch(this.setActorMark()) :
            this._options.onSearch(this.setTitleMark());
    }

    setActorMark() {
        localStorage.setItem('mark', 'actor');
    }

    setTitleMark() {
        localStorage.setItem('mark', 'title');
    }
}
