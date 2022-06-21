#!/usr/bin/env node

/*
Сделать генерацию корзины динамической: верстка корзины не должна находиться в HTML-структуре. Там должен быть только div,
в который будет вставляться корзина, сгенерированная на базе JS:
    a. Пустая корзина должна выводить строку «Корзина пуста»;
    b. Наполненная должна выводить «В корзине: n товаров на сумму m рублей»
*/

const shop = {
    products :  {},
    productId : 1000,

    // Получить все продукты в магазине
    getProduct(){
        return this.products;
    },

    // Получить ID продукта по моделе (если такого не существует возвращает false)
    getIdProduct(model){
        for (let key in this.products){
            if(model === this.products[key].model){
                return this.products[key].productId;
            }
        }
        return false;
    },

    //Получить стоимость продукта
    getPriceProduct(model){
        let existId = this.getIdProduct(model)
        if (existId){
            return this.products[existId].price
        }
        else{
            return false
        }
    },

    // Добавить продукт в магазин
    addProduct(name, model, price, count){
        let existId = this.getIdProduct(model)
        if (existId){
            this.products[existId].count += count
        }
        else{
            let newProduct = {
                productId: this.productId,
                name,
                model,
                price,
                count,
            };
            this.products[this.productId] = newProduct;
            this.productId++;
        }
    },

    // Удалить продукт из магазина
    removeProduct(model,count){
        let existId = this.getIdProduct(model)
        this.products[existId].count -= count;
        if (this.products[existId].count === 0){
             delete this.products[existId];
        }
    },
}


const basket ={
    cart: {},
    containerElement : null,

    init (){
        this.containerElement = document.querySelector('.basket');
        this.createHeader();
        this.createParagraph();
    },

    createHeader(){
        let header = document.createElement("h1");
        header.innerHTML = "Корзина:";
        this.containerElement.appendChild(header);
    },

    createParagraph() {
        let paragraph = document.createElement("p");
        paragraph.innerHTML = this.createMessageCart();
        this.containerElement.appendChild(paragraph);
    },

    getCart(){
        return this.cart;
    },

    getProductCart(model){
        for (let key in this.cart){
            if(model === this.cart[key].model){
                return this.cart[key].productId;
            }
        }
        return false;
    },

    addCart(name, model, count){
        let existProductCart = this.getProductCart(model);
        if (existProductCart) {
            this.cart[model].count += count;
        }
        else{
            let newCart = {
                name,
                model,
                count,
            }
            this.cart[model] = newCart;
        }
    },

    removeCart(model, count){
        console.log(this.cart[model].count -= count);

    },

    calcProductCart(){
        let total = 0;
        for (let key in this.cart){
            total += this.cart[key].count;
        }
        return total;

    },

    calcPriceCart(){
        let total = 0;
        for(let key in this.cart){
            total += shop.products[shop.getIdProduct(this.cart[key].model)].price * this.cart[key].count;
        }
        return total;

    },

    checkEmptyBasket(){
        if(Object.keys(this.cart).length === 0){
            return true;
        } else {
            return false;
        }
    },

    createMessageCart(){
        if(this.checkEmptyBasket()){
            return 'Корзина пуста';
        } else {
            return (`В корзине: ${this.calcProductCart()} товаров на сумму  ${this.calcPriceCart()} рублей`);
        }
    },

}


window.addEventListener('load', () => {
    // Добавление товара в магазин
    shop.addProduct('Велосипед', 'RX-36472', 25000, 10);
    shop.addProduct('Самокат', 'FX-2432', 15000, 5);
    shop.addProduct('Скейтбоард', 'ZP-211', 50000, 5);
    shop.addProduct('Велосипед', 'RX-36472', 25000, 12);
    shop.addProduct('Роликовые коньки', 'AB-234343', 5000, 9);
    shop.addProduct('Самокат', 'FX-2589', 1000, 67);
    shop.addProduct('Велосипед', 'TE-372', 25000, 10);
    // Просмотр товаров в магазине
    //console.log(shop.getProduct());
    // Добавление товара в корзину
    basket.addCart('Велосипед','RX-36472',3);
    basket.addCart('Самокат','FX-2432',2);
    basket.addCart('Велосипед','RX-36472',5);
    basket.addCart('Велосипед','TE-372',5);
    basket.init();
    //Просмотр товара в корзине
    //console.log(basket.getCart());

});