const MAIN_WRAPPER = document.querySelector('#root');

class Controller {
    static CONTENT_CLASSES = [
        'blog__item-video',
        'blog__item-audio',
        'blog__item-img',
        'blog__item-text',
    ];
    static TMDB = 'https://www.themoviedb.org/';
    constructor(container) {
        this.container = container;
        this.videoBlock = null;
        this.audioBlock = null;
        this.imageBlock = null;
        this.textBlock = null;
        this.title = new Title({
            container: this.container,
            onSearch: () => this.renderContent(),
        });
        this.filter = null;
        this.contentContainer = this.addContentContainer(this.container);
        this.content = this.renderContent();
        this.addButton(this.container);
    };

    renderContent() {
        this.renderPosts();
        this.generateContent(Controller.CONTENT_CLASSES);
    };
    
    getFilter() {
        return localStorage.getItem('filter');
    };
    
    getMark() {
        return localStorage.getItem('mark');
    };
    
    addContentContainer(parentDiv) {
        const wrapper = document.createElement('div');
        wrapper.id = 'blog';
        wrapper.classList.add('blog');
        parentDiv.append(wrapper);
        return wrapper;
    };
    
    generateContent(classesArray) {
        const marker = this.getMark();
        this.filter = this.getFilter();
        if (this.filter === null || this.filter === '') {
            return classesArray.forEach(element => this.generateContentBlock(element));
        };
        return classesArray.forEach(element => this.generateFilteredBlock(element, marker));
    };
    
    renderPosts() {
        const element = document.querySelector('#blog');
        element.remove();
        this.contentContainer = this.addContentContainer(this.container);
        return this.contentContainer;
    };
    
    generateContentBlock(blockClass) {
        switch (blockClass) {
            case Controller.CONTENT_CLASSES[0]:
                this.generateVideoBlock(blockClass);
                break;
            case Controller.CONTENT_CLASSES[1]:
                this.generateAudioBlock(blockClass);
                break;
            case Controller.CONTENT_CLASSES[2]:
                this.generateImageBlock(blockClass);
                break;
            case Controller.CONTENT_CLASSES[3]:
                this.generateTextBlock(blockClass);
            break;
        };
    };
    
    generateVideoBlock(blockClass) {
        this.videoBlock = new VideoPost({
            container: this.contentContainer,
            blockClass: blockClass,
            itemIndex: 0,
            filter: this.filter,
        });
        return this.videoBlock;
    };
    
    generateAudioBlock(blockClass) {
        this.audioBlock = new AudioPost({
            container: this.contentContainer,
            blockClass: blockClass,
            itemIndex: 1,
            filter: this.filter,
        });
        return this.audioBlock;
    };
    
    generateImageBlock(blockClass) {
        this.imageBlock = new ImagePost({
            container: this.contentContainer,
            blockClass: blockClass,
            itemIndex: 2,
            filter: this.filter,
        });
        return this.imageBlock;
    };
    
    generateTextBlock(blockClass) {
        this.textBlock = new TextPost({
            container: this.contentContainer,
            blockClass: blockClass,
            itemIndex: 3,
            filter: this.filter,
        });
        return this.textBlock;
    };
    
    generateFilteredBlock(blockClass, marker) {
        switch (blockClass) {
            case Controller.CONTENT_CLASSES[0]:
                this.generateFilteredVideoBlock(blockClass, marker);
                break;
            case Controller.CONTENT_CLASSES[1]:
                this.generateFilteredAudioBlock(blockClass, marker);
                break;
            case Controller.CONTENT_CLASSES[2]:
                this.generateFilteredImageBlock(blockClass, marker);
                break;
            case Controller.CONTENT_CLASSES[3]:
                this.generateFilteredTextBlock(blockClass, marker);
            break;
        };
    };
    
    generateFilteredVideoBlock(blockClass, marker) {
        const url = this.getSearchUrl(marker);
        this.videoBlock = new FilterVideoPost({
            url: url,
            container: this.contentContainer,
            blockClass: blockClass,
            itemIndex: 0,
            filter: this.filter,
            marker: marker,
        });
        return this.videoBlock;
    };
    
    generateFilteredAudioBlock(blockClass, marker) {
        const url = this.getSearchUrl(marker);
        this.audioBlock = new FilterAudioPost({
            url: url,
            container: this.contentContainer,
            blockClass: blockClass,
            itemIndex: 1,
            filter: this.filter,
            marker: marker,
        });
        return this.audioBlock;
    };
    
    generateFilteredImageBlock(blockClass, marker) {
        const url = this.getSearchUrl(marker);
        this.imageBlock = new FilterImagePost({
            url: url,
            container: this.contentContainer,
            blockClass: blockClass,
            itemIndex: 2,
            filter: this.filter,
            marker: marker,
        });
        return this.imageBlock;
    };
    
    generateFilteredTextBlock(blockClass, marker) {
        const url = this.getSearchUrl(marker);
        this.textBlock = new FilterTextPost({
            url: url,
            container: this.contentContainer,
            blockClass: blockClass,
            itemIndex: 3,
            filter: this.filter,
            marker: marker,
        });
        return this.textBlock;
    };
    
    getSearchUrl(marker) {
        return marker === 'actor' ?
            `https://api.themoviedb.org/3/search/person` :
            `https://api.themoviedb.org/3/search/movie`;
    };
    
    addButton(parentDiv) {
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
    };
    
    onButtonClick() {
        window.open(Controller.TMDB);
    };
};

const initPage = new Controller(MAIN_WRAPPER);
