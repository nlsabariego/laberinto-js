'use strict';

let canvas;
let ctx;
const FPS = 50;

const anchoF = 50;
const altoF = 50;

let imgHouse;
let imgBone;
let imgDog;

const grass = '#166b2d';//COLORES LABERINTO
const way ='#d46b15';
const bones = '#753f0d';
const myHome = '#b1ff4a';
const noBone = '#000000';

const maze = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 2, 0, 0, 0, 0, 0, 2, 2, 2, 2, 0, 2, 2, 2, 2, 2, 0, 1, 0],
    [0, 2, 0, 2, 2, 2, 0, 2, 0, 0, 2, 0, 0, 0, 2, 0, 2, 0, 2, 0],
    [0, 2, 0, 2, 0, 2, 0, 2, 2, 2, 2, 0, 2, 2, 2, 0, 2, 0, 2, 0],
    [0, 2, 2, 2, 0, 2, 2, 2, 0, 0, 0, 0, 2, 0, 0, 0, 2, 2, 2, 0],
    [0, 2, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 0, 2, 2, 2, 0, 0, 0],
    [0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 2, 2, 2, 0, 3, 0],
    [0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0],
    [0, 2, 2, 2, 0, 2, 2, 2, 0, 2, 2, 2, 0, 2, 2, 2, 0, 2, 2, 0],
    [0, 2, 2, 2, 0, 2, 2, 2, 0, 2, 0, 2, 2, 2, 0, 2, 0, 2, 0, 0],
    [0, 2, 0, 2, 2, 2, 0, 2, 2, 2, 0, 2, 2, 2, 0, 2, 2, 2, 2, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];


//PLANTILLA CASA

const House = function (x, y) {
    this.x = x;
    this.y = y;
    //MÉTODOS
    this.draw = function (){
        ctx.drawImage(imgHouse, this.x, this.y);
    };
};

//PLANTILLA HUESO

const Bone = function (x, y) {
    this.x = x;
    this.y = y;
    //MÉTODOS
    this.draw = function (){
        ctx.drawImage(imgBone, this.x, this.y);
    };
};

//PLANTILLA PROTAGONISTA
const Protagonist = function (){
    this.x = 1;
    this.y = 1;
    this.color = 'd46b15';
    this.bone = false;

    //MÉTODOS
    this.draw = function () {
        ctx.drawImage(imgDog, this.x*anchoF, this.y*altoF);
    };

    this.margins = function (x, y){
        let collision = false;

        if (maze[y][x] === 0 ){
            collision = true;
        }
        return(collision);
    };

    this.up = function(){
        if (this.margins(this.x, this.y-1) === false){
            this.y --;
            this.logicObjects();
        }
    };

    this.down = function(){
        if (this.margins(this.x, this.y+1) === false){
            this.y ++;
            this.logicObjects();
        }
    };

    this.left = function(){
        if (this.margins(this.x-1, this.y) === false){
            this.x --;
            this.logicObjects();
        }
    };

    this.right = function(){
        if (this.margins(this.x+1, this.y) === false){
            this.x ++;
            this.logicObjects();
        }
    };

    this.win = function(){
        console.log('ganaste');
        this.x = 1;
        this.y = 1;

        this.bone = false;
        maze[6][18] = 3;

    };

    this.logicObjects = function(){
        let object = maze[this.y][this.x];

        //obtine hueso
        if (object === 3){
            this.bone = true;
            maze[this.y][this.x] = 4;
            console.log('tienes el hueso');

        }

        //llegamos a casa
        if (object === 1){
            if(this.bone === true){
                this.win();
            }
            else{
                console.log('no tienes hueso');
                
            }
        }
    };

};

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
            if(maze[y][x] === 1 ){
                color = myHome;
            }
            if(maze[y][x] === 3 ){
                color = bones;
            }
            if(maze[y][x] === 4){
                color = noBone;
            }
            ctx.fillStyle = color;
            ctx.fillRect(x*anchoF, y*altoF, anchoF, altoF);
        }
    }
}

//Creamos perrete
let dog = new Protagonist();
const home = new House(900,50);
const prize = new Bone(900,300);

function initialize() {
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d'); //siempre va a ser asi para imagen 2D
    
    //Cargamos imágenes
    imgHouse = new Image();
    imgHouse.src = '../assets/images/house.png';
    imgBone = new Image();
    imgBone.src = '../assets/images/bone.png';
    imgDog = new Image();
    imgDog.src = '../assets/images/dog.png';
    


    //FUNCION PARA MOVER AL PERRETE CON LAS FLECHAS DEL TECLADO

    document.addEventListener('keydown', function (tecla){
        //console.log(tecla.keyCode);//Para saber elcodigo de la tecla que pulsamos

        //ARRIBA
        if(tecla.keyCode === 38){
            dog.up();
        }

        //ABAJO
        if(tecla.keyCode === 40){
            dog.down();
        }

        //IZQUIERDA
        if(tecla.keyCode === 37){
            dog.left();
        }

        //DERECHA
        if(tecla.keyCode === 39){
            dog.right();
        }
    });

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
    home.draw();
    prize.draw();
    dog.draw();
}

