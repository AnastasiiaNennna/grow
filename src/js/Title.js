class Title {
    constructor(options) {
        this._container = options.container;
        this._title = this.initTitle();
        this._searchForm = this.addSearchForm();
    };

    initTitle() {
        const fragment = document.createDocumentFragment();
        const title = document.createElement('h2');
        title.classList.add('main__title');
        title.innerHTML = 'Blog';
        fragment.append(title);
        this._container.append(fragment);
    };

    addSearchForm() {
        const fragment = document.createDocumentFragment();
        const searchInput = document.createElement('input');
        const searchImage = document.createElement('div');
        searchInput.classList.add('main__search-form');
        searchInput.setAttribute('type', 'text');
        searchInput.setAttribute('placeholder', 'Search by author');
        searchImage.classList.add('main__search-elem');
        fragment.append(searchInput);
        fragment.append(searchImage);
        this._container.append(fragment);
    };
};
