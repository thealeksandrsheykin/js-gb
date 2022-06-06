#!/usr/bin/env node

/*
7. * Сравнить null и 0. Объяснить результат
*/

console.log(null >  0);        // false
console.log(null <  0);        // false
console.log(null == 0);        // false
console.log(null >= 0);        // true
console.log(null <= 0);        // true
console.log(null == undefined) // true

/*
Причина в том, что нестрогое равенство и сравнения > < >= <= работают по-разному. Сравнения преобразуют null в число,
рассматривая его как 0. Поэтому выражение null >= 0 и null <= 0 истинно, а null > 0 ложно.

Для нестрогого равенства == значений undefined и null действует особое правило: эти значения ни к чему не приводятся,
они равны друг другу и не равны ничему другому. Поэтому null == 0 ложно.
 */
