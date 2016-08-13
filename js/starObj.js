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
				context.drawImage( this.starType[starNo], 50*(i), canHeight-85-50*(j+1), 50,50);
			}
		}
	}


}

