#!/usr/bin/env node

/*
1. Почему код дает именно такие результаты?
    var a = 1, b = 1, c, d;
    c = ++a; alert(c);      // 2
    d = b++; alert(d);      // 1
    c = (2+ ++a); alert(c); // 5
    d = (2+ b++); alert(d); // 4
    alert(a);               // 3
    alert(b);               // 3
 */

var a = 1, b = 1, c, d;

c = ++a;
console.log(c); // 2
// Выведет 2, так как унарный оператор инкрементирования "++" является префиксной, а он в свою очередь
// инкрементирование производит сразу, а возврат — уже с обновленным значением.

d = b++;
console.log(d); // 1
// Выведет 1, так как унарный оператор инкрементирования "++" является постфиксной, а он в свою очередь
// сначала производит возвращение значения, а потом выполняет инкрементирование.

c = (2+ ++a);
console.log(c); // 5
// Выведет 5, так как мы инкрементировали значение "a" до этого и инкрементируем сейчас с помощью префиксного оператора,
// то получаем 2 + 3

d = (2+ b++);
console.log(d); // 4
// Выведет 4, так как мы инкрементировали значение "b" до этого и инкрементируем сейчас с помощью постфиксного оператора,
// то получаем 2 + 2

console.log(a); // 3
// Выведет 3, так как мы инкрементировали значение "a" два раза

console.log(b); // 3
// Выведет 3, так как мы инкрементировали значение "b" два раза

