#!/usr/bin/env node

/*
1. С помощью цикла while вывести все простые числа в промежутке от 0 до 100.
*/

let n = 100;
let i = 0;

while (i < n){
    console.log(++i);
}
console.log('-'.repeat(12))
do {
    console.log(i--);
} while(i >= 0);