#!/usr/bin/env node


/*
Продолжить работу с интернет-магазином:
    a. В прошлом домашнем задании вы реализовали корзину на базе массивов. Какими объектами можно заменить их элементы?
    b. Реализуйте такие объекты.
    c. Перенести функционал подсчета корзины на объектно-ориентированную базу.
 */

function countBasketPrice(client_basket, store_prices) {
    let price_basket_client = 0;
    console.log('У клиента в корзине:')
    for (let product in client_basket) {
        console.log(`${product} кол-во: ${client_basket[product]}` );
        price_basket_client += store_prices[product] * client_basket[product];
    }
    return  Math.trunc( price_basket_client * 100 ) / 100
}

let store_prices  = {'Хлеб': 71.99, 'Молоко': 67.40, 'Мясо': 320, 'Рыба': 450.30};
let client_basket = {'Хлеб': 1, 'Молоко': 2};

price_basket = countBasketPrice(client_basket,store_prices).toString().split('.')

console.log(`Стоимость клиентской корзины: ${price_basket[0]} руб. ${price_basket[1]} коп.`)