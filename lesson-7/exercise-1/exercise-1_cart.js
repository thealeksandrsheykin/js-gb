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

    addToCart(id) {
        const idx = this.items.findIndex( item => {
            return item.id === +id;
        } );

        this.items[idx].count++;
        this.render();
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

    render() {
        console.log(this.checkCart());
        if (this.checkCart()){
            this.writeDescription();
            return 0;
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
            itemPElement.innerHTML = item.price + '<br>';
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
    }


}

window.addEventListener('load', () => {
    cart.init();
});
