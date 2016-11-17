// Get the canvas element from our HTML below
document.addEventListener("DOMContentLoaded", function () {
  if (BABYLON.Engine.isSupported()) {
    startGame();
  }
}, false);

var randomNumber = function (min, max) {
  if (min == max) {
              return (min);
          }
          var random = Math.random();
          return ((random * (max - min)) + min);
};

function changeStage(){
 var btn = document.createElement("BUTTON");
 var t = document.createTextNode("click");
 btn.appendChild(t);
 document.body.appendChild(btn);
}

function startGame(){
  var canvas = document.getElementById("renderCanvas");
  //var ctx = canvas.getContext("2d"); //context ko je stage finished
  // Load the BABYLON 3D engine
  var engine = new BABYLON.Engine(canvas, true);

  //global variables
  var dia, rock, snowPile, snowman, guard; // MESHES
  var camera;
  var trees = [];
  var rocks = [];
  var snowPiles = [];
  var snowmen = [];
  var slope = 10, stage = 1;
  var length = 5000, width = 500;
  var originalSpeed = 3;
  var speed = originalSpeed, steeringFactor = 1, steerCtr = 0; // variables for movement
  // OBSTACLE POSITIONS
  	// ROCKS
  	var rockPositionsX = [-15, -30, -40, -80, -81, -85, -90, -102, 15, 38, 50, 200];
  	var rockPositionsZ = [-2400, -2200, -2, -790, -900, -1300, -10, -1111, -1239, -2000, -1530, -1450];
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
  // -------------------------------------------------------------
  // Here begins a function that we will 'call' just after it's built
  
  
//------------------------------------------------------------------------------------

  var createScene = function() {
    // scene objekt
    var scene = new BABYLON.Scene(engine);
    scene.enablePhysics();
    //scene.collisionsEnabled = true;
    scene.debugLayer.show(true, camera);
    /*scene.fogMode = BABYLON.Scene.FOGMODE_EXP;
    scene.fogDensity = 0.003;
    scene.fogColor = new BABYLON.Color3(0.862745, 0.862745, 0.862745);*/
    //barva scene
    scene.clearColor = new BABYLON.Color3( .5, .5, .5);

    // camera
    camera = new BABYLON.ArcRotateCamera("camera1",  0, 0, 0, new BABYLON.Vector3(0, 0, 0), scene);
    camera.setPosition(new BABYLON.Vector3(0, 25, -60)); //0, 50, -100?
    camera.attachControl(canvas, true);
    
    //globalna luc
    var light0 = new BABYLON.HemisphericLight("Hemi0", new BABYLON.Vector3(1, 1, 0), scene);
    var light1 = new BABYLON.HemisphericLight("Hemi0", new BABYLON.Vector3(-1, 1, 0), scene);

    var groundMaterial = new BABYLON.StandardMaterial("ground", scene);
    groundMaterial.diffuseTexture = new BABYLON.Texture("./textures/snow2.jpg", scene);
    var ground = BABYLON.Mesh.CreateGround("ground", width, length, 2, scene);
    ground.material = groundMaterial;
    ground.rotation.x = glMatrix.toRadian(slope);
  

    // MESH IMPORTS
    BABYLON.SceneLoader.ImportMesh("", "", "assets/diaMontiffe.babylon", scene, function (newMeshes) {
      dia = newMeshes[0];
      camera.target = dia;
      dia.scaling.x = 0.5;
      dia.scaling.y = 0.5;
      dia.scaling.z = 0.5;
      dia.position.z = -length/2 + 50;//+ 50;
		  dia.position.y = -dia.position.z * glMatrix.toRadian(slope) + 10;

    dia.physicsImpostor = new BABYLON.PhysicsImpostor(dia, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 2, restitution: 0.1, friction: 0.0  }, scene);
    //dia.physicsImpostor.setLinearVelocity(new BABYLON.Vector3(0, 0, 3));
    //dia.physicsImpostor.setAngularVelocity(new BABYLON.Quaternion(0,0,0,0));
    ground.physicsImpostor = new BABYLON.PhysicsImpostor(ground, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.5, friction: 0.0}, scene);

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
          console.log("narjen kamen " + rockCtr + " na " + newRock.position.x +", " + newRock.position.z);
          newRock.position.y = -newRock.position.z * glMatrix.toRadian(slope);
          newRock.rotation.x = glMatrix.toRadian(-slope);
          rocks.push(newRock);
          rockCtr++;
        }
    });
/*
	  BABYLON.SceneLoader.ImportMesh("", "", "assets/sick-mountains.babylon", scene, function (newMeshes) {
	    snowPile = newMeshes[0];
      snowPile.rotation.y = glMatrix.toRadian(90);
	    snowPile.scaling.x = 10;
	    snowPile.scaling.y = 25;
	    snowPile.scaling.z = 10;
      for(var j = 0; j < snowPilePositionsX.length; j++){
        var newSnowPile = snowPile.createInstance("i" + j);
  	    newSnowPile.position.x = snowPilePositionsX[snowPileCtr];//+ 50;
  	    newSnowPile.position.z = snowPilePositionsZ[snowPileCtr];//+ 50;
    		newSnowPile.position.y = -newSnowPile.position.z * glMatrix.toRadian(slope) ; //-50 ker je ta objekt ogromen in dela probleme s collisions
    		snowPiles.push(newSnowPile);
    		snowPileCtr++;
      }
       for(var j = -2450; j < 2450; j += 100){
        var newSnowPile = snowPile.createInstance("i" + j);
        newSnowPile.position.x = 300 ;//+ 50;
        newSnowPile.position.z = j;//+ 50;
        newSnowPile.position.y = -newSnowPile.position.z * glMatrix.toRadian(slope) ; //-50 ker je ta objekt ogromen in dela probleme s collisions
        snowPiles.push(newSnowPile);
        snowPileCtr++;
      }
       for(var j = -2450; j < 2450; j += 100){
        var newSnowPile = snowPile.createInstance("i" + j);
        newSnowPile.position.x = -300 ;//+ 50;
        newSnowPile.position.z = j;//+ 50;
        newSnowPile.position.y = -newSnowPile.position.z * glMatrix.toRadian(slope) ; //-50 ker je ta objekt ogromen in dela probleme s collisions
        snowPiles.push(newSnowPile);
        snowPileCtr++;
      }

      //snowPile.physicsImpostor = new BABYLON.PhysicsImpostor(snowPile, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 2, restitution: 0.1, friction: 0.0  }, scene);
	  });*/

	  BABYLON.SceneLoader.ImportMesh("", "", "assets/snowmanstl.babylon", scene, function (newMeshes) {
	    snowman = newMeshes[0];
	    snowman.scaling.x = 0.4;
	    snowman.scaling.y = 0.4;
	    snowman.scaling.z = 0.4;
	    snowman.position.x = 0;//+ 50;
	    snowman.position.z = -2000;//+ 50;
		snowman.position.y = (-snowman.position.z * glMatrix.toRadian(slope)) + 17; // + 17 ker je testen snežak ogromen
		snowmanCtr++;
    tree.physicsImpostor = new BABYLON.PhysicsImpostor(tree, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 2, restitution: 0.1, friction: 0.0  }, scene);
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
        console.log("narjen drevo " + treeCtr + " na x: " + newTree.position.x +", y:" +  newTree.position.y + ", z: " +  newTree.position.z);
        trees.push(newTree);
        treeCtr++;
      }
      tree.physicsImpostor = new BABYLON.PhysicsImpostor(tree, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 2, restitution: 0.1, friction: 0.0  }, scene);
    });

    BABYLON.SceneLoader.ImportMesh("", "", "assets/snowmanstl.babylon", scene, function (newMeshes) { //guard
      guard = newMeshes[0];
      guard.scaling = new BABYLON.Vector3(0.2, 0.2, 0.2);
      guard.position = new BABYLON.Vector3(5, 425, -2330);
      //moveToTarget(guard, tar); //http://babylonjs-playground.azurewebsites.net/#Z3UOX#10
    });
      
//============= guards

    var leafMaterial = new BABYLON.StandardMaterial("leafMaterial", scene);
    leafMaterial.diffuseColor = new BABYLON.Color3(0.5, 1, 0.5);
    
    var woodMaterial = new BABYLON.StandardMaterial(name, scene);
    woodMaterial.diffuseColor = new BABYLON.Color3(0.627451, 0.321569, 0.176471);

	// CANVAS EDGES (left, right, bottom)
  /*
    var leftWall = BABYLON.Mesh.CreatePlane("Plane", 100, scene);
    leftWall.position.x = -width/2;
    leftWall.position.y = 50;
    leftWall.rotation.y = glMatrix.toRadian(-90);
    leftWall.rotation.z = glMatrix.toRadian(-slope);
    leftWall.scaling.x = 50;
    var leftWallMaterial = new BABYLON.StandardMaterial("background", scene);
    leftWallMaterial.diffuseTexture = new BABYLON.Texture("./textures/Mountain.jpg", scene);
    leftWall.material = leftWallMaterial;

    var rightWall = BABYLON.Mesh.CreatePlane("Plane", 100, scene);;
    rightWall.position.x = width/2;
    rightWall.position.y = 50;
    rightWall.scaling.x = 50;
    rightWall.rotation.y = glMatrix.toRadian(90);
    rightWall.rotation.z = glMatrix.toRadian(slope);
    rightWall.material = leftWallMaterial;
*/
    
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
    ramp.position.z = 1500;
    ramp.position.y = -ramp.position.z * glMatrix.toRadian(slope);
    ramp.physicsImpostor = new BABYLON.PhysicsImpostor(ramp, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.1, friction: 3.0  }, scene);

      return scene;
  };
    var distance = 40;
    var moveRight = false;
    var moveLeft = false;
    window.addEventListener('keydown', function(event) {
      switch (event.keyCode) {
        case 37: // Left
        case 65: //a
          moveLeft = true;
          break;

        case 39: // Right
        case 68: //d
          moveRight = true;
          break;

        case 40: // Down
        case 83:
        	speed = originalSpeed/2;
        break;

        case 38: // Up
        case 87:
          dia.position.z += 40;
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

  //ANIMATION
  var scene = createScene();
  engine.runRenderLoop(function(){
	
      if(scene.isReady()){
         if (dia.position.z > (length/2)-50){ // GAME LOOP
          engine.stopRenderLoop();
          changeStage();
          /*scene.clearColor = new BABYLON.Color4(0, 1, 0, 0.5);
          camera.target = new BABYLON.Vector3(0,0,5500);
          camera.position = new BABYLON.Vector3(0,0,5500);*/
           //dia.position = new BABYLON.Vector3(0, 450, (-length/2)+50);
         }
         if (dia.position.z <= -2250){} //starting speed

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

         distance -= 0.01;
         guard.position.x = dia.position.x + distance;
         guard.position.z = dia.position.z  - distance;
         guard.position.y = dia.position.y + 5;
         //guard.moveWithCollisions(dia.position);
         if(dia.intersectsMesh(guard, false)){
            console.warn("collision!!");
            engine.stopRenderLoop();
            if(window.confirm("GAME OVER\nPLAY AGAIN?") == true){
              startGame();
            }
         }

         trees.forEach(function(tree){
            if(dia.intersectsMesh(tree, false)){
            console.warn("collision!!");
            engine.stopRenderLoop();
            if(window.confirm("GAME OVER\nPLAY AGAIN?") == true){
              startGame();
            }
          } 
         });

         rocks.forEach(function(rock){
         		if(dia.intersectsMesh(rock, false)){
            console.warn("collision!!");
            engine.stopRenderLoop();
            if(window.confirm("GAME OVER\nPLAY AGAIN?") == true){
              startGame();
            }          
          }
           if(guard.intersectsMesh(rock, false)){
              guard.dispose();
              console.warn("MAN DOWN!!!!");
            }
         });

         snowPiles.forEach(function(snowPile){
         	if(dia.intersectsMesh(snowPile, true)){
            console.warn("collision!!");
            engine.stopRenderLoop();
            if(window.confirm("GAME OVER\nPLAY AGAIN?") == true){
              startGame();
            }
          }
         });
      }
      scene.render();
  });
  
  // Watch for browser/canvas resize events
  window.addEventListener("resize", function () {
  engine.resize();
  });
} //===@===@===@===@===@===@===@===@===@=== END OF PROGRAM ===@===@===@===@===@===@===@===@===@===
