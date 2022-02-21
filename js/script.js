'use strict';
// const and variables
const board = document.querySelector('.board');
const cells = board.children;
const modal = document.querySelector('.modal');
const resetModal = document.querySelector('.reset-modal');
const resetModalText = document.querySelector('.reset-modal p');
const resetModalBtn = document.querySelector('.reset-modal button');
const modalBtn = document.querySelector('.modal button');
const modalText = document.querySelector('.modal p');
const overlay = document.querySelector('.overlay');
let xStepCount = 0;
let oStepCount = 0;
let winner = '';
let count = 0;
const winCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],

    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],

    [0, 4, 8],
    [6, 4, 2],
];

// listeners
board.addEventListener('click', (element) => {
    element.target.classList.contains('cell') ?  move(element.target) : null;
})

modalBtn.addEventListener('click', () => {
    modal.classList.remove('active');
    overlay.classList.remove('active');
});

resetModalBtn.addEventListener('click', () => {
    count = 0;
    xStepCount = 0;
    oStepCount = 0;
    winner = '';
    for (let i = 0; cells.length > i; i++) {
        cells[i].innerHTML = '';
    }
    resetModal.classList.remove('active');
    overlay.classList.remove('active');
})

// functions
function move(item) {
    if (item.innerHTML == 'x' || item.innerHTML == 'o') {
        showModal();
    } else {
        if (count % 2) {
            item.innerHTML = 'o'
            oStepCount++;
         } else {
             item.innerHTML = 'x';
             xStepCount++;
        }
        count++;
        checkWinner();
        checkDraw();
    }
}

function showModal() {
    modal.classList.add('active');
    modalText.innerHTML = 'поле уже занято';
    overlay.classList.add('active');
    
}

function showResetModal(info, steps) {
   if (info) {
    resetModal.classList.add('active');
    resetModalText.innerHTML = `победили ${info} за ${steps} шагов`;
    overlay.classList.add('active');
   } else {
    resetModal.classList.add('active');
    resetModalText.innerHTML = `ничья`;
    overlay.classList.add('active');
   }
}

function showWinner (winner) {
   let winnerCount = 'x' ? xStepCount : oStepCount;
   showResetModal(winner, winnerCount); 
}

function checkWinner() {
    winCombinations.forEach(item => {
        cells[item[0]].innerHTML == 'x' &&  cells[item[1]].innerHTML == 'x' && cells[item[2]].innerHTML == 'x' ? showWinner('X') : null;
        cells[item[0]].innerHTML == 'o' &&  cells[item[1]].innerHTML == 'o' && cells[item[2]].innerHTML == 'o' ? showWinner('O') : null;
    })
}

function checkDraw() {
    let checkCount = 0;
    for (let i = 0; i < cells.length; i++) {
       (cells[i].innerHTML == 'x' || cells[i].innerHTML == 'o') ? ++checkCount : null;
       console.log(checkCount);
    }
    (checkCount == 9) ? showResetModal() : null;
}   

