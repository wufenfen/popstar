var starObj = function(){
	this.starType = [];
}

starObj.prototype.init = function(){
	for(var i=0; i<5; i++){
		var unit = new Image();
		unit.src = 'style/img/star_' + i + '.png';
		this.starType[i] = unit;
	}
}

starObj.prototype.draw = function(){
	for(var i=0; i<colNum; i++){
		for(var  j=0; j<10; j++){
			var starNo = chessboard[i][j];
			if(starNo>=0 && starNo<5){
				// var data = dropData[10*i+j];
				// if (data) { 
				// 	var y1 = j-0.1; 
				// 	if(y1 !== j){
				// 		context.drawImage( this.starType[starNo], 50*(i), canHeight-85-50*(y1+1), 50,50);
				// 	}
				// 	else{
				// 		context.drawImage( this.starType[starNo], 50*(i), canHeight-85-50*(data[1]+1), 50,50);
				// 		var tem = chessboard[i][j]
				// 		chessboard[i][j] = -1;
				// 		chessboard[i][data[1]] = tem;
				// 	}
				// }
				// else{
				 	context.drawImage( this.starType[starNo], 50*(i), canHeight-85-50*(j+1), 50,50);
				// }
			}
		}
	}
}

// // data is an array, the element is made of three number,i j k
// // which represents the star drop from [i,k] to [i,j]
// starObj.prototype.drop = function( data ){
// 	for (var i = 0; i < data.length; i++) {
// 		var x = data[i][0];
// 		var y1 = data[i][1];
// 		var y2 = data[i][2];

// 		context.drawImage( this.starType[starNo], 50*(x), canHeight-85-50*(y2+1), 50,50);

// 	};
// }
// 