 var dataObj = function() {
     this.level = 1;
     this.totalScore = 0;
     this.lastScore = 0; // the score get in the last level
     this.bonus = 0;
     this.popNum = 0; //the number of the stars that pop each time
     this.score = 0; // the score gained each time
     this.gameOver = false;
     this.leftStar = 0; //the stars that left in each level 
     this.getBonus = false; // if get bonus in each level
     this.pass = false; // if pass this level
     this.alpha = 0; // for showing
     this.right = canWidth; //for text move from right to left
     this.count = 0; // count the time that text stay in the middle
     this.popEncourType = -1;
     this.increase = true;
     this.popEncourage = ['棒棒哒！', '帅呆了！', '不可思议！', '屌炸天了!', '你是地球来的吗？'];
     this.bonusData = [2000, 1980, 1920, 1820, 1680, 1500, 1280, 1020, 720, 380, 0];
 }

 dataObj.prototype.update = function(popNum) {
     this.popNum = popNum;
     this.score = 5 * popNum * popNum;
     this.totalScore += this.score;
 }

 dataObj.prototype.reset = function() {
     this.leftStar = 0;
     this.getBonus = false;
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
     context.font = "30px 微软雅黑";
     context.fillText("目标: " + this.level * 3000, canWidth * 0.35, 40);
     context.fillText("得分: " + this.totalScore, canWidth * 0.35, 85);
     context.font = "20px 微软雅黑";
     context.fillText('消除' + this.popNum + "个: 得" + this.score + "分", canWidth * 0.35, 120);

     if (this.popEncourType !== -1) {
         if (this.increase) {
             if (this.alpha < 1) {
                 this.alpha += 0.02;
             } 
             else{ // count for the stay time 
                 this.count++;
                 if (this.count > 20 || this.count < 1) {
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

     if (this.getBonus) {
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
         context.fillText("第" + this.level + '关, 目标: ' + this.level * 3000, this.right, canHeight * 0.5);
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
