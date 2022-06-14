#!/usr/bin/env node

/*
Написать функцию, преобразующую число в объект. Передавая на вход число от 0 до 999, надо получить на выходе объект, в
котором в соответствующих свойствах описаны единицы, десятки и сотни. Например, для числа 245 надо получить следующий
объект:
    {‘единицы’: 5,‘десятки’: 4, ‘сотни’: 2}.
Если число превышает 999, необходимо выдать соответствующее сообщение с помощью console.log и вернуть пустой объект.
 */


// Способ №1
function number_to_string(number){
    let result = {'единицы': 0,'десятки': 0, 'сотни': 0};
    if (number > 999){
        console.log('Данное число выходит за рамки диапозона: 0-999');
        return result
    }
    else {
        for (let [i, j] of [['сотни', 100], ['десятки', 10], ['единицы', 1]]) {
            result[i] = Math.trunc(number / j);
            number = number % j;
        }
    }
    return result
}

// Способ №2

function number_to_string_2(number) {
    return  {
        'единицы':  number % 10,
        'десятки': Math.trunc(((number / 10) % 10)),
        'сотни':   Math.trunc((number / 100))
    }
}

console.log(number_to_string(124))
console.log(number_to_string_2(677))