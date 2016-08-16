window.onload = playGame;

var canvas;
var context;
var canWidth,canHeight;
var star;
var mx,my; // the position of mouse when click
var chessboard, chess;
var colNum; // the valid column number 
var dropData; //record the stars which will be drop 
var data; //record the data in the game
var resetBtn;

function playGame(){
	init();	
	gameLoop();
}

function init(){
	canHeight = 900;
	canWidth = 500;
	mx = 0;
	my = 0;
	canvas = document.getElementById('popstar');
	context = canvas.getContext('2d');
	canvas.addEventListener('click',onMouseClick);
	resetBtn = document.getElementById('reset');
	dropData = []; 

	data = new dataObj(); 

	chess = new chessObj();
	chess.init();

	star = new starObj();
	star.init();
	
	resetBtn.onclick = function(){
		chess.init();
	}
}


function gameLoop(){
	window.requestAnimFrame(gameLoop);	
	drawBackground(); 
	star.draw();
	data.draw();
}


function onMouseClick(e){
	if(!data.gameOver){
		mx = e.offsetX;
		my = e.offsetY;
		var popX = Math.floor((mx)/50);
		var popY = Math.floor((canHeight-85-my)/50);
		chess.click(popX, popY);
	} 
}

 