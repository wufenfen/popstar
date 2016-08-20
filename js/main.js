window.onload = playGame;

var canvas;
var context;
var canWidth,canHeight;
var star;
var mx,my; // the position of mouse when click
var chessboard,tmpChessboard, chess;
var colNum; // the valid column number 
var dropData; //record the stars which will be drop 
var data; //record the data in the game
var resetBtn;
var audio;

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
	audio = document.createElement('audio');

	dropData = {}; 
	data = new dataObj(); 

	chess = new chessObj();
	chess.init();

	star = new starObj();
	star.init();

	resetBtn.onclick = function(){
		playSound('restart.mp3');
		chess.init();
	 	data = new dataObj(); 
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

 function playSound(src){
 	audio.pause();
	audio.src = 'style/sound/' + src;
	setTimeout(function () {      
	   audio.play();
	}, 150);
 }


function controlVol(type){
	if(type == 'up'){
		var volume = audio.volume  + 0.1;
		if(volume >=1 ){
			volume = 1 ;
		}
		audio.volume =  volume;
	}else if(type == 'down'){
		var volume = audio.volume  - 0.1;
		if(volume <=0 ){
			volume = 0 ;
		}
		audio.volume =  volume;
	}
	document.getElementById('nowVol').innerHTML = 'Vol:' + returnFloat1(audio.volume);
}

function returnFloat1(value) {    
	value = Math.round(parseFloat(value) * 10) / 10;
	if (value.toString().indexOf(".") < 0){
		value = value.toString() + ".0";
	}
	return value;
}