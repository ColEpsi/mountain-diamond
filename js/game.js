// Get the canvas element from our HTML below
document.addEventListener("DOMContentLoaded", function () {
  var animationCanvas = document.getElementById("animationCanvas");
  animationCanvasContext = animationCanvas.getContext("2d");
  document.getElementById('animationCanvas').setAttribute('width', screen.availWidth);
  document.getElementById('animationCanvas').setAttribute('height', screen.availHeight);
  animationCanvas.style.display='inline-block';

  startScreen();

}, false);

var randomNumber = function (min, max) {
  if (min == max) {
              return (min);
          }
          var random = Math.random();
          return ((random * (max - min)) + min);
};

var engine;
var stage = 1;


function startGame(){
  renderCanvas.style.display='inline-block';
  var canvas = document.getElementById("renderCanvas");

  // Load the BABYLON 3D engine
  engine = new BABYLON.Engine(canvas, true);
  switch(stage){
  	case 1:
  		//global variables
  var dia, rock, snowPile, snowman, guard, mont; // MESHES
  var camera;
  var gunshot, nomercy, background;
  var trees = [];
  var rocks = [];
  var snowPiles = [];
  var snowmen = [];
  var guards = [];
  var slope = 10;
  var sides = [];
  var length = 5000, width = 500;
  var originalSpeed = 5;
  var speed = originalSpeed, steeringFactor = 1, steerCtr = 0; // variables for movement
  // OBSTACLE POSITIONS
  	// ROCKS
  	var rockPositionsX = [60, -30, -40, -80, -81, -85, -90, -102, 30, 38, 50, 200];
  	var rockPositionsZ = [2400, -2200, -2, -790, -900, -1300, -10, -1111, -1039, -2000, -1530, -1450];
	var rockCtr = 0;
	// SNOW PILES
  	var snowPilePositionsX = [200, -80, 0, 155, -5];
  	var snowPilePositionsZ = [-2000, -1300, 450, 1750, 2300];
	var snowPileCtr = 0;
  // TREES
  	var treePositionsX = [78, -50, 50, 150, 30, 100, -100, 60, -210, 217, -78, 30, -200, 0, 20];
  	var treePositionsZ = [-2000, -17590, -2100, 1592, -1345, -1001, -800, 300, 120, 1590, 2000, -950, -900, -925];
  	var treeCtr = 0;
	// SNOWMEN
  	var snowmanPositionsX = [];
  	var snowmanPositionsZ = [];
  	var snowmanCtr = 0;
	// GUARDS
  	var guardPositionsX = [200, 100, -150, 20, -150, 0, 150];
  	var guardPositionsZ = [-2450, -2450, -2450, -2450, -1700, -1700, -1700];
  	var guardCtr = 0;

  	break;

  	case 2:
  		//console.log("switch = 2");
  		//global variables
  var dia, rock, snowPile, snowman, guard, mont; // MESHES
  var camera;
  var gunshot, nomercy, background; //sounds
  var trees = [];
  var rocks = [];
  var snowPiles = [];
  var snowmen = [];
  var guards = [];
  var sides = [];
  var slope = 10;
  var length = 5000, width = 500;
  var originalSpeed = 5;
  var speed = originalSpeed, steeringFactor = 1, steerCtr = 0; // variables for movement
  // OBSTACLE POSITIONS
  	// ROCKS
  	var rockPositionsX = [-50,0,50];
  	var rockPositionsZ = [-2000,-2000,-2000];
	var rockCtr = 0;
	// SNOW PILES
  	var snowPilePositionsX = [175, 20, -50, -155, 250];
  	var snowPilePositionsZ = [-2000, -1120, 50, 700, 1200];
	var snowPileCtr = 0;
  // TREES
  	var treePositionsX = [0, -50, 50, 150, 30, 100, -100, 60, -210, 217, 0, 30];
  	var treePositionsZ = [-2100, -2100, -2100, -1500, -1345, -1001, -800, 300, 120, 1590, 2000];
  	var treeCtr = 0;
	// SNOWMEN
  	var snowmanPositionsX = [];
  	var snowmanPositionsZ = [];
  	var snowmanCtr = 0;
	// GUARDS
  	var guardPositionsX = [-150, 0, 150, 300, -150, 0, 150];
  	var guardPositionsZ = [-2450, -2450, -2450, -2450, -1700, -1700, -1700];
  	var guardCtr = 0;
  	break;
  }


  // -------------------------------------------------------------
  // Here begins a function that we will 'call' just after it's built
  
//------------------------------------------------------------------------------------

  var createScene = function() {
    // scene objekt
    var scene = new BABYLON.Scene(engine);
    scene.enablePhysics();
    //scene.collisionsEnabled = true;
  //  scene.debugLayer.show(true, camera);
    scene.fogMode = BABYLON.Scene.FOGMODE_EXP;
    scene.fogDensity = 0.003;
    scene.fogColor = new BABYLON.Color3(0.862745, 0.862745, 0.862745);
    //barva scene
    scene.clearColor = new BABYLON.Color3( .5, .5, .5);

    // camera
    camera = new BABYLON.ArcRotateCamera("camera1",  0, 0, 0, new BABYLON.Vector3(0, 0, 0), scene);
    camera.setPosition(new BABYLON.Vector3(0, 50, -100)); //0, 50, -100?
    camera.attachControl(canvas, true);
    camera.checkCollisions = true;
    
    //globalna luc
    var light0 = new BABYLON.HemisphericLight("Hemi0", new BABYLON.Vector3(1, 1, 0), scene);
    var light1 = new BABYLON.HemisphericLight("Hemi0", new BABYLON.Vector3(-1, 1, 0), scene);

    gunshot = new BABYLON.Sound("gunshot", "./sounds/shotgun.wav", scene);
    nomercy = new BABYLON.Sound("eaten", "./sounds/nomercy.wav", scene);
    background = new BABYLON.Sound("background", "./sounds/Escape_Looping.mp3", scene, null, {loop: true, autoplay: true});

    var groundMaterial = new BABYLON.StandardMaterial("ground", scene);
    groundMaterial.diffuseTexture = new BABYLON.Texture("./textures/snow2.jpg", scene);
    groundMaterial.bumpTexture = new BABYLON.Texture("./textures/normalMap.jpg", scene);
    groundMaterial.emissiveColor = new BABYLON.Color3
    groundMaterial.diffuseTexture.uScale = 5.0;//Repeat 5 times on the Vertical Axes
    groundMaterial.diffuseTexture.vScale = 10.0;//Repeat 10 times on the Horizontal Axes
    var ground = BABYLON.Mesh.CreateGround("ground", width, length, 2, scene);
    ground.material = groundMaterial;
    ground.rotation.x = glMatrix.toRadian(slope);
  

    // MESH IMPORTS
    BABYLON.SceneLoader.ImportMesh("", "", "assets/dia.babylon", scene, function (newMeshes) {

      dia = newMeshes[0];
      camera.target = dia;
      //dia.rotation.x = glMatrix.toRadian(90);
      //dia.rotation.y = glMatrix.toRadian(-90);
      dia.scaling.x = 10;
      dia.scaling.y = 4;
      dia.scaling.z = 3;
      dia.position.z = -length/2 + 100;//+ 50;
	  dia.position.y = -dia.position.z * Math.tan(glMatrix.toRadian(slope)) + 3;
	  dia.rotation.x = glMatrix.toRadian( -90 + slope);

    
    //ground.physicsImpostor = new BABYLON.PhysicsImpostor(ground, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.5, friction: 0.0}, scene);

    });

    BABYLON.SceneLoader.ImportMesh("", "", "assets/test-kamensneg.babylon", scene, function (newMeshes) { //rock zahteven, začasno cube
      rock = newMeshes[0];
      rock.scaling.x = 10;
      rock.scaling.y = 10;
      rock.scaling.z = 10;
        for(var j = 0; j < rockPositionsX.length; ){
          var newRock = rock.createInstance("i" + j);
          newRock.position.x = rockPositionsX[j];
          newRock.position.z = rockPositionsZ[j];
          //console.log("narjen kamen " + rockCtr + " na " + newRock.position.x +", " + newRock.position.z);
          newRock.position.y = -newRock.position.z * Math.tan(glMatrix.toRadian(slope)) + 6;
          newRock.rotation.x = glMatrix.toRadian(-slope);
          rocks.push(newRock);
          j++;
        }
    });
    	 BABYLON.SceneLoader.ImportMesh("", "", "assets/mountain1.babylon", scene, function (newMeshes) {
    	 	newMeshes[0].scaling = new BABYLON.Vector3(55, 55, 55);
    	 	newMeshes[0].rotation.y = glMatrix.toRadian(90);
    	 	newMeshes[0].position = new BABYLON.Vector3(280, -75, 0);
    	 	mont = newMeshes[0];
    	 	for(var j = -2500; j < 2500 ;){
    	 		 var newMont = mont.createInstance("i" + j);
    	 		 newMont.position = new BABYLON.Vector3(280, (-j * Math.tan(glMatrix.toRadian(slope)) - 75), j);
    	 		 sides.push(newMont);
    	 		 j += 500;
    	 	}
	  });
    	BABYLON.SceneLoader.ImportMesh("", "", "assets/mountainLeft.babylon", scene, function (newMeshes) {
    	 	newMeshes[0].scaling = new BABYLON.Vector3(55, 55, 55);
    	 	newMeshes[0].rotation.y = glMatrix.toRadian(90);
    	 	newMeshes[0].position = new BABYLON.Vector3(-280, -75, 0);
    	 	mont = newMeshes[0];
    	 	for(var j = -2500; j < 2500 ;){
    	 		 var newMont = mont.createInstance("i" + j);
    	 		 newMont.position = new BABYLON.Vector3(-280, (-j * Math.tan(glMatrix.toRadian(slope)) - 75), j);
    	 		 sides.push(newMont);
    	 		 j += 500;
    	 	}
	  }); 
	  BABYLON.SceneLoader.ImportMesh("", "", "assets/block.babylon", scene, function (newMeshes) {
	    snowPile = newMeshes[0];
      	
	    snowPile.scaling.x = 150;
	    snowPile.scaling.y = 150;
	    snowPile.scaling.z = 150;
	    snowPile.position.y = 10;
	    snowPiles.push(snowPile);
       for(var j = 0; j < snowPilePositionsX.length; ){
        var newSnowPile = snowPile.createInstance("i" + j);
        newSnowPile.position.x = snowPilePositionsX[j];//+ 50;
        newSnowPile.position.z = snowPilePositionsZ[j];//+ 50;
        newSnowPile.position.y += -newSnowPile.position.z * glMatrix.toRadian(slope) ; //-50 ker je ta objekt ogromen in dela probleme s collisions
        snowPiles.push(newSnowPile);
        j++;
      }
      //snowPile.physicsImpostor = new BABYLON.PhysicsImpostor(snowPile, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.1, friction: 0.0  }, scene);
	  });

	  BABYLON.SceneLoader.ImportMesh("", "", "assets/snowmanstl.babylon", scene, function (newMeshes) {
	    snowman = newMeshes[0];
	    snowman.scaling.x = 0.4;
	    snowman.scaling.y = 0.4;
	    snowman.scaling.z = 0.4;
	    snowman.position.x = 0;//+ 50;
	    snowman.position.z = -2000;//+ 50;
		snowman.position.y = (-snowman.position.z * glMatrix.toRadian(slope)) + 17; // + 17 ker je testen snežak ogromen
		snowmanCtr++;
    	//snowman.physicsImpostor = new BABYLON.PhysicsImpostor(snowman, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 2, restitution: 0.1, friction: 0.0  }, scene);
	  });

    BABYLON.SceneLoader.ImportMesh("", "", "assets/snowtree.babylon", scene, function (newMeshes) { // TREEZ
      tree = newMeshes[0];
      tree.scaling.x = 3;
      tree.scaling.y = 3;
      tree.scaling.z = 3;
      for(var j = 0; j < treePositionsX.length; ){
        var newTree = tree.createInstance("i" + j);
        newTree.position.x = treePositionsX[j];//+ 50;
        newTree.position.z = treePositionsZ[j];//+ 50;
        newTree.position.y = -newTree.position.z * Math.tan(glMatrix.toRadian(slope)) + 4;
        //console.log("narjen drevo " + treeCtr + " na x: " + newTree.position.x +", y:" +  newTree.position.y + ", z: " +  newTree.position.z);
        trees.push(newTree);
        j++;
      }
     // tree.physicsImpostor = new BABYLON.PhysicsImpostor(tree, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 2, restitution: 0.1, friction: 0.0  }, scene);
    });

    BABYLON.SceneLoader.ImportMesh("", "", "assets/yeti.babylon", scene, function (newMeshes) { //guard army
      guard = newMeshes[0];
      guard.scaling = new BABYLON.Vector3(2, 5, 5);
      //guard.rotation.x = glMatrix.toRadian(0);
      guard.rotation.y = glMatrix.toRadian(-90);
      

	  for(var g = 0; g < guardPositionsX.length; ){
        var newGuard = guard.createInstance("i" + g);
        newGuard.position.x = guardPositionsX[g];//+ 50;
        newGuard.position.z = guardPositionsZ[g];//+ 50;
        newGuard.position.y = -newGuard.position.z * Math.tan(glMatrix.toRadian(slope)) + 4;
       // newGuard.rotation.x = glMatrix.toRadian(slope);
        guards.push(newGuard);
		    //guards[g].physicsImpostor = new BABYLON.PhysicsImpostor(guards[g], BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.0, friction: 0.1  }, scene);
        g++
		//console.log("guard " + g + " made.");
      }
    });


	// CANVAS EDGES (left, right, bottom)
    var skybox = BABYLON.Mesh.CreateBox("skyBox", 2500, scene);
    var skyboxMaterial = new BABYLON.StandardMaterial("skyBox", scene);
    skyboxMaterial.backFaceCulling = false;
    skyboxMaterial.disableLighting = true;
    skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture("textures/sky32/skybox", scene);
    skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
    skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
    skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
    
    skybox.material = skyboxMaterial;
    skybox.infiniteDistance = true;
    
    var ramp = BABYLON.Mesh.CreatePlane("ramp", 50, scene);
    ramp.rotation.x = glMatrix.toRadian(80);
    ramp.position.x = 0;
    ramp.position.z = 1100;
    ramp.position.y = -ramp.position.z * glMatrix.toRadian(slope);
    //ramp.physicsImpostor = new BABYLON.PhysicsImpostor(ramp, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.1, friction: 1.5  }, scene);
    
    return scene;
  };
    
    var moveRight = false;
    var moveLeft = false;
    window.addEventListener('keydown', function(event) {
      switch (event.keyCode) {
        case 65: //a
        	dia.rotation.y = glMatrix.toRadian(steerCtr);
        	//steerCtr = 0;
            moveLeft = true;
          break;

        case 39: // Right
        case 68: //d
        	dia.rotation.y = glMatrix.toRadian(steerCtr);
        	//steerCtr = 0;
            moveRight = true;
          break;

        case 40: // Down
        case 83:
        	speed = originalSpeed/2;
        break;

        case 38: // Up
        case 87:
          dia.position.y += 40;
        break;
        }
    }, false);

    window.addEventListener('keyup', function(event) {
    	switch (event.keyCode) {
        case 65: 
          moveLeft = false;
          dia.rotation.y = glMatrix.toRadian(steerCtr);
          steerCtr = 0;
          break;
        case 68: //d
          moveRight = false;
          dia.rotation.y = glMatrix.toRadian(steerCtr);
          steerCtr = 0;
          break;
        case 83:
        	speed = originalSpeed; // treba poslušat izrecno za tipko S / down arrow
      		steerCtr = 0;
        break;
    	}
    }, false);

  //ANIMATION ============================================================================================== CHANGE STAGE
  var speed = 1;
  var accel = 0;
  var scene = createScene();
  engine.runRenderLoop(function(){
      if(scene.isReady()){

         if (dia.position.z > length/2){
          engine.stopRenderLoop();
          camera.dispose();
          scene.dispose();
          //console.log("scene disposed.");
          changeStage();
         }

         if (accel == 250){
         	speed += 0.25;
         	accel = 0;
         }  //starting speed
         	++accel;
        	dia.position.z += speed;
        	dia.position.y = -dia.position.z * Math.tan(glMatrix.toRadian(slope)) + 2;
         if (moveRight){    
			 dia.position.x += speed / 2;
             dia.rotation.y = glMatrix.toRadian(20);

         }

         if (moveLeft){  
			 dia.position.x -= speed / 2;
           
            dia.rotation.y = glMatrix.toRadian(-20);
        }
        if (!moveLeft && !moveRight){
        	dia.rotation.y = glMatrix.toRadian(0);
        }

//dia intersects
			trees.forEach(function(tree){
				if(dia.intersectsMesh(tree, false)){
					//console.warn("collision!!");
					gunshot.play();
					engine.stopRenderLoop();
					gameOver();
				} 
			 });
			 
			 snowPiles.forEach(function(snowPile){
				if(dia.intersectsMesh(snowPile, false)){
					//console.warn("collision!!");
					engine.stopRenderLoop();
					gameOver(); 
			    }
			 });
			 
			 rocks.forEach(function(rock){
				if(dia.intersectsMesh(rock, false)){
					//console.warn("collision!!");
					engine.stopRenderLoop();
					gameOver();         
			    }
			 });
//dia intersects

//CHASE
		for(var g = 0; g < guards.length; g++){ // s for loopom treba preverit za vsakga guarda posebi...
			if(guards[g].position.z < dia.position.z + 10){


    			if(Math.floor(guards[g].position.x) > Math.floor(dia.position.x) + 5){
              	guards[g].position.x -= 0.25;
              //guards[g].rotation.y = glMatrix.toRadian(160);
             }
              
    		else if (Math.floor(guards[g].position.x) < Math.floor(dia.position.x) - 5 ){
              guards[g].position.x += 0.25;
             // guards[g].rotation.y = glMatrix.toRadian(-160);
             } 

             if(guards[g].position.z >= dia.position.z && guards[g].position.z < dia.position.z + 2){
              guards[g].position.z = dia.position.z;
             }
             else{
                 guards[g].position.z += speed + 0.075;
                 guards[g].position.y = -guards[g].position.z * Math.tan(glMatrix.toRadian(slope)) + 5; // po gasi
             //če se zgodi, da pridejo pred Dio oni nadaljujejo pot, se ne ustavljajo. to OK? Drugač je tako skakajoče gibanje
         }
			}	

//guard intersects				
			 if(dia.intersectsMesh(guards[g], false)){
				//console.warn("captured by guard " + g);
				nomercy.play();
				engine.stopRenderLoop();
        gameOver();
			 }
			 
			rocks.forEach(function(rock){
			   if(guards[g].intersectsMesh(rock, false)){
				  guards[g].dispose();
				 // console.log("MAN DOWN. Disposed of guard " + g);
				}
			 });
			 
			trees.forEach(function(tree){
				if(guards[g].intersectsMesh(tree, false)){
					//console.warn("MAN DOWN. Disposed of guard " + g);
					guards[g].dispose();

				} 
			 });
			 
			snowPiles.forEach(function(snowPile){
				if(guards[g].intersectsMesh(snowPile, false)){
					//console.warn("MAN DOWN. Disposed of guard " + g);
					guards[g].dispose();
				} 
			 });			 
        }
		//konec for loopa. funkcije forEach zelo potratne... Optimizacija?
	  }
      scene.render();
  });
  
  // Watch for browser/canvas resize events
  window.addEventListener("resize", function () {
  engine.resize();
  });
} //===@===@===@===@===@===@===@===@===@=== END OF PROGRAM ===@===@===@===@===@===@===@===@===@===