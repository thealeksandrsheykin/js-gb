#!/usr/bin/env node

/*
2. С этого урока начинаем работать с функционалом интернет-магазина. Предположим, есть сущность корзины. Нужно реализовать
функционал подсчета стоимости корзины в зависимости от находящихся в ней товаров.
 */

function cart_price_basket(client_basket, store_prices) {
    let price_basket_client = 0;
    for (let product of client_basket) {
        price_basket_client += store_prices[product];
    }
    return price_basket_client
}

let store_prices  = {'Хлеб': 71.99, 'Молоко': 67.40, 'Мясо': 320, 'Рыба': 450.30};
let client_basket = ['Хлеб', 'Молоко'];

price_basket = cart_price_basket(client_basket,store_prices).toString().split('.')

console.log(`Стоимость клиентской корзины: ${price_basket[0]} руб. ${price_basket[1]} коп.`)
