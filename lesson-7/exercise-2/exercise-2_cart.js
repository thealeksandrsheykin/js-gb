#!/usr/bin/env node

const cart = {
    items: [],

    init(){
        this.items = JSON.parse(localStorage.getItem("dataForCart"));
        if (this.checkCart()){
            this.writeDescription();
        }
        else {
            this.render();
            this.renderOrder();
            this.nextEvent();
        }
    },

    checkCart(){
        return this.getCartLength() === 0;
    },

    writeDescription(){
        const cartWrapperElement = document.querySelector('.cart');
        cartWrapperElement.innerHTML = ''
        const cartElement = document.createElement('div');
        const itemH4Element = document.createElement('h4');
        itemH4Element.textContent = 'Корзина пуста...';
        cartElement.appendChild(itemH4Element);
        cartWrapperElement.appendChild(cartElement);
    },

    getCartLength() {
        return this.items.length;
    },

    getPriceProduct(count,price){
        return count * price
    },

    addToCart(id) {
        const idx = this.items.findIndex( item => {
            return item.id === +id;
        } );
        this.items[idx].count++;
        this.render();
        this.renderOrder();
    },

    deleteFromCart(id) {
        const idx = this.items.findIndex( item => {
            return item.id === +id;
        } );

        if ( this.items[idx].count === 1 ) {
            this.removeFromCart(id);
            return;
        } else {
            this.items[idx].count--;
        }
        this.render();
        this.renderOrder();

    },

    removeFromCart(id) {
        console.log( this.items );
        console.log( id );
        const indexItem = this.items.findIndex( (item) => {
            return item.id === +id;
        } );

        console.log( indexItem );
        this.items.splice(indexItem, 1);
        this.render();
        this.renderOrder();
    },

    clickHandler(event) {
        if ( event.target.tagName === 'BUTTON' ) {
            const {id, action} = event.target.dataset

            switch ( action ) {
                case '/':
                    this.removeFromCart(id);
                    return;
                case '+':
                    this.addToCart(id);
                    return;
                case '-':
                    this.deleteFromCart(id);
                    return;
            }
        }
    },


    renderOrder() {
        localStorage.setItem("dataForCatalog", JSON.stringify(this.items));
        console.log(this.items);
        const cartWrapperElement = document.querySelector('.order');
        cartWrapperElement.innerHTML = '';
        if (this.items.length === 0){
            return;
        }
        const itemH3Element = document.createElement('h3');
        itemH3Element.textContent = 'Состав заказа';
        cartWrapperElement.appendChild(itemH3Element);

        const cartElement = document.createElement('div');
        this.items.forEach( item => {
            const itemElement = document.createElement('div');

            const itemH5Element = document.createElement('h5');
            itemH5Element.textContent = item.name;
            itemElement.appendChild(itemH5Element);

            const itemPElement = document.createElement('p');
            itemPElement.innerHTML = this.getPriceProduct(item.count, item.price) + '<br>'; //item.price + '<br>';
            itemElement.appendChild(itemPElement);

            const itemCountElement = document.createElement('p');
            itemCountElement.innerHTML = item.count + '<br>';
            itemElement.appendChild(itemCountElement);

            cartElement.appendChild(itemElement);

        } );

        cartWrapperElement.appendChild(cartElement);
    },


    render() {
        if (this.checkCart()){
            // const cartWrapperElement = document.querySelector('.order');
            // cartWrapperElement.innerHTML = '';
            this.writeDescription();
            return;
        }
        const cartWrapperElement = document.querySelector('.cart');
        cartWrapperElement.innerHTML = '';
        const cartElement = document.createElement('div');

        this.items.forEach(item => {
            const itemElement = document.createElement('div');

            //создаем заголовок товара
            const itemH3Element = document.createElement('h5');
            itemH3Element.textContent = item.name;
            itemElement.appendChild(itemH3Element);

            const itemPElement = document.createElement('p');
            itemPElement.innerHTML = this.getPriceProduct(item.count, item.price) + '<br>';
            itemElement.appendChild(itemPElement);

            const itemCountElement = document.createElement('p');
            itemCountElement.innerHTML = item.count + '<br>';
            itemElement.appendChild(itemCountElement);

            const itemButtonPlusElement = document.createElement('button');
            itemButtonPlusElement.textContent = '+';
            itemButtonPlusElement.dataset.id = item.id;
            itemButtonPlusElement.dataset.action = '+';
            itemElement.appendChild(itemButtonPlusElement);

            const itemButtonMinusElement = document.createElement('button');
            itemButtonMinusElement.textContent = '-';
            itemButtonMinusElement.dataset.id = item.id;
            itemButtonMinusElement.dataset.action = '-';
            itemElement.appendChild(itemButtonMinusElement);

            const itemButtonDeleteElement = document.createElement('button');
            itemButtonDeleteElement.textContent = 'X';
            itemButtonDeleteElement.dataset.id = item.id;
            itemButtonDeleteElement.dataset.action = '/';
            itemElement.appendChild(itemButtonDeleteElement);

            const itemHrElement = document.createElement('hr');
            itemElement.appendChild(itemHrElement);

            cartElement.appendChild(itemElement);

        });
        cartElement.addEventListener('click', (event) => {
            this.clickHandler(event);
        });
        cartWrapperElement.appendChild(cartElement);
    },

    nextEvent() {
        const next = document.querySelector('.next');
        next.addEventListener('click', () => {
            this.nextHandler();
        });
    },

    nextHandler() {
        const close = document.querySelector('.close');

        let element = null;
        for ( let i = 0 ; i < close.children.length; i++) {
            if ( close.children[i].dataset.display === 'true' ) {
                element = close.children[i];
                element.dataset.display = false;
                element.style.display = 'none';

                if ( close.children[i + 1] ) {
                    close.children[i + 1].dataset.display = true;
                    close.children[i + 1].style.display = 'block';
                } else {
                    close.children[0].dataset.display = true;
                    close.children[0].style.display = 'block';
                }
                break;
            }
        }
    }

}

window.addEventListener('load', () => {
    cart.init();
});
