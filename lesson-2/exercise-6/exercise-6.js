#!/usr/bin/env node

/*
6. Реализовать функцию с тремя параметрами: function mathOperation(arg1, arg2, operation), где arg1, arg2 — значения
аргументов, operation — строка с названием операции. В зависимости от переданного значения выполнить одну из арифметических
операций (использовать функции из пункта 5) и вернуть полученное значение (применить switch).
*/

function mathOperation(arg1,arg2,operation){
    switch (operation){
        case('sum'):
           return sum(arg1,arg2)
        case('dif'):
            return dif(arg1,arg2)
        case('mul'):
            return mul(arg1,arg2)
        case('div'):
            return div(arg1,arg2)
    }
}

console.log(mathOperation(1,2,'sum'))
console.log(mathOperation(1,2,'dif'))
console.log(mathOperation(1,2,'mul'))
console.log(mathOperation(1,2,'div'))