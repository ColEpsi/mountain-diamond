var vidFinished = false;

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
	var stageChangeText = "Stage cleared!";

	var stageBreakImage = new Image();
		stageBreakImage.src = "animation/stage_break.jpg";
		stageBreakImage.onload = function() {
			if (stage == 5) stageChangeText = "YES! YOU WIN!";
			animationCanvasContext.drawImage(stageBreakImage,0,0,animationCanvas.width, animationCanvas.height);
			animationCanvasContext.font = "50px Copperplate gothic";
			animationCanvasContext.textAlign = "center";
			animationCanvasContext.fillStyle = "white";//"#3a6eff";
			animationCanvasContext.fillText(stageChangeText, (animationCanvas.width/2 -10),animationCanvas.height/3);
			}
			if(stage != 5){
				setTimeout(function(){
									 toggleCanvas();
									 animationCanvasContext.clearRect(0, 0, animationCanvas.width, animationCanvas.height);
									 startGame();
									 }, 1600);
			}
}

function startScreen(){
	//if(stage == 0) playIntroVideo();

	//if(vidFinished){
		var landingImage = document.getElementById("landingImage");
		landingImage.onload = function() {
			animationCanvasContext.drawImage(landingImage,0,0,animationCanvas.width, animationCanvas.height);
			animationCanvasContext.font = "20px Copperplate gothic";
			animationCanvasContext.textAlign = "center";
			animationCanvasContext.fillStyle = "white";
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
	//}
}

function gameOver(){
	toggleCanvas();

	var endImage = new Image();
		endImage.src = "animation/stage_break.jpg";
		endImage.onload = function() {
			animationCanvasContext.drawImage(endImage,0,0,animationCanvas.width, animationCanvas.height);
			animationCanvasContext.textAlign = "center";
			animationCanvasContext.fillStyle = "white";
			animationCanvasContext.font = "50px Copperplate gothic";
			animationCanvasContext.fillText("Game over.", (animationCanvas.width/2 -10), animationCanvas.height/3);

			animationCanvasContext.font = "32px Copperplate gothic";
			animationCanvasContext.fillText(gameOverTitles[Math.floor(randomNumber(0, gameOverTitles.length))], (animationCanvas.width/2 -10), animationCanvas.height*0.45);

			animationCanvasContext.font = "20px Copperplate gothic";
			animationCanvasContext.fillText("Click anywhere to retry.",(animationCanvas.width/2 -10),2*animationCanvas.height/3);
		}
}

var randomNumber = function (min, max) {
  if (min == max) {
              return (min);
          }
          var random = Math.random();
          return ((random * (max - min)) + min);
};

var gameOverTitles = [
					 "That was not good. It was bad, actually.",
					 "That was terrible.",
					 "That was pathetic.",
					 "That's all you got?",
					 "That was OK. If you are 11 months old.",
					 "Even my grandma is better than you.",
					 "Shameful.",
					 "Are you tired already?",
					 "Is it too hard for you?",
					 "No diamond for you.",
					 "Unlucky. Or maybe incompetent...",
					 "Poor. That's all I can say.",
					 "My instructions rate is 10€ per hour.",
					 "Try harder.",
					 "Definitely in the top 5 worst performances I've seen.",
					 "Are you going for the blooper reel?",
					 "This will be the opening to my next fail compilation.",
					 "This is clearly too hard for you. Would you prefer some Lego bricks instead?",
					 "I can do better blindfolded.",
					 "Maybe we should've just created an empty plane.",
					 "No skillz on you.",
					 "You have to AVOID the obstacles."
					 ];

function playIntroVideo(){
		//var videoIntro = document.getElementById("videoIntro");
		var videoIntro = new Image();
		videoIntro.src = "animation/intro2.mp4";
		//videoIntro.src = "animation/intro.mp4";
		console.log("video found " + videoIntro.src);

		videoIntro.onload = function(){
			videoIntro.onloadeddata = videoIntro.play;
			videoIntro.load();

			animationCanvasContext.drawImage(videoIntro,0,0,animationCanvas.width, animationCanvas.height);
			console.log("video played");
			animationCanvasContext.font = "20px Copperplate gothic";
			animationCanvasContext.textAlign = "center";
			animationCanvasContext.fillStyle = "red";
			animationCanvasContext.fillText("vid.",(animationCanvas.width/2 -10),200);
			vidFinished = true;
		}
		console.log("video kao done playing.");
}					 