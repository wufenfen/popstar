function drawBackground(){
	var bgImg = new Image();
	bgImg.src = 'style/img/bg_main.png'; 
	bgImg.onload = function(){
		context.drawImage(bgImg,0,0,canWidth,canHeight);
	}
}

function drawUI1(x, y,width,height){
	var img = new Image();
	img.src = 'style/img/ui1.png'; 
	img.onload = function(){
		context.drawImage(img,x, y,width,height);
	}
}

function drawUI2(x, y,width,height){
	var img = new Image();
	img.src = 'style/img/ui2.png'; 
	img.onload = function(){
		context.drawImage(img,x, y,width,height);
	}
}

function drawUI3(x, y,width,height){
	var img = new Image();
	img.src = 'style/img/ui3.png'; 
	img.onload = function(){
		context.drawImage(img,x, y,width,height);
	}
}