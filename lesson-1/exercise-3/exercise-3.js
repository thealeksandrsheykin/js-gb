#!/usr/bin/env node

/*
    3. * Чему будет равно JS-выражение 1000 + "108"?
*/

// Будет строка: 1000108 поскольку оператор конкатенации приоритетней сложения:
console.log(1000 + '108')

/*
    node exercise-3.js
    1000108
*/

// Но если проявить небольшую смекалку, то сложить все таки можно:
console.log(1000 - (-'108'))
/*
    node exercise-3.js
    1108
*/