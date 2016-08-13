function drawBackground(){
	var bgImg = new Image();
	bgImg.src = 'style/img/bg_main.png'; 
	bgImg.onload = function(){
		context.drawImage(bgImg,0,0,canWidth,canHeight);
	}
}