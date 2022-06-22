#!/usr/bin/env node

const cart = {
    items: [],

    getTotalPrice() {
        return this.items.reduce( (acc, item) => {
            return acc + item.price * item.count;
        }, 0 );
    },

    getCartLength() {
        return this.items.length;
    },

    addToCart(product) {
        const idx = this.items.findIndex(item => {
            return item.productId === +product.id;
        });
        if (idx === -1){
            this.items.push({
                id: this.items.length === 0 ? 0 : this.items[this.items.length-1].id + 1,
                productId: product.id,
                name: product.name,
                price: product.price,
                count: 1
            });
        }
        else{
            this.items[idx].count ++;
        }
        localStorage.setItem("dataForCart", JSON.stringify(this.items));
        this.render();
    },

    render() {
        const cartWrapperElement = document.querySelector('.cart');
        cartWrapperElement.innerHTML = ''
        const cartElement = document.createElement('div');
        const itemH4Element = document.createElement('h4');
        localStorage.setItem("dataForCart", JSON.stringify(this.items));
        if ( this.getCartLength() === 0 ) {
            itemH4Element.textContent = 'Корзина пуста...';
        } else {
            itemH4Element.textContent = `В корзине: ${this.getCartLength()} товаров на сумму ${this.getTotalPrice()} рублей`;
        }
        cartElement.appendChild(itemH4Element);
        cartWrapperElement.appendChild(cartElement);
    }
};




const catalog = {
    cart,
    settings: {
        galleryMainContainer: null,
        modalImageContainer: 'gallery__modal',
        modalImageClass:     'gallery__image',
        modalImageScreen:    'gallery__back',
        modalImageClose:     'gallery__close',
        modalImageCloseSrc:  'images/close.png',
    },

    items: [
        {
            id: 1001,
            name: 'Велосипед',
            picture_min: 'images/min/bike.jpg',
            picture_max: 'images/max/bike.jpg',
            class_name: 'bike',
            price: 25000,
            count: 5,
        },
        {
            id: 1002,
            name: 'Самокат',
            picture_min: 'images/min/scooter.jpg',
            picture_max: 'images/max/scooter.jpg',
            class_name: 'scooter',
            price: 35000,
            count: 10,
        },
        {
            id: 1003,
            name: 'Скейтборд',
            picture_min: 'images/min/skateboard.jpg',
            picture_max: 'images/max/skateboard.jpg',
            class_name: 'skateboard',
            price: 5000,
            count: 2,
        },
    ],

    // Нажатие кнопки
    buttonClickHandler (event) {
        if (event.target.tagName === 'BUTTON'){
            const idx = this.items.findIndex(item => {
                return item.id === +event.target.dataset.id;    // Разобраться как работает +
            });
            cart.addToCart(this.items[idx]);
        }
    },

    // Нажатие рисунка
    pictureClickHandler (event) {
        this.settings.galleryMainContainer = `.${event.target.parentElement.className}`;
        if (event.target.tagName === 'IMG') {
            this.createModal(event.target);
        }
    },

    // Создание модального окна
    createModal(img) {
        const galleryModal = document.createElement('div');
        galleryModal.classList.add(this.settings.modalImageContainer);

        const galleryScreen = document.createElement('div');
        galleryScreen.classList.add(this.settings.modalImageScreen);
        galleryModal.appendChild(galleryScreen);

        const galleryClose = new Image();
        galleryClose.classList.add(this.settings.modalImageClose);
        galleryClose.src = this.settings.modalImageCloseSrc;
        galleryClose.addEventListener('click', (event) => {
            this.close(event.target);
        });
        galleryModal.appendChild(galleryClose);

        const galleryImage = new Image();
        galleryImage.classList.add(this.settings.modalImageClass);
        galleryImage.src = img.dataset.fullImageUrl;
        galleryModal.appendChild(galleryImage);

        document.querySelector(this.settings.galleryMainContainer).appendChild(galleryModal);
    },

    // Закрытие модального окна
    close(closeImg) {
        closeImg.parentElement.remove();
    },

    render() {
        const catalogWrapperElement = document.querySelector('.catalog');
        const catalogElement = document.createElement('ol');
        this.items.forEach( item => {
            const itemElement = document.createElement('li');

            const containerElement = document.createElement('div');
            containerElement.setAttribute('class',`${item.class_name}`);
            itemElement.appendChild(containerElement);

            // Заголовок (название продукта)
            const itemH3Element = document.createElement('h3');
            itemH3Element.textContent = item.name;
            containerElement.appendChild(itemH3Element);

            // Картинка
            const itemImgElement = document.createElement('img');
            itemImgElement.setAttribute('src', `${item.picture_min}`);
            itemImgElement.setAttribute('alt',`${item.name}`);
            itemImgElement.dataset.fullImageUrl = `${item.picture_max}`;
            itemImgElement.addEventListener('click', (event) => this.pictureClickHandler(event));
            containerElement.appendChild(itemImgElement);

            //Параграф (цена продукта)
            const itemPElement = document.createElement('p');
            itemPElement.innerHTML = `Цена: ${item.price} руб.`;
            containerElement.appendChild(itemPElement);

            // Кнопка купить
            const itemBElement = document.createElement('button');
            itemBElement.innerHTML = 'Купить';
            itemBElement.dataset.id = item.id;
            containerElement.appendChild(itemBElement);


            catalogElement.appendChild(itemElement);

        } );

        catalogElement.addEventListener('click', (event)=>{
            this.buttonClickHandler(event);
        });


        catalogWrapperElement.appendChild(catalogElement);

        const itemHrElement = document.createElement('hr');
        catalogWrapperElement.appendChild(itemHrElement);

    }
}

//-------------------------------------------------

window.addEventListener('load', () => {
    catalog.render();
    cart.render();
});