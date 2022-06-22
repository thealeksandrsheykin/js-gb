#!/usr/bin/env node

/*
1. Продолжаем реализовывать модуль корзины:
    a. Добавлять в объект корзины выбранные товары по клику на кнопке «Купить» без перезагрузки страницы;
    b. Привязать к событию покупки товара пересчет корзины и обновление ее внешнего вида.
*/

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
            return item.productId === +product.id;    // Разобраться как работает +
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
        this.render();
    },

    deleteFromCart(id) {
        const indexItem = this.items.findIndex( (item) => {
            return item.id === id;
        } );
        this.items.splice(indexItem, 1);
    },

    render() {
        const cartWrapperElement = document.querySelector('.cart');
        cartWrapperElement.innerHTML = ''
        const cartElement = document.createElement('div');
        const itemH2Element = document.createElement('h4');
        if ( this.getCartLength() === 0 ) {
            itemH2Element.textContent = 'Корзина пуста...';
        } else {
            itemH2Element.textContent = `В корзине: ${this.getCartLength()} товаров на сумму ${this.getTotalPrice()} рублей`;
        }
        cartElement.appendChild(itemH2Element);
        cartWrapperElement.appendChild(cartElement);
    }
};

const catalog = {
    cart,
    items: [
        {
            id: 1001,
            name: 'Велосипед',
            price: 25000,
            count: 5,
        },
        {
            id: 1002,
            name: 'Самокат',
            price: 35000,
            count: 10,
        },
        {
            id: 1003,
            name: 'Скейтборд',
            price: 5000,
            count: 2,
        },
    ],

    clickHandler (event) {
        if (event.target.tagName === 'BUTTON'){
            const idx = this.items.findIndex(item => {
                return item.id === +event.target.dataset.id;    // Разобраться как работает +
            });
            cart.addToCart(this.items[idx]);
        }
    },

    render() {
        const catalogWrapperElement = document.querySelector('.catalog');
        const catalogElement = document.createElement('ol');
        this.items.forEach( item => {
            const itemElement = document.createElement('li');

            const containerElement = document.createElement('div');
            containerElement.setAttribute('class','product');
            itemElement.appendChild(containerElement);

            // Заголовок (название продукта)
            const itemH3Element = document.createElement('h3');
            itemH3Element.textContent = item.name;
            containerElement.appendChild(itemH3Element);

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
            this.clickHandler(event);
        });

        catalogWrapperElement.appendChild(catalogElement);

        const itemHrElement = document.createElement('hr');
        catalogWrapperElement.appendChild(itemHrElement);
    }



}



//----------------------------------------

window.addEventListener('load', () => {
    catalog.render();
    cart.render();
});

