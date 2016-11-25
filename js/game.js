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
  var canvas = document.getElementById("renderCanvas");

  // Load the BABYLON 3D engine
  engine = new BABYLON.Engine(canvas, true);
  switch(stage){
  	case 1:
  		//global variables
  var dia, rock, snowPile, snowman, guard; // MESHES
  var camera;
  var trees = [];
  var rocks = [];
  var snowPiles = [];
  var snowmen = [];
  var guards = [];
  var slope = 10;
  var length = 5000, width = 500;
  var originalSpeed = 3;
  var speed = originalSpeed, steeringFactor = 1, steerCtr = 0; // variables for movement
  // OBSTACLE POSITIONS
  	// ROCKS
  	var rockPositionsX = [60, -30, -40, -80, -81, -85, -90, -102, 30, 38, 50, 200];
  	var rockPositionsZ = [2400, -2200, -2, -790, -900, -1300, -10, -1111, -1039, -2000, -1530, -1450];
	var rockCtr = 0;
	// SNOW PILES
  	var snowPilePositionsX = [175, 20, -50, -155, 250];
  	var snowPilePositionsZ = [-2000, -1120, 2255, 700, 1200];
	var snowPileCtr = 0;
  // TREES
  	var treePositionsX = [78, -50, 50, 150, 30, 100, -100, 60, -210, 217, -78, 30];
  	var treePositionsZ = [-2000, -17590, -2100, 1592, -1345, -1001, -800, 300, 120, 1590, 2000];
  	var treeCtr = 0;
	// SNOWMEN
  	var snowmanPositionsX = [];
  	var snowmanPositionsZ = [];
  	var snowmanCtr = 0;
	// GUARDS
  	var guardPositionsX = [200, 100, -150, 20];
  	var guardPositionsZ = [-2450, -2450, -2450, -2450];
  	var guardCtr = 0;

  	break;

  	case 2:
  		console.log("switch = 2");
  		//global variables
  var dia, rock, snowPile, snowman, guard; // MESHES
  var camera;
  var trees = [];
  var rocks = [];
  var snowPiles = [];
  var snowmen = [];
  var guards = [];
  var slope = 10;
  var length = 5000, width = 500;
  var originalSpeed = 3;
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
  	var guardPositionsX = [50, 200, -150, 20];
  	var guardPositionsZ = [-2450, -2450, -2450, -2450];
  	var guardCtr = 0;
  	break;
  }
/*
  //global variables
  var dia, rock, snowPile, snowman, guard; // MESHES
  var camera;
  var trees = [];
  var rocks = [];
  var snowPiles = [];
  var snowmen = [];
  var slope = 10;
  var length = 5000, width = 500;
  var originalSpeed = 3;
  var speed = originalSpeed, steeringFactor = 1, steerCtr = 0; // variables for movement
  // OBSTACLE POSITIONS
  	// ROCKS
  	var rockPositionsX = [60, -30, -40, -80, -81, -85, -90, -102, 15, 38, 50, 200];
  	var rockPositionsZ = [2400, -2200, -2, -790, -900, -1300, -10, -1111, -1239, -2000, -1530, -1450];
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
*/
  // -------------------------------------------------------------
  // Here begins a function that we will 'call' just after it's built
  
//------------------------------------------------------------------------------------

  var createScene = function() {
    // scene objekt
    var scene = new BABYLON.Scene(engine);
    scene.enablePhysics();
    //scene.collisionsEnabled = true;
    scene.debugLayer.show(true, camera);
    scene.fogMode = BABYLON.Scene.FOGMODE_EXP;
    scene.fogDensity = 0.003;
    scene.fogColor = new BABYLON.Color3(0.862745, 0.862745, 0.862745);
    //barva scene
    scene.clearColor = new BABYLON.Color3( .5, .5, .5);

    // camera
    camera = new BABYLON.ArcRotateCamera("camera1",  0, 0, 0, new BABYLON.Vector3(0, 0, 0), scene);
    camera.setPosition(new BABYLON.Vector3(0, 50, -100)); //0, 50, -100?
    camera.attachControl(canvas, true);
    
    //globalna luc
    var light0 = new BABYLON.HemisphericLight("Hemi0", new BABYLON.Vector3(1, 1, 0), scene);
    var light1 = new BABYLON.HemisphericLight("Hemi0", new BABYLON.Vector3(-1, 1, 0), scene);

    /*var groundPlane = BABYLON.Mesh.CreatePlane("ground", 5000, scene);
    //groundPlane.rotation.x = glMatrix.toRadian(70);
    groundPlane.position.z = -2000;
    //groundPlane.position.x = -25;
    groundPlane.rotation.x = glMatrix.toRadian(100);
    groundPlane.position.y = -groundPlane.position.z * glMatrix.toRadian(slope) + 10;
    groundPlane.physicsImpostor = new BABYLON.PhysicsImpostor(groundPlane, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.1, friction: 1.5  }, scene);*/

    var groundMaterial = new BABYLON.StandardMaterial("ground", scene);
    groundMaterial.diffuseTexture = new BABYLON.Texture("./textures/snow2.jpg", scene);
    var ground = BABYLON.Mesh.CreateGround("ground", width, length, 2, scene);
    ground.material = groundMaterial;
    ground.rotation.x = glMatrix.toRadian(slope);
    ground.physicsImpostor = new BABYLON.PhysicsImpostor(ground, BABYLON.PhysicsImpostor.PlaneImpostor, { mass: 0, restitution: 0.5, friction: 0.0}, scene);

    // MESH IMPORTS
    BABYLON.SceneLoader.ImportMesh("", "", "assets/diaMontiffe.babylon", scene, function (newMeshes) {
      dia = newMeshes[0];
      camera.target = dia;
      dia.scaling.x = 0.5;
      dia.scaling.y = 0.5;
      dia.scaling.z = 0.5;
      dia.position.z = -length/2 + 100;//+ 50;
	  dia.position.y = -dia.position.z * glMatrix.toRadian(slope) + 7;

	    dia.physicsImpostor = new BABYLON.PhysicsImpostor(dia, BABYLON.PhysicsImpostor.MeshImpostor, { mass: 2, restitution: 0.1, friction: 0.5  }, scene);
	    //dia.physicsImpostor.setLinearVelocity(new BABYLON.Vector3(0, 0, 3));
	    //dia.physicsImpostor.setAngularVelocity(new BABYLON.Quaternion(0,0,0,0));
	   	dia.physicsImpostor.applyImpulse(new BABYLON.Vector3(0, 0, 10), dia.getAbsolutePosition());
    });

    BABYLON.SceneLoader.ImportMesh("", "", "assets/cube.babylon", scene, function (newMeshes) { //rock zahteven, začasno cube
      rock = newMeshes[0];
      rock.scaling.x = 5;
      rock.scaling.y = 5;
      rock.scaling.z = 5;
        for(var j = 0; j < rockPositionsX.length; j++){
          var newRock = rock.createInstance("i" + j);
          newRock.position.x = rockPositionsX[rockCtr];
          newRock.position.z = rockPositionsZ[rockCtr];
          //console.log("narjen kamen " + rockCtr + " na " + newRock.position.x +", " + newRock.position.z);
          newRock.position.y = -newRock.position.z * glMatrix.toRadian(slope);
          newRock.rotation.x = glMatrix.toRadian(-slope);
          rocks.push(newRock);
          rockCtr++;
        }
        rock.physicsImpostor = new BABYLON.PhysicsImpostor(rock, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.5, friction: 0.5  }, scene);
    });

	  BABYLON.SceneLoader.ImportMesh("", "", "assets/pyr.babylon", scene, function (newMeshes) {
	    snowPile = newMeshes[0];
      	
	    snowPile.scaling.x = 0.8;
	    snowPile.scaling.y = 0.8;
	    snowPile.scaling.z = 0.8;

       for(var j = 0; j < snowPilePositionsX.length; j++){
        var newSnowPile = snowPile.createInstance("i" + j);
        newSnowPile.position.x = snowPilePositionsX[snowPileCtr];//+ 50;
        newSnowPile.position.z = snowPilePositionsZ[snowPileCtr];//+ 50;
        newSnowPile.position.y = -newSnowPile.position.z * glMatrix.toRadian(slope) ; //-50 ker je ta objekt ogromen in dela probleme s collisions
        snowPiles.push(newSnowPile);
        snowPileCtr++;
      }
      snowPile.physicsImpostor = new BABYLON.PhysicsImpostor(snowPile, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.1, friction: 0.0  }, scene);
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

    BABYLON.SceneLoader.ImportMesh("", "", "assets/lowpolytree.babylon", scene, function (newMeshes) { // TREEZ
      tree = newMeshes[0];
      tree.scaling.x = 6;
      tree.scaling.y = 6;
      tree.scaling.z = 6;
      for(var j = 0; j < treePositionsX.length; j++){
        var newTree = tree.createInstance("i" + j);
        newTree.position.x = treePositionsX[treeCtr];//+ 50;
        newTree.position.z = treePositionsZ[treeCtr];//+ 50;
        newTree.position.y = -newTree.position.z * glMatrix.toRadian(slope) + 15;
        //console.log("narjen drevo " + treeCtr + " na x: " + newTree.position.x +", y:" +  newTree.position.y + ", z: " +  newTree.position.z);
        trees.push(newTree);
        treeCtr++;
      }
      tree.physicsImpostor = new BABYLON.PhysicsImpostor(tree, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.1, friction: 0.0  }, scene);
    });

    BABYLON.SceneLoader.ImportMesh("", "", "assets/snowmanstl.babylon", scene, function (newMeshes) { //guard army
      guard = newMeshes[0];
      guard.scaling = new BABYLON.Vector3(0.2, 0.2, 0.2);
      /*guard.position.x = 50;
      guard.position.z = -2450;
      guard.position.y = -guard.position.z * Math.tan(glMatrix.toRadian(slope)) + 45;*/
	  for(var g = 0; g < guardPositionsX.length; g++){
        var newGuard = guard.createInstance("i" + g);
        newGuard.position.x = guardPositionsX[guardCtr];//+ 50;
        newGuard.position.z = guardPositionsZ[guardCtr];//+ 50;
        newGuard.position.y = -newGuard.position.z * Math.tan(glMatrix.toRadian(slope)) + 15;
        guards.push(newGuard);
		guards[g].physicsImpostor = new BABYLON.PhysicsImpostor(guards[g], BABYLON.PhysicsImpostor.BoxImpostor, { mass: 10, restitution: 0.0, friction: 0.1  }, scene);
        guardCtr++;
		console.log("guard " + guardCtr + " made.");
      }
	  //camera.target = guards[3];
    });
	
      
//============= guards

    var leafMaterial = new BABYLON.StandardMaterial("leafMaterial", scene);
    leafMaterial.diffuseColor = new BABYLON.Color3(0.5, 1, 0.5);
    
    var woodMaterial = new BABYLON.StandardMaterial(name, scene);
    woodMaterial.diffuseColor = new BABYLON.Color3(0.627451, 0.321569, 0.176471);

	// CANVAS EDGES (left, right, bottom)

    var leftWall = BABYLON.Mesh.CreatePlane("Plane", 100, scene);
    leftWall.position.x = -width/2;
    leftWall.position.y = 100;
    leftWall.rotation.y = glMatrix.toRadian(-90);
    leftWall.rotation.z = glMatrix.toRadian(-slope);
    leftWall.scaling.x = 50;
    leftWall.scaling.y = 2;
    var leftWallMaterial = new BABYLON.StandardMaterial("background", scene);
    leftWallMaterial.diffuseTexture = new BABYLON.Texture("./textures/Mountain.jpg", scene);
    leftWall.material = leftWallMaterial;

    var rightWall = BABYLON.Mesh.CreatePlane("Plane", 100, scene);;
    rightWall.position.x = width/2;
    rightWall.position.y = 100;
    rightWall.scaling.x = 50;
    rightWall.scaling.y = 2;
    rightWall.rotation.y = glMatrix.toRadian(90);
    rightWall.rotation.z = glMatrix.toRadian(slope);
    rightWall.material = leftWallMaterial;
    
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
    ramp.rotation.x = glMatrix.toRadian(70);
    ramp.position.x = 0;
    ramp.position.z = 1000;
    ramp.position.y = -ramp.position.z * glMatrix.toRadian(slope);
    ramp.physicsImpostor = new BABYLON.PhysicsImpostor(ramp, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.1, friction: 1.5  }, scene);

      return scene;
  };
    
    var moveRight = false;
    var moveLeft = false;
    window.addEventListener('keydown', function(event) {
      switch (event.keyCode) {
        case 37: // Left
        case 65: //a
          if(steerCtr == 0) moveLeft = true;
          break;

        case 39: // Right
        case 68: //d
          if(steerCtr == 0) moveRight = true;
          break;

        case 40: // Down
        case 83:
        	speed = originalSpeed/2;
        break;

        case 38: // Up
        case 87:
        //dia.physicsImpostor.applyImpulse(new BABYLON.Vector3(0, 0, 75), dia.getAbsolutePosition());
          dia.position.y += 40;
        break;
        }
    }, false);

    window.addEventListener('keyup', function(event) {
      moveLeft = false;
      moveRight = false;

      if(steerCtr > 0){
        dia.rotation.y = steerCtr * glMatrix.toRadian(1); //je šla desno  
      }
      else if (steerCtr < 0){
        dia.rotation.y = steerCtr * glMatrix.toRadian(1); //je šla levo
      } 
      speed = originalSpeed; // treba poslušat izrecno za tipko S / down arrow
      steerCtr = 0;
    }, false);

  //ANIMATION ============================================================================================== CHANGE STAGE
  var scene = createScene();
  engine.runRenderLoop(function(){
	
	
      if(scene.isReady()){
         if (dia.position.z > length/2){
          engine.stopRenderLoop();
          camera.dispose();
          scene.dispose();
          console.log("scene disposed.");
          changeStage();
         }
         //if (dia.position.z <= -2250){} //starting speed

         if (moveRight){    
           if(speed != originalSpeed) dia.position.x += steeringFactor/2;
           else dia.position.x += steeringFactor;
           
           if(steerCtr > -45){
             dia.rotation.y = glMatrix.toRadian(1);
             steerCtr--;
           }  
         }

         if (moveLeft){  
           if(speed != originalSpeed) dia.position.x -= steeringFactor/2;
           else dia.position.x -= steeringFactor;
           
           if(steerCtr < 45){
              dia.rotation.y = glMatrix.toRadian(-1);
              steerCtr++;
           }
         }

         //if(dia.position.z == -2250) dia.physicsImpostor.applyImpulse(new BABYLON.Vector3(0, 0, 2), dia.getAbsolutePosition());

//dia intersects
			trees.forEach(function(tree){
				if(dia.intersectsMesh(tree, false)){
					console.warn("collision!!");
					engine.stopRenderLoop();
					if(window.confirm("GAME OVER\nPLAY AGAIN?") == true) startGame();
				} 
			 });
			 
			 snowPiles.forEach(function(snowPile){
				if(dia.intersectsMesh(snowPile, true)){
					console.warn("collision!!");
					engine.stopRenderLoop();
					if(window.confirm("GAME OVER\nPLAY AGAIN?") == true) startGame();  
			    }
			 });
			 
			 rocks.forEach(function(rock){
				if(dia.intersectsMesh(rock, false)){
					console.warn("collision!!");
					engine.stopRenderLoop();
					//if(window.confirm("GAME OVER\nPLAY AGAIN?") == true) startGame();
					gameOver();       
			    }
			 });
//dia intersects

//CHASE

		for(var g = 0; g < guards.length; g++){ // s for loopom treba preverit za vsakga guarda posebi...
				 if(Math.floor(guards[g].position.x) > Math.floor(dia.position.x)) guards[g].position.x -= 0.5;
				 else if (Math.floor(guards[g].position.x) < Math.floor(dia.position.x)) guards[g].position.x += 0.5;
				 else guards[g].position.z += 0.25; // po gasi
				 //če se zgodi, da pridejo pred Dio oni nadaljujejo pot, se ne ustavljajo. to OK? Drugač je tako skakajoče gibanje

//guard intersects				
			 if(dia.intersectsMesh(guards[g], false)){
				console.warn("captured by guard " + g);
				engine.stopRenderLoop();
				if(window.confirm("GAME OVER\nPLAY AGAIN?") == true){
				  startGame();
				}
			 }
			 //for loops hitrejši kot forEach!!
			 
			/*rocks.forEach(function(rock){
			   if(guards[g].intersectsMesh(rock, false)){
				 // guards[g].dispose();
				  //console.log("MAN DOWN. Disposed of guard " + g);
				}
			 });*/
			 if(guards[g].intersectsMesh(rock, false)) console.log("guard v rocku");
			 
			trees.forEach(function(tree){
				if(guards[g].intersectsMesh(tree, false)){
					console.warn("MAN DOWN. Disposed of guard " + g);
					//guards[g].dispose();
				} 
			 });
			 
			snowPiles.forEach(function(snowPile){
				if(guards[g].intersectsMesh(snowPile, false)){
					console.warn("MAN DOWN. Disposed of guard " + g);
					//guards[g].dispose();
				} 
			 });			 
        }
		//konec for loopa. funkcije forEach zelo potratne... Optimizacija?

		/*sphere.physicsImpostor.registerOnPhysicsCollide(ground.physicsImpostor, function(main, collided) {
	    //main.object.material.diffuseColor = new BABYLON.Color3(Math.random(), Math.random(), Math.random());
	});*/
	  }
      scene.render();
  });
  
  // Watch for browser/canvas resize events
  window.addEventListener("resize", function () {
  engine.resize();
  });
} //===@===@===@===@===@===@===@===@===@=== END OF PROGRAM ===@===@===@===@===@===@===@===@===@===
