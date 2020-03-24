'use strict';

let canvas;
let ctx;
const FPS = 50;

const anchoF = 50;
const altoF = 50;

const grass = '#166b2d';
const way ='#d46b15';

const maze = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 2, 0, 0, 0, 0, 0, 2, 2, 2, 2, 0, 2, 2, 2, 2, 2, 0, 3, 0],
    [0, 2, 0, 2, 2, 2, 0, 2, 0, 0, 2, 0, 0, 0, 2, 0, 2, 0, 2, 0],
    [0, 2, 0, 2, 0, 2, 0, 2, 2, 2, 2, 0, 2, 2, 2, 0, 2, 0, 2, 0],
    [0, 2, 2, 2, 0, 2, 2, 2, 0, 0, 0, 0, 2, 0, 0, 0, 2, 2, 2, 0],
    [0, 2, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 0, 2, 2, 2, 0, 0, 0],
    [0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 2, 2, 2, 0, 1, 0],
    [0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0],
    [0, 2, 2, 2, 0, 2, 2, 2, 0, 2, 2, 2, 0, 2, 2, 2, 0, 2, 2, 0],
    [0, 2, 0, 2, 2, 2, 2, 2, 2, 2, 0, 2, 2, 2, 0, 2, 0, 2, 0, 0],
    [0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];

function drawMaze() {
    let color;

    for (let y = 0; y < maze.length; y++) {
        for (let x = 0; x < 20; x++) {
            if(maze[y][x] === 0 ){
                color = grass;
            }
            if(maze[y][x] === 2){
                color = way;
            }
            ctx.fillStyle = color;
            ctx.fillRect(x*anchoF, y*altoF, anchoF, altoF);
        }
    }
}

function initialize() {
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d'); //siempre va a ser asi para imagen 2D

    //La función principal se va a ejecutar 20 veces por segundo
    setInterval(function () {
        master();
    },1000/FPS);
}

function deleteCanvas() {
    canvas.width = 1000;
    canvas.height = 600;
}

function master() {
    deleteCanvas();
    drawMaze();
}

