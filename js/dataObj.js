 var dataObj = function(){
 	this.level = 1;
 	this.totalScore = 0;
 	this.lastScore = 0; // the score get in the last level
 	this.bonus = 0;
 	this.popNum = 0;
 	this.score = 0;
 	this.gameOver = false;
 	this.pass = false;
 	this.getBonus = false;
	this.alpha = 0; 
	this.right = canWidth;
 	this.bonusData = [2000,1980,1920,1820,1680,1500,1280,1020,720,380,0];
 }

dataObj.prototype.update = function(popNum){ 
	this.popNum = popNum;
	this.score = 5*popNum*popNum;
	this.totalScore += this.score; 
}

dataObj.prototype.reset = function(){
	this.alpha = 0; 
	this.right = canWidth;
	this.gameOver = false;
 	this.pass = false;
 	this.getBonus = false;
}

dataObj.prototype.draw = function(){ 
	context.fillStyle = 'white';
	context.font = "20px 微软雅黑";
	context.fillText("第 " + this.level + '关', 20, 30);
	context.font = "30px 微软雅黑";
	context.fillText("目标: " + this.level*3000, canWidth*0.35, 40);
	context.fillText("得分: " + this.totalScore, canWidth*0.35, 85);
	context.font = "20px 微软雅黑";
	context.fillText('消除' + this.popNum + "个: 得" + this.score + "分", canWidth*0.35, 120); 

	if(this.getBonus){
		if( this.alpha< 1){
	 		this.alpha += 0.01;
	 	}
		context.fillStyle = "rgba(255,255,255," + this.alpha + ")";
		context.font = "30px 微软雅黑";
		context.fillText("奖励: " + this.bonus, canWidth*0.3, canHeight*0.45);
	}

	if(this.pass){
		if( this.right>-200 ){
			this.right -= 4;
		} 
		context.font = "30px 微软雅黑";
		context.fillText("第" + this.level + '关, 目标: ' + this.level*3000, this.right, canHeight*0.5);
	}

	if (this.gameOver) { 
		if( this.alpha< 1){
	 		this.alpha += 0.01;
	 	}
		context.fillStyle = "rgba(255,255,255," + this.alpha + ")";
		context.font = "30px 微软雅黑";
		context.fillText("游戏结束: 总分为" + this.totalScore, canWidth*0.2, canHeight*0.5);
	} 


}
