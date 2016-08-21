var starObj = function(){
	this.starType = [];
	this.height = {};
	this.width = {};
	this.isDropOver = true;
}

starObj.prototype.init = function(){
	for(var i=0; i<5; i++){
		var unit = new Image();
		unit.src = 'style/img/star_' + i + '.png';
		this.starType[i] = unit;
	}
	for(var i=0; i<colNum; i++){
		this.width[i] = 0; //merge x axis
		for(var  j=0; j<10; j++){
			this.height[10*i+j] = 0; //drop height
		}
	}
}

starObj.prototype.draw = function(){
	//dropData = {9: 8,8:7};
	this.isDropOver = true;

	for(var i=0; i<colNum; i++){
	//	var newXAxis = mergeData[i];
	//	if(mergeData[i]){
			for(var  j=0; j<10; j++){
				var starNo = chessboard[i][j];
				if(starNo>=0 && starNo<5){
					//if star i,j is about to drap
					var newYAxis = dropData[10*i+j];
					if (newYAxis != undefined) { 
						this.isDropOver = false;
						var y1 = j-0.1*(++this.height[10*i+j]);  
						//drop slowly
						if(y1 !== newYAxis){
							context.drawImage( this.starType[starNo], 50*(i), canHeight-85-50*(y1+1), 50,50);
						}
						// if the star arrive the destination
						else{
							context.drawImage( this.starType[starNo], 50*(i), canHeight-85-50*(newYAxis+1), 50,50);
							//switch the starNo
							var tem = chessboard[i][j];
							chessboard[i][j] = -1;
							chessboard[i][newYAxis] = tem;
							this.height[10*i+j] = 0;
							//make sure the new star which arrive the position do not drop again
							dropData[10*i+j] = null;
						}
					 }
					 else{
					 	context.drawImage( this.starType[starNo], 50*(i), canHeight-85-50*(j+1), 50,50);
					 }
				}
			}
	//	}  
	}
 
	if(this.isDropOver){
		for(var i=0; i<colNum; i++){
			var newXAxis = mergeData[i];
			if(newXAxis != undefined){
				var x1 = i-0.25*(++this.width[i]);  
				for(var  j=0; j<10; j++){
					var starNo = chessboard[i][j];
					if(starNo>=0 && starNo<5){
						if(x1 !== newXAxis){
							context.drawImage( this.starType[starNo], 50*(x1), canHeight-85-50*(j+1), 50,50);
						}
						else{
							context.drawImage( this.starType[starNo], 50*(newXAxis), canHeight-85-50*(j+1), 50,50);
							//switch the starNo
							var tem = chessboard[i][j];
							chessboard[i][j] = -1;
							chessboard[newXAxis][j] = tem;
							this.width[i] = 0;
							//make sure the new star which arrive the position do not drop again
							mergeData[i] = null;
						}  
					}
				}
			}   
		}
	}
}