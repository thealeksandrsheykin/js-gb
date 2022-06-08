#!/usr/bin/env node

/*
3. Товары в корзине хранятся в массиве. Задачи:
    a. Организовать такой массив для хранения товаров в корзине;
    b. Организовать функцию countBasketPrice, которая будет считать стоимость корзины.

*/

// Переделал немного функцию, вместо списка сделал объект (ключ - продукт, значение - кол-во продукта в корзине)

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