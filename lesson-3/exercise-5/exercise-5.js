#!/usr/bin/env node

/*
* Нарисовать пирамиду с 20 рядами с помощью console.log, как показано на рисунке:
    x
    xx
    xxx
    xxxx
    xxxxx
*/

// Первый вариант
var i = 0;
var n = 21;

while (i < n) {
    console.log('x'.repeat(i));
    i++
}
console.log();
// Второй вариант
for(let i = 0; i <= 20; i++){
    for(let j = 20; j > i; j--){
       process.stdout.write('x')
    }
    console.log()
}



