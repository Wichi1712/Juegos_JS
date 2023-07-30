var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var ancho = canvas.width;
var alto = canvas.height;

//variables de balon
var posHor = 80;
var posVer = 50;
var velocidadH = 1;
var velocidadV = 1;

//Variables de player
var X = 500;
var Y = 150;
var testX = 400;
var testY = 100;
var testMoveSpeed = 5;
var sizeTest = 20;
const DIAMETER = 20;
var moveX = 5;
var moveY = 5;
var speed = 5;
var speedBlueX = 18;
var speedBlueY = 18;
var move = true;
var ejex = true;

var COLLISION_BLUE_X = 50;
var COLLISION_BLUE_Y = 110
var COLLISION_YELLOW_X = 80;
var COLLISION_YELLOW_Y = 142;
var YellowX = 280;
var YellowY = 200;

var teclaIzquierda = 37;
var teclaAbajo = 38;
var teclaArriba = 40;
var teclaDerecha = 39;
var teclaEspacio = 32;
var teclaA = 65;
var teclaW = 87;
var teclaS = 83;
var teclaD = 68;
var teclaPulsada = null;
var tecla = [];

var ingAni = 0;
var ingAni2 = 0;
var player_array = new Array();
//var player_arrayRed = new Array();

//Variables de imagenes
var imgBandera;
var imgCampoSoccer;

function cargaImagenes(){
    imgBandera = new Image();
    imgCampoSoccer = new Image();
    
    imgBandera.src = "img/sagi 02.jpg";
    imgCampoSoccer.src = "img/campo.jpg";
}

cargaImagenes();

function dibujaBandera(){
    var posX = 20;
    var posY = 10;
    var anchoBandera = 80;
    var altoBandera = 50;
    ctx.drawImage(imgBandera,posX,posY,anchoBandera,altoBandera);
}

function dibujaCampoSoccer(){
    let posX = 0;
    let posY = 0;
    let ancho = 600;
    let alto = 400;
    ctx.drawImage(imgCampoSoccer,posX,posY,ancho,alto);
}

function dibujaFondo() {
    //El fondo verde es dibujado  en la hoja de estilos.css
    
    var anchoLinea = 5;
    var medioCampoHor = ancho/2;
    var medioCampoVer = alto/2;
    var anchoArcoI = 60;
    var anchoArcoD = ancho - 60;
    
    ctx.fillStyle = "#ffffff";
    //Lineas horizontales
    ctx.fillRect(10,10,ancho - 20,anchoLinea);//Izquierda
    ctx.fillRect(10,alto - 15,ancho - 20,anchoLinea);//Derecha

    //Lineas verticales
    ctx.fillRect(10,10,anchoLinea,alto - 20);//izquierda
    ctx.fillRect(medioCampoHor,10,anchoLinea,alto - 20);//centro
    ctx.fillRect(ancho - 15,10,anchoLinea,alto - 20);//derecha

//prueba
	//ctx.fillStyle = "#ff00ff";
	//ctx.stroke()
	//ctx.strokeRect(0,0,ancho - 50,alto)
    //ctx.fillRect(0,0,ancho,alto);//Izquierda
	/*
    //Lineas de prueba
    //Diagonal
    ctx.moveTo(medioCampoR, 10);
    ctx.lineTo(585, 285);
    //Del punto medio hacia la derecha
    ctx.moveTo(medioCampoR,canvasRequest.height/2);
    ctx.lineTo(550, canvasRequest.height/2);
    //Del punto medio hacia la izquierda
    ctx.moveTo(medioCampoR,canvasRequest.height/2);
    ctx.lineTo(50, canvasRequest.height/2);

    ctx.strokeStyle = "#30ff30";//color de linea
	ctx.stroke();
	*/

    //Circulo centro de campo
    ctx.beginPath();
    ctx.arc(ancho/2, alto/2, 30, 0, 2 * Math.PI);
    ctx.strokeStyle = "#ffffff";//color de linea
	ctx.stroke();
	

    //TEST LINES
    //ctx.beginPath();
    /*
    ctx.moveTo(10, 60);
    ctx.lineTo(40, 60);
    ctx.moveTo(40, 60);
    ctx.lineTo(40, 140);
    ctx.moveTo(40, 140);
    ctx.lineTo(10, 140);
    ctx.strokeStyle = "white";
    ctx.stroke();
    */
    
    //ARCOS DERECHO E IZQUIERDO
    /*A partir de aqui se dibuja los arcos donde entrara el balon para hacer puntos.
    Se usan 3 lineas para cada arco (Desde - Hasta)
    */
    //Izquierda
    //ctx.beginPath();
    ctx.moveTo(10, medioCampoVer - 50);//Desde punto X Y
    ctx.lineTo(anchoArcoI, medioCampoVer - 50);//Hasta punto X Y
    
    ctx.moveTo(anchoArcoI, medioCampoVer - 50);//Desde punto X Y
    ctx.lineTo(anchoArcoI, medioCampoVer + 50);//Hasta punto X Y
    
    ctx.moveTo(anchoArcoI, medioCampoVer + 50);//Desde punto X Y
    ctx.lineTo(10, medioCampoVer + 50);//Hasta punto X Y
    ctx.strokeStyle = "white";
    ctx.stroke();
    
    //Derecho
    //ctx.beginPath();
    ctx.moveTo(ancho - 10, medioCampoVer - 50);//Desde punto X Y
    ctx.lineTo(anchoArcoD, medioCampoVer - 50);//Hasta punto X Y
    
    ctx.moveTo(anchoArcoD, medioCampoVer - 50);//Desde punto X Y
    ctx.lineTo(anchoArcoD, medioCampoVer + 50);//Hasta punto X Y
    
    ctx.moveTo(anchoArcoD, medioCampoVer + 50);//Desde punto X Y
    ctx.lineTo(ancho - 10, medioCampoVer + 50);//Hasta punto X Y
    ctx.strokeStyle = "white";
    ctx.stroke();
    
}

//BALON
function dibujaBalon() {
    ctx.fillStyle = "#f3f7f6";
    ctx.fillRect(posHor, posVer, 20, 20);
    
    //Mueve balon
    //colision horizontal
    if(posHor > ancho){
        velocidadH = -1;
	}else if(posHor < 0){velocidadH = 1}
	//Colision vertical
	if(posVer > alto){
        velocidadV = -1;
    }else if(posVer < 0){velocidadV = 1}
	
    //move
	posHor = posHor + velocidadH;
    posVer = posVer + velocidadV;
}
//---------------------------------------------------------------------------------
//OBJETO PLAYER
function Player(posX, posY, tamano, color) {
	this.posX = posX;
	this.posY = posY;
	this.tamano = tamano;
	this.color = color;

	//this.dibuja = function () {
	ctx.save();
	ctx.fillStyle = this.color;
	ctx.fillRect(this.posX, this.posY, this.tamano, this.tamano);
	//this.posY = this.posY + 10;
	ctx.restore();
	//};
	
}

//----------------------------------------------------------------------------
function Test(posx, posy, tamano, color) {
	this.x = posx;
	this.y = posy;
	this.tamano = tamano;
	this.color = color;

	this.dibuja = function () {
        ctx.save();
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.tamano, this.tamano);
        //this.posY = this.posY + 10;
        ctx.restore();
	};

	this.move = function () {
		if (tecla[teclaDerecha]) this.x += testMoveSpeed;
		if (tecla[teclaIzquierda]) this.x -= testMoveSpeed;
		if (tecla[teclaArriba]) this.y += testMoveSpeed;
		if (tecla[teclaAbajo]) this.y -= testMoveSpeed;
	};


}

//Esta funcion esta siendo llamada en la funcion animation
function moveTest() {
    //Limites de movimiento
	if( testX > canvas.width - sizeTest) {
        testX = canvas.width - sizeTest;
    }else
    if( testX < 0) {
        testX = 0;
    }else
    if( testY > canvas.height - sizeTest) {
        testY = canvas.height - sizeTest;
    }else
    if( testY < 0) {testY = 0;}
    
	//Movimiento
    if (tecla[teclaDerecha]) testX += testMoveSpeed;
    if (tecla[teclaIzquierda]) testX -= testMoveSpeed;
    if (tecla[teclaArriba]) testY += testMoveSpeed;
    if (tecla[teclaAbajo]) testY -= testMoveSpeed;
	
}

//Nueva objeto de test
var test = new Test(testX ,testY , 30,"black");
//console.log(player);
//--------------------------------------------------------------------------------

//EQUIPO DE PLAYER
function equipoBluePlayer() {
	for (var i = 0; i < 3; i++) {//filas
		for (var j = 0; j < 2; j++) {//columnas
			player_array.push(new Player(X + 30 * j, Y + 45 * i, DIAMETER, "blue"));
		}
	}
}

function equipoRedPlayer() {
	for (var i = 0; i < 3; i++) {//filas
		for (var j = 0; j < 2; j++) {//columnas
			player_array.push(new Player(410 + 40 * j, 30 + 50 * i, DIAMETER, "red"));
		}		
	}
}


//EQUIPO TEST
//Creamos un equipo usando function test
//Para el movimniento se podria usar test.move()
//aunque en este momento se esta usando la function moveTest()
// que es llamado en  la function animation
function equipoTest() {//Enviamos directo a la funcion animation
	
	for (var i = 0; i < 5; i++) {//filas
		for (var j = 0; j < 3; j++) {//columnas
			var test = new Test(YellowX + 30 * j, YellowY  + 30* i, sizeTest, "yellow");
			//test.move();
			test.dibuja();
		}		
	}
			
}


//-----------------------------------------------------------------------------------------------
//------------------------COLLISION TEAMS--------------------------------------------
//PLAYER COLLISION TEAM BLUE
//Se esta usando como imagen de collision para equipoBluePlayer
function collisionBlue() {
    ctx.fillStyle = "#526af290";//se usa transparencia
	ctx.fillRect(X, Y, COLLISION_BLUE_X, COLLISION_BLUE_Y);
    
}

function moveTeamBlue() {

	//Limites de movimiento
	if( X > canvas.width - COLLISION_BLUE_X) {X = canvas.width - COLLISION_BLUE_X;}else
    if( X < 0) {X = 0;}else
    if( Y > canvas.height - COLLISION_BLUE_Y) {Y = canvas.height - COLLISION_BLUE_Y;}else
    if( Y < 0) {Y = 0;}
    
    

    //move
	//X = X + moveX;
	//Y = Y + moveY;
	if (tecla[teclaDerecha]) X += speedBlueX; else
	if (tecla[teclaIzquierda]) X -= speedBlueX; else
	if (tecla[teclaArriba]) Y += speedBlueY; else
	if (tecla[teclaAbajo]) Y -= speedBlueY;
    
    //////////////////////////////////////////////////////////////////////////////
    ////////////////////REVISAR///////////////////////////////////////////////
    if(X + COLLISION_BLUE_X > YellowX && X < YellowX + COLLISION_YELLOW_X){
        //if( Y + COLLISION_BLUE_Y >= YellowY){Y = YellowY - COLLISION_BLUE_Y;}
        //if(Y <= YellowY + COLLISION_YELLOW_Y ){Y = YellowY + COLLISION_YELLOW_Y;}
        
    }
    if( Y + COLLISION_BLUE_Y >= YellowY){Y = YellowY - COLLISION_BLUE_Y;}else
    if(Y <= YellowY + COLLISION_YELLOW_Y ){Y = YellowY + COLLISION_YELLOW_Y;}else
    if( X + COLLISION_BLUE_X >= YellowX){ X = YellowX - COLLISION_BLUE_X;}else
    if( X <= YellowX + COLLISION_YELLOW_X){ X = YellowX + COLLISION_YELLOW_X;}
    
    //if(X + COLLISION_BLUE_X > YellowX && X < YellowX + COLLISION_YELLOW_X){
        //if(Y < YellowY + COLLISION_YELLOW_Y ){
           // Y = YellowY + COLLISION_YELLOW_Y;
        //}
            
    //}
    
    /*
    if( Y + COLLISION_BLUE_Y > YellowY && Y < YellowY + COLLISION_YELLOW_Y){
        if(X + COLLISION_BLUE_X >  YellowX ){X = YellowX - COLLISION_BLUE_X;}//else
        //if(X < YellowX + COLLISION_YELLOW_X){ X = YellowX + COLLISION_YELLOW_X}
    }
    */
	///////////////////////////////////////////////////////////////////////////////////
	//Verifica cañon
	//if (x > canvas.width - 20) x = canvas.width - 20;
	//if (x < 0) x = 0;
	//Disparo
	if (tecla[teclaEspacio]) {
		console.log("tecla espacio pulsada");
		/*
		if (tiempoBala == true && municion !=0 ){
			tiempoBala = false;
			balas_array.push(new Bala(nave.x + 12, nave.y - 3, 5));
			(municion >0)?municion = municion - 1 : false;
			tecla[teclaEspacio] = false;
			disparaEnemigo();
			setTimeout(function(){tiempoBala = true;}, 300);
		}
		*/
	}
	
}

//PLAYER COLLISION TEAM YELLOW
//Se esta usando como imagen de collision para equipoYellowPlayer
function collisionYellow() {
    ctx.fillStyle = "#c4f42390";//se usa transparencia
	ctx.fillRect(YellowX, YellowY, COLLISION_YELLOW_X, COLLISION_YELLOW_Y);
    
}

function moveTeamYellow() {

	//Limites de movimiento
	if( YellowX > canvas.width - COLLISION_YELLOW_X) {YellowX = canvas.width - COLLISION_YELLOW_X;}else
    if( YellowX < 0) {YellowX = 0;}else
    if( YellowY > canvas.height - COLLISION_YELLOW_Y) {YellowY = canvas.height - COLLISION_YELLOW_Y;}else
    if( YellowY < 0) {YellowY = 0;}

    //move
	//X = X + moveX;
	//Y = Y + moveY;
	if (tecla[teclaD]) YellowX += speed; else
	if (tecla[teclaA]) YellowX -= speed; else
	if (tecla[teclaS]) YellowY += speed; else
	if (tecla[teclaW]) YellowY -= speed;
	
	//Disparo
	if (tecla[teclaEspacio]) {
		console.log("tecla espacio pulsada");
		/*
		if (tiempoBala == true && municion !=0 ){
			tiempoBala = false;
			balas_array.push(new Bala(nave.x + 12, nave.y - 3, 5));
			(municion >0)?municion = municion - 1 : false;
			tecla[teclaEspacio] = false;
			disparaEnemigo();
			setTimeout(function(){tiempoBala = true;}, 300);
		}
		*/
	}
	
}
//--------------------------------------------------------------------------------------------------

document.addEventListener("keydown", function(e){
	teclaPulsada = e.keyCode;
	tecla[e.keyCode] = true;
    console.log(teclaPulsada)
	/*
	var cod = e.keyCode;
	if(move){
			
		if(cod == 38){
			moveY = -1;
			//xdir = 0;
			//ejex = false;
			//ejey = true;
			//move = true;
		}
		if(cod == 40){
			moveY = 1;
			//xdir = 0;
			//ejex = false;
			//ejey = true;
		}
			
	}

	if(move){
		if(cod == 37){
			//ydir = 0;
			moveX = -1;
			//ejey = false;
			//ejex = true;
		}
		if(cod == 39){
			//ydir = 0;
			moveX = 1;
			//ejey = false;
			//ejex = true;
		}
	}
    
 */   
});
document.addEventListener("keyup", function (e) {
	tecla[e.keyCode] = false;
	//moveX = 0; moveY = 0;
});


function puntuacion() {
	ctx.font = "30px Arial";
	ctx.fillStyle = "#ffffff";
	ctx.fillText("TEXTO" ,20,60);

	ctx.font = "30px Comic Sans MS";
	ctx.fillText("Hello World", 200, 50);
}


function borraCanvas() {
    ctx.clearRect(0,0, ancho, alto);
}


function animation(){
    borraCanvas();
    //cargaImagenes();
    dibujaBandera();
    //dibujaFondo();
    dibujaCampoSoccer();
	dibujaBalon();
	test.dibuja();
	//test.move();
    
    //Este es para el movimiento de cuadrados amarillos
    //Es usado por la function test
	moveTest();
    
    //Collision para equipo blue
	collisionBlue();
	moveTeamBlue();
    //Collision para equipo yellow
    collisionYellow();
    moveTeamYellow();
    
    
	//player2();
	puntuacion();
	//player.dibuja();//Rectangulo de prueba
	equipoBluePlayer();//Funcion de prueba
	equipoRedPlayer();//Funcion de prueba
	equipoTest();
    
    
    requestAnimationFrame(animation);
}

animation();
