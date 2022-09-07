const PERCENT_SIGH = '%';
const ZERO_VALUE = 0;
const HUNDRED_VALUE = 100;
const ROUNDING_VALUE = 2;
const homeworkTitleElement = document.querySelector('.header-wrapper');
const contentWrapperElement = document.querySelector('.content-wrapper');
const homeworkNumber = '01';
const homeworkNumberTitle = `HW_${homeworkNumber}`;
const homeworkTitle = 'Product price tag';
const headerTitleClass = 'header-title';
const headerSubtitleClass = 'header-subtitle';
const hiddenClass = 'hidden';
const getPricesBtnId = 'detPricesBtn';
const priceTagsFirstBtnId = 'priceTagsFirstWayBtn';
const priceTagsSecondBtnId = 'priceTagsSecondWayBtn';
const tagsButtonsId = 'tagsButtons';
const clearBtnId = 'clearBtn';
const pricesTableId = 'pricesTable';
const tagId = 'tag';
const firstWayTagId = 'tags';
const tableWrapperClass = 'table-wrapper';
const buttonsTagClass = 'buttons-tag';
const buttonsTagTitle = 'Choose product to display tag:';
const promptNameText = 'Fill in product name (ex. "Apple")';
const promptPriceText = 'Fill in product price (ex. "15.00")';
const promptDiscountText = 'Is product has discount (ex. "15 or 0")';
const headerTemplate = `<h1 class="${headerTitleClass}">${homeworkNumberTitle}</h1>
                        <h2 class="${headerSubtitleClass}">${homeworkTitle}</h2>`;
const buttonsTemplate = `<div class="content-buttons buttons">
                            <button id="${getPricesBtnId}" class="button">Get prices</button>
                            <button id="${priceTagsFirstBtnId}" class="button">Price tags first way</button>
                            <button id="${priceTagsSecondBtnId}" class="button">Price tags second way</button>
                        </div>`;
const pricesTableHeadTemplate = `<thead>
                                    <th>Product</th>
                                    <th>Price</th>
                                    <th>Discount</th>
                                </thead>`;
const products = [
    { 
        id: 1,
        name: 'Apples (Ukraine)',
        salePrice: 12.50,
        purchasePrice: null,
        discount: 15,
        shopMargin: null,
    },
    { 
        id: 2,
        name: 'Orange',
        salePrice: null,
        purchasePrice: 12.50,
        discount: null,
        shopMargin: 15,
    }
];


const initContent = () => {
    initHeader();
    initButtons();
    contentWrapperElement.addEventListener('click', handleClick);
};

const initHeader = () => homeworkTitleElement.insertAdjacentHTML('afterbegin', headerTemplate);

const initButtons = () => contentWrapperElement.insertAdjacentHTML('afterbegin', buttonsTemplate);

const handleClick = (event) => {
    event.stopPropagation();
    const buttonId = event.target.id;
    switch (buttonId) {
        case getPricesBtnId: getPrices(products); break;
        case priceTagsFirstBtnId: getPriceTagsFirstWay(products); break;
        case priceTagsSecondBtnId: getPriceTagsSecondWay(); break;
        default: break;
    };
};

const getPrices = (products) => {
    clearData();
    const pricesWrapper = document.createElement('table');
    pricesWrapper.setAttribute('id', pricesTableId);
    pricesWrapper.classList.add(tableWrapperClass);
    pricesWrapper.insertAdjacentHTML('afterbegin', pricesTableHeadTemplate);
    const tableBody = document.createElement('tbody');
    products.forEach(product => addPricesToHTML(product, tableBody));
    pricesWrapper.append(tableBody);
    contentWrapperElement.append(pricesWrapper);
};

const getPriceTagsFirstWay = (products) => {
    clearData();
    addButtons(products);
};

const getPriceTagsSecondWay = () => {
    clearData();
    setTimeout(() => {
        const name = prompt(promptNameText, products[0].name);
        const price = prompt(promptPriceText, products[0].salePrice);
        const discount = prompt(promptDiscountText, products[0].discount);
        alert(`
        Product: ${name}
        Price: ${calcDiscountPrice(price, discount)} hrn`);
    });
};

const clearData = () => {
    removePricesData();
    removeFirstTagData();
};

const showClearButton = () => document.getElementById(clearBtnId).classList.remove(hiddenClass);

const disableButton = () => document.getElementById(getPricesBtnId).setAttribute('disabled', 'disabled');

const addPricesToHTML = (product, pricesWrapper) => {
    const productRow = `<tr>
                            <td>${product.name}</td>
                            <td>${getProductPrice(product)}</td>
                            <td>${getProductDiscount(product.discount)}</td>
                        </tr>`;
    pricesWrapper.insertAdjacentHTML('beforeend', productRow);
};

const getProductPrice = (product) => {
    const salePrice = getSalePrice(product);
    const finishedPrice = getDiscountPrice(product.discount, salePrice);
    return finishedPrice;
};

const getProductDiscount = (discount) => !!discount ? `${discount}${PERCENT_SIGH}` : `${ZERO_VALUE}${PERCENT_SIGH}`;

const getDiscountPrice = (discount, price) => !!discount ? calcDiscountPrice(price, discount) : price;

const getSalePrice = (product) => {
    return !!product.salePrice ? product.salePrice : calcSalePrice(product.purchasePrice, product.shopMargin);
}

const calcSalePrice = (price, percents) => (price + ((price * percents) / HUNDRED_VALUE)).toFixed(ROUNDING_VALUE);

const calcDiscountPrice = (price, discount) => (price * ((HUNDRED_VALUE - discount) / HUNDRED_VALUE)).toFixed(ROUNDING_VALUE);

const addButtons = (products) => {
    const tagsButtonsWrapper = document.createElement('div');
    tagsButtonsWrapper.setAttribute('id', firstWayTagId);
    tagsButtonsWrapper.classList.add(buttonsTagClass);
    const tagsButtonsTitle = document.createElement('h2');
    tagsButtonsTitle.innerHTML = buttonsTagTitle;
    tagsButtonsWrapper.append(tagsButtonsTitle);
    products.forEach(product => addProductButtonsToHTML(product, tagsButtonsWrapper));
    contentWrapperElement.append(tagsButtonsWrapper);
    document.querySelector(`.${buttonsTagClass}`).addEventListener('click', showTag);
};

const addProductButtonsToHTML = (product, wrapper) => {
    const button = `<button id="${product.id}" class="button">${product.name}</button>`;
    wrapper.insertAdjacentHTML('beforeend', button);
};

const showTag = (event) => {
    getDataToRemove(tagId);
    addTagToHTML(getProductForTag(+event.target.id));
};

const getProductForTag = (id) => {
    return products.find((product) => {
        if (id === product.id) {
            return product;
        };
    });
};

const addTagToHTML = (item) => {
    const productTagTemplate = `<div id="${tagId}" class="tag-wrapper">
                                    <p>
                                        Product: <b>${item.name}</b>
                                        <br>
                                        Price: <strong>${getProductPrice(item)} hrn</strong>
                                    </p>
                                </div>`;
    document.getElementById(firstWayTagId).insertAdjacentHTML('beforeend', productTagTemplate);
};

const removePricesData = () => {
    getDataToRemove(pricesTableId);
};

const removeFirstTagData = () => {
    getDataToRemove(firstWayTagId);
};

const removeSecondTagData = () => {
    getDataToRemove(pricesTableId);
};

const getDataToRemove = (identifier) => {
    const dataElement = document.getElementById(identifier);
    if (!!dataElement) {
        dataElement.remove();
    };
};

initContent();