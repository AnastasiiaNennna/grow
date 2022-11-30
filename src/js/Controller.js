const MAIN_WRAPPER = document.querySelector('#root');

class Controller {
    static CONTENT_CLASSES = [
        'blog__item-video',
        'blog__item-audio',
        'blog__item-img',
        'blog__item-text',
    ];
    constructor(container) {
        this.container = container;
        this.title = new Title({
            container: this.container,
        });
        this.contentContainer = this.addContentContainer(this.container);
        this.content = this.generateContent(Controller.CONTENT_CLASSES);
        this.addButton(this.container);
    };

    addContentContainer(parentDiv) {
        const wrapper = document.createElement('div');
        wrapper.classList.add('blog');
        parentDiv.append(wrapper);
        return wrapper;
    };

    generateContent(classesArray) {
        classesArray.forEach((element) => this.generateContentBlock(element));
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
        const videoBlock = new VideoPost({
            container: this.contentContainer,
            blockClass: blockClass,
            itemIndex: 0,
        });
        return videoBlock;
    };

    generateAudioBlock(blockClass) {
        const audioBlock = new AudioPost({
            container: this.contentContainer,
            blockClass: blockClass,
            itemIndex: 1,
        });
        return audioBlock;
    };

    generateImageBlock(blockClass) {
        const imageBlock = new ImagePost({
            container: this.contentContainer,
            blockClass: blockClass,
            itemIndex: 2,
        });
        return imageBlock;
    };

    generateTextBlock(blockClass) {
        const textBlock = new TextPost({
            container: this.contentContainer,
            blockClass: blockClass,
            itemIndex: 3,
        });
        return textBlock;
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
        window.open('https://www.themoviedb.org/');
    };
};

const initPage = new Controller(MAIN_WRAPPER);
