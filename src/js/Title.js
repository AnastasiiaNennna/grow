class Header {
    #filterElement;
    #filterInput;
    #filterButton;
    #searchValue;

    constructor(options) {
        this.options = options;
        this.changeHandler = this.changeHandler.bind(this);
        this.clickHandler = this.clickHandler.bind(this);

        this.#init();
        this.#bindEvents();
    }

    #init() {
        const fragment = document.createDocumentFragment();
        const title = document.createElement('h2');
        const searchForm = this.#addSearchForm();
        title.classList.add('main__title');
        title.innerHTML = 'Blog';
        fragment.append(title, searchForm);
        this.options.container.append(fragment);
    }

    #addSearchForm() {
        const fragment = document.createDocumentFragment();
        const wrapper = document.createElement('div');
        wrapper.classList.add('main__search-form');
        wrapper.innerHTML = `<label>Filter</label>
                             <select id="filter"
                                class="main__search-select">
                                <option selected value="">Choose</option>
                                <option value="actor">Actor</option>
                                <option value="title">Movie title</option>
                             </select>
                             <input id="searchInput" 
                                    type="text"
                                    placeholder="What are you looking for?"
                                    class="main__search-input"
                                    disabled>
                             <div class="main__search-icon"></div>
                             <button id="filterButton" 
                                class="button button-light"
                                disabled>
                                    Search
                             </button>`
        fragment.append(wrapper);
        return fragment;
    }

    #bindEvents() {
        this.#filterElement = document.querySelector('#filter');
        this.#filterInput =  document.querySelector('#searchInput');
        this.#filterButton =  document.querySelector('#filterButton');

        this.#isNeedToRestoreFilter();

        this.#filterElement.addEventListener('change', this.changeHandler);
    }

    #isNeedToRestoreFilter() {
        if (document.URL.includes('?actor')) {
            this.#restoreForm('actor')
        }

        if (document.URL.includes('?title')) {
            this.#restoreForm('title')
        }
    }

    #restoreForm(value) {
        this.#filterInput.removeAttribute('disabled');
        this.#filterButton.removeAttribute('disabled');
        this.#filterInput.value = document.URL.split('=')[1].replace(/%20/g, ' ');
        this.#filterButton.innerText = 'Clear filter';
        this.#filterElement.value = value;

        this.#filterButton.addEventListener('click', this.clickHandler);
    }

    #isInputValid(string) {
        const regExp = /^[A-Z](?=.*[a-z])[a-zA-Z\d\s!\-.:,?]{5,60}$/;
        const validationResult = regExp.test(string);

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

    changeHandler(event) {
        event.stopPropagation();
        this.#searchValue = event.target.value;

        if (event.target.value === '') {
            this.#cleanUpFields();
        } else {
            this.#filterInput.removeAttribute('disabled');
            this.#filterButton.removeAttribute('disabled');
            this.#filterButton.innerText = 'Search';

            this.#filterButton.addEventListener('click', this.clickHandler);
        }
    }

    clickHandler(event) {
        event.stopPropagation();

        event.target.innerText === 'Search'
            ? this.#onSearch(event)
            : this.#onClear(event);
    }

    #onSearch(event) {

        if (this.#isInputValid(this.#filterInput.value)) {
            this.options.onSearch(this.#filterInput.value, this.#searchValue);
            event.target.innerText = 'Clear filter'
        } else {
            this.#filterInput.value = '';
        }
    }

    #onClear(event) {
        event.target.innerText = 'Search';
        this.#cleanUpFields();
        this.options.onClear();
    }

    #cleanUpFields() {
        this.#filterButton.removeEventListener('click', this.clickHandler);

        this.#filterInput.setAttribute('disabled', 'disabled');
        this.#filterButton.setAttribute('disabled', 'disabled');
        this.#filterElement.value = '';
        this.#filterInput.value = '';
    }
}
