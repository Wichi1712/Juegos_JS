//let canvas = document.getElementById("canvas");
//let ctx = canvas.getContext("2d");
//------------------------TEST-------------------------------
//console.log("ok");
/*
document.addEventListener("keydown", eventTest);

function eventTest(event) {
    var code = event.keyCode;
    
    if (code == 37) {console.log("izquierda 37");}//arrow left
    if (code == 39) {console.log("derecha 39");}//arrow right
    if (code == 38) {console.log("arriba 38");}//arrow up
    if (code == 40) {console.log("abajo 40");}//arrow down
}
*/
//--------------------------------------------------------------------------------------

let ANCHO = 700;
let ALTO = 500;
//let canvas, ctx;
let ejex = true;
let ejey = true;

let img1, img2, img3, imgMoto;

let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

function cargaImagenes() {
    img1 = new Image();
    img2 = new Image();
    img3 = new Image();
    imgMoto = new Image();

    img1.src = "img/angy.png";
    img2.src = "img/dron.png";
    img3.src = "img/neo.png";
    imgMoto.src = "img/moto00.png"
}

//SE CARGA EN HTML
function inicializa() {
    cargaImagenes();
}


function borraCanvas() {
    canvas.width = ANCHO;
    canvas.height = ALTO;
}


//ANGEL---------------------------------------
var angy = {
    x: 100,
    y: 200,
    sizeH: 32,
    sizeV: 32,
    scaleX: 100,
    scaleY: 100
};

function dibujaAngy() {
    ctx.drawImage(img1, 0, 0, angy.sizeH, angy.sizeV, angy.x, angy.y, angy.scaleX, angy.scaleY);    
}

function moveAngy() {
    angy.x++;
}

//DRON----------------------------------------
var dron = {
    x: 50,
    y: 100,
    clipX: 0,//Recorte de imagen en X
    clipY: 0,//Recorte de imagen en Y
    sizeH: 32,
    sizeV: 32,
    scaleX: 100,
    scaleY: 100

}

function dibujaDron() {
    ctx.drawImage(img2,dron.clipX,dron.clipY,dron.sizeH,dron.sizeV,dron.x,dron.y,dron.scaleX,dron.scaleY);
}

function moveDron() {
    dron.x +=2;
}


//-------------------------------------------------

//NEO---------------------------------------------
var neo = {
    x: 100,
    y: 300,
    sizeH: 32,
    sizeV: 32,
    scaleX: 100,
    scaleY: 100
}

function dibujaNeo() {
    ctx.drawImage(img3,0,0,neo.sizeH,neo.sizeV,neo.x,neo.y,neo.scaleX,neo.scaleY);
}

function moveNeo() {
    neo.x += 2.5;
    neo.y--;
}
//--------------------------------------------------

//MOTO--------------------------------------------------
var moto00 = {
    x: 100,
    y: 300,
    sizeH: 64,
    sizeV: 64,
    scaleX: 100,
    scaleY: 100
}

function dibujaMoto() {
    ctx.drawImage(imgMoto,0,0,moto00.sizeH,moto00.sizeV,moto00.x,moto00.y,moto00.scaleX,moto00.scaleY);
}

//function moveMoto() {
   // moto00.x += 3;
//}


document.addEventListener( "keydown", function(event){
	var cod = event.key; //En desuso ==>keyCode;
    //console.log(cod);

    //Izquierda
    if(cod == "ArrowLeft"){moto00.x -= 5;}
    //Derecha
    if(cod == "ArrowRight"){moto00.x +=5;}
    //Arriba
    if(cod == "ArrowUp"){moto00.y -=5; moto00.scaleX -=1; moto00.scaleY -=1;}
    //Abajo
    if(cod == "ArrowDown"){moto00.y +=5;moto00.scaleX +=1;moto00.scaleY +=1;}
});

/*
document.addEventListener("keyup", function (event) {
    var cod = event.key;

    if ( cod == "a" || cod == "d"){ejey = true; ejex = false;}
    if ( cod == "ArrowUp" || cod == "ArrowDown"){ejex = true; ejey = false;}
});

*/

//------------------------------------------------------------
//BUCLE PRINCIPAL
var FPS = 60;
setInterval(()=> {
    principal();
}, 1000/FPS);

function principal() {
    //console.log("principal ejecutandose");
    borraCanvas();

    dibujaAngy();
    moveAngy();

    dibujaDron();
    moveDron();

    dibujaNeo();
    moveNeo();

    dibujaMoto();
   // moveMoto();
}