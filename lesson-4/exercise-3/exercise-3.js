#!/usr/bin/env node

/*
 * Подумать над глобальными сущностями. К примеру, сущность «Продукт» в интернет-магазине актуальна не только для корзины,
но и для каталога. Стремиться нужно к тому, чтобы объект «Продукт» имел единую структуру для различных модулей сайта, но в
разных местах давал возможность вызывать разные методы.
 */

const product = {
        model: 'Test Product',
        year:  2022,
        color: 'blue',
        price: 100,
        quantityProductStore: 0,
        availableInStore: false,
        shopGetProduct: function() {
            this.availableInStore = true;
        },
        haveProductStore: function(quantity) {
            if (this.availableInStore) {
                this.quantityProductStore += quantity;
             } else {
                alert("Для начала доставьте продукт в магазин!");
             }
        }
};