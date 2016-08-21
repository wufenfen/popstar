var chessObj = function(){
	chessboard = [];  // 0-9 0-9 from left down  
}

chessObj.prototype.init = function(){
	colNum = 10;
	for(var i=0; i< colNum; i++){
		chessboard[i] = mathRandom(10); 
	}
}

//when click the x y, the same type star around will disappear too
chessObj.prototype.click = function(x, y){
	if( !isValid(x, y) ){
		return;
	}
	var disappearSet = [];
	var disabledSet = []; //record position which has been tracked
	var starNo = chessboard[x][y]; 
	popStar(disappearSet, [], disabledSet, x, y, starNo);
	var popStarNumber = disappearSet.length;
	if(popStarNumber>1){ //at least two stars 
		playSound('broken.mp3');
		data.update( disappearSet.length );
		disappearSet.forEach(function(item){
			var sx = item[0];
			var sy = item[1];
			chessboard[sx][sy] = -1;
		})
	} 
	// show the encourage tips
	if(popStarNumber>=8){
		playSound('fire.mp3');
	}
	if(popStarNumber>30){
		data.popEncourType = 4;
	}
	else if(popStarNumber>25){
		data.popEncourType = 3;
	}
	else if(popStarNumber>20){
		data.popEncourType = 2;

	}
	else if(popStarNumber>15){
		data.popEncourType = 1;
	}
	else if(popStarNumber>=8){
		data.popEncourType = 0;
	}

	this.update(); 
	setTimeout(this.isGameOver,500);
}

chessObj.prototype.isGameOver = function(){
	var disappearSet;
	var count=0; //the rest star, the less, the more bonus
	for(var i=0; i<colNum; i++){ 
		for(j=0; j<10; j++) {
			disappearSet = []; 
			if (isValid(i, j)) {
				count++;
				popStar(disappearSet, [], [], i, j, chessboard[i][j]);
				if(disappearSet.length>1){
					data.gameOver = false;
					return;
				}
			}
		}
	}
	data.leftStar = count;
	if(count<10){ 
		data.bonus = 2000-count*count*20;
		data.totalScore += data.bonus;
	}
	else{
		data.bonus = 0; 
	}
	if( !data.clearStage && data.totalScore >= data.targetScore){
		data.clearStage = true;
		playSound('stageclear.mp3');
	}
	if( data.clearStage ){
		playSound('win.mp3');
		data.pass = true; //pass this level to the next level
		data.level++; 
		data.targetScore = 1000 + 3000*(data.level-1);//the target score rule
		setTimeout(function(){ 
			chess.init();
			data.reset();
		},4000);
	}
	else{
		data.gameOver = true;  // game over  
		playSound('gameover.mp3');
	}
}

//when some star disappears, the rest reshape.
chessObj.prototype.update = function(){ 
 
	var gap;
	// for every column
	dropData = {}; 
	for(var i=0; i<colNum; i++){ 
		//{17:6} means the star drop from (1,7) to (1,6)
		gap = 0;
		for(j=0; j<10; j++){
			if(chessboard[i][j] == undefined){
				continue;
			}
			// the disappeard star
			if(chessboard[i][j] == -1){
				gap++; 
			 	// if the next one is still disappear
				if(j<9 && chessboard[i][j+1] == -1){
					continue; 
				}
			}
			else { //the star need to drop
				if( gap>0 ){
					var key = 10*i+j;
					dropData[key] = j-gap;
				} 
			} 
		} 
	} 
	//{1,2} means stars move from column 2 to 1 coz 1 is empty
	mergeData = {};
 	gap = 0;
	for(i=0; i<colNum; i++){
		//if the colomn is empty, merge 
		if( isEmpty(chessboard[i]) ){
			gap++;
			if(i<colNum-1 && isEmpty(chessboard[i+1]))
			{
				continue;
			}
		}
		else{
			if(gap>0){
				mergeData[i] = i-gap;
			}
		}
	}   
}
 
function popStar(disappearSet, p, disabledSet, x, y, starNo){
	if( starNo==-1 ){
		return;
	}
	if(disappearSet.length == 0){
		disappearSet.push([x,y]);
	}
	else {
		disappearSet.forEach(function(item){
			if(isNeighbor(x,y,item[0], item[1])){
				disappearSet.push([x,y]);
				return;
			}
		})
	}

	disabledSet.push(10*x+y);
	if(isValid(x+1, y) && chessboard[x+1][y] == starNo){
		p.push([x+1,y]);
	}
	if(isValid(x-1, y) &&chessboard[x-1][y] == starNo){
		p.push([x-1,y]);
	}
	if(isValid(x, y+1) &&chessboard[x][y+1] == starNo){
		p.push([x,y+1]);
	}
	if(isValid(x, y-1) &&chessboard[x][y-1] == starNo){
		p.push([x,y-1]);
	}
	// range first search  
	for(var i=0; i<p.length; i++){
		if( disabledSet.indexOf(10*p[i][0]+p[i][1]) < 0){
			popStar(disappearSet, p, disabledSet, p[i][0], p[i][1], starNo);
		}
	}
}

//generate random number from 0 to 4
function mathRandom( n ){
	var x = [];
	for(var i=0; i<n; i++){
		x[i] = Math.floor(Math.random()*5);
	}
	return x;
}

//two points is neighbor or not
function isNeighbor(x1,y1,x2,y2){
	if(Math.abs(x1-x2) + Math.abs(y1-y2) == 1){
		return true;
	}
	return false;
}

//the point is in the valid region 
function isValid(x, y){
	if(!chessboard[x] || chessboard[x][y] == undefined){
		return false; 
	}

	if( chessboard[x][y] == -1){
		return false;
	} 

	if(x<0 || x>colNum-1){
		return false;
	}

	if(y<0 || y>9){
		return false;
	} 
	return true;
}

function isEmpty(arr){
	for (var i = 0; i < arr.length; i++) {
		if( arr[i] !== undefined &&  arr[i] !==  -1){
			return false;
		}
	}

	return true;
}