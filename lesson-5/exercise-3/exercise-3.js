#!/usr/bin/env node

/*
3. * Сделать так, чтобы товары в каталоге выводились при помощи JS:
        a. Создать массив товаров (сущность Product);
        b. При загрузке страницы на базе данного массива генерировать вывод из него.
HTML-код должен содержать только div id=”catalog” без вложенного кода. Весь вид каталога генерируется JS.
*/

const cart = {
    items: [
        {
            id: 1001,
            name: 'Велосипед',
            price: 10000,
            count: 10,
        },
        {
            id: 1002,
            name: 'Самокат',
            price: 1000,
            count: 3,
        },
        {
            id: 1003,
            name: 'Скейтбоард',
            price: 2500,
            count: 1,
        }
    ],
};

const shop ={
    containerElement : null,
    orderedList : null,
    array: cart.items,

    init () {
        this.containerElement = document.getElementById('catalog');
        this.orderedList = document.createElement('ol');
        this.containerElement.appendChild(this.orderedList);
        this.generateListProductToHtml();
    },

    generateListProductToHtml(){
        let header = document.createElement('h2');
        header.innerText = 'Каталог:';
        this.containerElement.insertBefore(header, this.orderedList);
        for (let i  in this.array){
            let data = `${this.array[i].name} Цена: ${this.array[i].price} руб. Кол-во: ${this.array[i].count}`;
            let li = document.createElement('li');
            li.appendChild(document.createTextNode(data));
            this.orderedList.appendChild(li);
        }
    },
};

window.addEventListener('load', () => {
    shop.init()
});