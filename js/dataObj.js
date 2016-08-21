 var dataObj = function() {
     this.level = 1;
     this.totalScore = 0;
     this.targetScore = 1000;
     this.bonus = 0;
     this.popNum = 0; //the number of the stars that pop each time
     this.score = 0; // the score gained each time
     this.gameOver = false;
     this.clearStage = false; //if the score greater than the target score
     this.leftStar = 0; //the stars that left in each level  
     this.pass = false; // if pass this level
     this.alpha = 0; // for showing
     this.right = canWidth; //for text move from right to left
     this.count = 0; // count the time that text stay in the middle
     this.popEncourType = -1;
     this.increase = true;
     this.popEncourage = ['棒棒哒！', '帅呆了！', '不可思议！', '屌炸天了!', '你是地球来的吗？'];
 }

 dataObj.prototype.update = function(popNum) {
     this.popNum = popNum;
     this.score = 5 * popNum * popNum;
     this.totalScore += this.score;
 }

 dataObj.prototype.reset = function() {
     this.popNum = 0;
     this.score = 0;
     this.leftStar = 0; 
     this.clearStage = false;  
     this.pass = false;
     this.alpha = 0;
     this.right = canWidth;
     this.count = 0;
     this.gameOver = false;
     this.increase = true;
 }

 dataObj.prototype.draw = function() {
     context.fillStyle = 'white';
     context.font = "20px 微软雅黑";
     context.fillText("第 " + this.level + '关', 20, 30);
     context.font = "25px 微软雅黑";
     drawUI1(canWidth * 0.32, 10, 170, 45);
     context.fillText("目标: " + this.targetScore, canWidth * 0.35, 40);
     drawUI1(canWidth * 0.32, 55, 170, 45);
     context.fillText("得分: " + this.totalScore, canWidth * 0.35, 85);
     drawUI2(canWidth * 0.3, 105, 200, 38);
     context.font = "20px 微软雅黑";
     context.fillText('消除' + this.popNum + "个: " + this.score, canWidth * 0.35, 130);

     if (this.popEncourType !== -1) {
         if (this.increase) {
             if (this.alpha < 1) {
                 this.alpha += 0.02;
             } 
             else{ // count for the stay time 
                 this.count++;
                 if (this.count > 40 || this.count < 1) {
                     this.increase = false;
                     this.count = 0;
                 }
             }
         } else {
             this.alpha -= 0.01;
         }

         if (this.alpha < 0) {
             this.popEncourType = -1;
             this.increase = true;
         }
         context.fillStyle = "rgba(255,255,255," + this.alpha + ")";
         context.font = "30px 微软雅黑";
         context.fillText(this.popEncourage[this.popEncourType], canWidth * 0.35, canHeight * 0.3);
     }

     if (this.pass || this.gameOver) {
         if (this.alpha < 1) {
             this.alpha += 0.01;
         }
         context.fillStyle = "rgba(255,255,255," + this.alpha + ")";
         context.font = "30px 微软雅黑";
         context.fillText("剩余: " + this.leftStar, canWidth * 0.35, canHeight * 0.4);
         context.fillText("奖励: " + this.bonus, canWidth * 0.35, canHeight * 0.45);
     }

     if (this.pass) {
         if (this.right > -250) {
             if (this.right == canWidth - 7 * 52) {
                 this.count++;
             }
             // count for the stay time 
             if (this.count > 60 || this.count < 1) {
                 this.right -= 7;
                 this.count = 0;
             }
         }
         context.font = "30px 微软雅黑";
         context.fillText("第" + this.level + '关, 目标: ' + this.targetScore, this.right, canHeight * 0.5);
     }

     if (this.gameOver) {
         if (this.alpha < 1) {
             this.alpha += 0.01;
         }
         context.fillStyle = "rgba(255,255,255," + this.alpha + ")";
         context.font = "30px 微软雅黑";
         context.fillText("游戏结束: 总分为" + this.totalScore, canWidth * 0.2, canHeight * 0.5);
     }


 }
