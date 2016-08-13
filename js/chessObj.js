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
	//console.log(disappearSet.length);
	if(disappearSet.length>1){ //at least two stars 
		data.update( disappearSet.length );
		disappearSet.forEach(function(item){
			var sx = item[0];
			var sy = item[1];
			chessboard[sx][sy] = -1;
		})
	}
	
	this.update();
}
//when some star disappears, the rest reshape.
chessObj.prototype.update = function(){
	var temp = [];
	for(var i=0; i<colNum; i++){
		temp = []; 
		for(j=0; j<10; j++){
			if(chessboard[i][j] != -1){
				temp.push(chessboard[i][j]);
			}
		}
		chessboard[i] = temp;
	}

	temp = [];	
	for(i=0; i<colNum; i++){
		//if the colomn is empty, merge 
		if( !isEmpty(chessboard[i]) ){
			temp.push(chessboard[i]);
		}
	} 
	chessboard = temp;
	colNum = temp.length;
}

function popStar(disappearSet, p, disabledSet, x, y, starNo){
	if(disappearSet.length == 0){
		disappearSet.push([x,y]);
	}
	else if(chessboard[x][y] == starNo){
		disappearSet.forEach(function(item){
			if(isNeighbor(x,y,item[0], item[1])){
				disappearSet.push([x,y]);
			}
		})
	}

	disabledSet.push(10*x+y);
	p.push([x+1,y]);
	p.push([x-1,y]);
	p.push([x,y+1]);
	p.push([x,y-1]);
	// range first search  
	for(var i=0; i<p.length; i++){
		if( disabledSet.indexOf(10*p[i][0]+p[i][1]) < 0 && isValid(p[i][0], p[i][1])){
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
		if( arr[i] ){
			return false;
		}
	};

	return true;
}