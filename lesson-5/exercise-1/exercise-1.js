#!/usr/bin/env node
/*
1. Создать функцию, генерирующую шахматную доску. Можно использовать любые html-теги. Доска должна быть верно разлинована
   на черные и белые ячейки. Строки должны нумероваться числами от 1 до 8, столбцы — латинскими буквами A, B, C, D, E, F, G, H.
 */

const settings = {
    rowsCount: 8,
    colsCount: 8,
    firstColor:  '#000000',
    secondColor: '#ffffff',
};



const board = {
    settings: settings,
    containerElement: null,
    letters: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'],

    init() {
        this.containerElement = document.querySelector('.board');
        this.renderField();
    },

    startDraw() {
        this.init();
    },

    renderField() {
        this.containerElement.innerHTML = '';
        for (let row = 0; row < this.settings.rowsCount; row++ ) {
            const trElement = document.createElement('tr');
            trElement.setAttribute('number-row', 8-row);
            this.containerElement.append(trElement);
            for (let col = 0; col < this.settings.colsCount; col++ ){
                const tdElement = document.createElement('td');
                trElement.append(tdElement);
                if (row === 7) {
                    tdElement.setAttribute('letter-col', this.letters[col]);
                }
                if (!(row % 2 === col % 2)) {
                    tdElement.style.background = settings.firstColor
                }

            }
        }
    }

};

window.addEventListener('load', () => {
    board.startDraw();
});
