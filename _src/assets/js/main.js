'use strict';

let canvas;
let ctx;
const FPS = 50;
const text = document.querySelector('.main__text');


const anchoF = 50;
const altoF = 50;

let imgHouse;
let imgBone;
let imgDog;
let imgPolice;

let enemy = [];

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
        ctx.drawImage(imgHouse, this.x*anchoF, this.y*altoF);
    };
};

//PLANTILLA HUESO

const Bone = function (x, y) {
    this.x = x;
    this.y = y;
    //MÉTODOS
    this.draw = function (){
        ctx.drawImage(imgBone, this.x*anchoF, this.y*altoF);
    };
};

//PLANTILLA POLICIA
const Police = function (x, y){
    this.x = x;
    this.y =y;

    this.direction = Math.floor(Math.random()*4);

    this.delay = 50;
    this.fp = 0;
    this.acc = 0;

    this.draw = function () {
        ctx.drawImage(imgPolice, this.x*anchoF, this.y*altoF);
    };

    this.margins = function (x, y){
        let collision = false;

        if (maze[y][x] === 0 ){
            collision = true;
        }
        return(collision);
    };

    this.move = function (){
        dog.crashEnemy(this.x, this.y);

        if(this.acc < this.delay){
            this.acc++;
        }
        else{
            this.acc =0;

            //arriba
            if(this.direction === 0){
                if(this.margins(this.x, this.y-1) === false){
                    this.y--;
                }
                else{
                    this.direction = Math.floor(Math.random()*4);
                }
            }

            //abajo
            if(this.direction === 1){
                if(this.margins(this.x, this.y+1) === false){
                    this.y++;
                }
                else{
                    this.direction = Math.floor(Math.random()*4);
                }
            }

            //izquierda
            if(this.direction === 2){
                if(this.margins(this.x-1, this.y) === false){
                    this.x--;
                }
                else{
                    this.direction = Math.floor(Math.random()*4);
                }
            }

            //derecha
            if(this.direction === 3){
                if(this.margins(this.x+1, this.y) === false){
                    this.x++;
                }
                else{
                    this.direction = Math.floor(Math.random()*4);
                }
            }
        }



    };
};

//PLANTILLA PROTAGONISTA
const Protagonist = function (){
    this.x = 1;
    this.y = 1;
    this.bone = false;

    //MÉTODOS
    this.draw = function () {
        ctx.drawImage(imgDog, this.x*anchoF, this.y*altoF);
    };

    this.crashEnemy = function (x,y){
        if(this.x === x && this.y === y){
            this.dead();
        }
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
        this.x = 1;
        this.y = 1;

        text.innerHTML = '¡HAS GANADO!🎉';

        this.bone = false;
        maze[6][18] = 3;

    };

    this.dead = function (){
        text.innerHTML = '¡Te han pillado! Vuelve a intentarlo🐶';

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
            text.innerHTML = '¡Ya tienes el hueso! ¡Corre a casa!';
        }

        //llegamos a casa
        if (object === 1){
            if(this.bone === true){
                this.win();

            }
            else{
                text.innerHTML = 'Aún no tienes el hueso, ¡búscalo!';

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
//Creamos objetos
const home = new House(18,1);
const prize = new Bone(18,6);


function initialize() {
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d'); //siempre va a ser asi para imagen 2D

    //Cargamos imágenes
    imgHouse = new Image();
    imgHouse.src = './assets/images/house.png';
    imgBone = new Image();
    imgBone.src = './assets/images/bone.png';
    imgDog = new Image();
    imgDog.src = './assets/images/dog.png';
    imgPolice = new Image();
    imgPolice.src = './assets/images/police.png';

    //Creamos policias y los metemos al array 'enemy'
    enemy.push(new Police(9,5));
    enemy.push(new Police(1,8));
    enemy.push(new Police(10,1));
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
    for (let i = 0; i < enemy.length; i++) {
        enemy[i].move();
        enemy[i].draw();
    }
}

