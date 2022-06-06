#!/usr/bin/env node

/*
8. * С помощью рекурсии организовать функцию возведения числа в степень. Формат: function
    power(val, pow), где val — заданное число, pow –— степень.
*/

function power(val, pow) {
    if (pow != 1) {
        return val * power(val, pow - 1);
    }
    return val
}
console.log(power(2,3))

console.log(Math.pow(2,3))