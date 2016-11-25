function toggleCanvas(){
	if(renderCanvas.style.display=='inline-block'){
		console.log("zdaj bo animation aktiven");
	renderCanvas.style.display='none';
    animationCanvas.style.display='inline-block'; 
  }else{
  	console.log("zdaj bo render aktiven");
    animationCanvas.style.display='none';
    renderCanvas.style.display='inline-block';
  }
}

function changeStage(){
	stage++;
	toggleCanvas();

	var stageBreakImage = new Image();
		stageBreakImage.src = "animation/stage_break.jpg";
		stageBreakImage.onload = function() {
			animationCanvasContext.drawImage(stageBreakImage,0,0,animationCanvas.width, animationCanvas.height);
			animationCanvasContext.font = "50px Copperplate gothic";
			animationCanvasContext.textAlign = "center";
			animationCanvasContext.fillStyle = "white";//"#3a6eff";
			animationCanvasContext.fillText("Stage cleared. Bitch.",(animationCanvas.width/2 -10),animationCanvas.height/3);
		}
	/*animationCanvasContext.font = "50px Copperplate gothic";
	animationCanvasContext.textAlign = "center";
	animationCanvasContext.fillStyle = "red";
	animationCanvasContext.fillText("Stage cleared. Bitch.",(animationCanvas.width/2 -10),animationCanvas.height/3);*/
	setTimeout(function(){
						 toggleCanvas();
						 animationCanvasContext.clearRect(0, 0, animationCanvas.width, animationCanvas.height);
						 startGame();
						 }, 3100);
}

function startScreen(){
	var landingImage = document.getElementById("landingImage");
	landingImage.onload = function() {
		animationCanvasContext.drawImage(landingImage,0,0,animationCanvas.width, animationCanvas.height);
		animationCanvasContext.font = "20px Copperplate gothic";
		animationCanvasContext.textAlign = "center";
		animationCanvasContext.fillStyle = "red";
		animationCanvasContext.fillText("Click anywhere to start.",(animationCanvas.width/2 -10),20);
	}

    animationCanvas.addEventListener("click", function(event) {
		if (BABYLON.Engine.isSupported()) {
   			toggleCanvas();
   			animationCanvasContext.clearRect(0, 0, animationCanvas.width, animationCanvas.height);
   			stage = 1;
   			console.log("stage: " + stage);
			startGame();
		}
    }, false);
}

function gameOver(){
	toggleCanvas();

	var endImage = new Image();
		endImage.src = "animation/stage_break.jpg";
		endImage.onload = function() {
			animationCanvasContext.drawImage(endImage,0,0,animationCanvas.width, animationCanvas.height);
			animationCanvasContext.font = "50px Copperplate gothic";
			animationCanvasContext.textAlign = "center";
			animationCanvasContext.fillStyle = "white";//"#3a6eff";
			animationCanvasContext.fillText("Shit bitch, you suck.",(animationCanvas.width/2 -10),animationCanvas.height/3);

			animationCanvasContext.font = "20px Copperplate gothic";
			animationCanvasContext.fillText("Click anywhere to retry.",(animationCanvas.width/2 -10),2*animationCanvas.height/3);
		}
	//var endImage = document.getElementById("endImage");
}