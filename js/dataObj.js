 var dataObj = function(){
 	this.totalScore = 0;
 	this.popNum = 0;
 	this.score = 0;
 	this.gameOver = false;
 }

dataObj.prototype.update = function(popNum){ 
	this.popNum = popNum;
	this.score = 5*Math.pow(2, popNum);
	this.totalScore += this.score;
}


dataObj.prototype.draw = function(){ 
	context.fillStyle = 'white';
	context.font = "30px Arial";
	context.fillText("SCORE: " + this.totalScore, canWidth*0.35, 60);
	context.font = "20px Arial";
	context.fillText("消除个数: " + this.popNum, canWidth*0.4, 90);
	context.fillText("消除分数: " + this.score, canWidth*0.4, 120);
}
