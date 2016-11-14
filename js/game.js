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

function startGame(){
  var canvas = document.getElementById("renderCanvas");
  // Load the BABYLON 3D engine
  var engine = new BABYLON.Engine(canvas, true);

  //global variables
<<<<<<< HEAD
  var dia, rock, snowPile, snowman; // MESHES
  var trees = [];
  var rocks = [];
  var snowPiles = [];
  var snowmen = [];
  var slope = 5;
  var length = 5000, width = 500;
=======
  var dia, rock; // MESHES
  var trees = [];
  var rocks = [];
  var slope = 4;
  var length = 5000, width = 800;
  //var poz = -949;
>>>>>>> origin/blaz
  var originalSpeed = 3;
  var speed = originalSpeed, gravity = 0.20, steeringFactor = 1; // variables for movement
  // OBSTACLE POSITIONS
  	// ROCKS
  	var rockPositionsX = [-15, -30, -40, -80, -81, -85, -90, -102, 15, 38, 50, 200];
<<<<<<< HEAD
  	var rockPositionsZ = [-2400, -2200, -2, -790, -900, -1300, -10, -1111, -1239, -2000, -1530, -1450];
	var rockCtr = 0;
	// SNOW PILES
  	var snowPilePositionsX = [175, 20, -50, -155, 250];
  	var snowPilePositionsZ = [-2000, -1120, 50, 700, 1200];
	var snowPileCtr = 0;
  	// TREES
	var treePositionsX = [];
	var treePositionsZ = [];
	var treeCtr = 0;
	// SNOWMEN
	var snowmanPositionsX = [];
	var snowmanPositionsZ = [];
	var snowmanCtr = 0;
=======
  	var rockPositionsZ = [-2400, -2400, -2400, -2200, -1500, -1300, -10, -1111, -1239, -2400, -2430, -2450];
  	// TREES
	  var treePositionsX = [];
	  var treePositionsZ = [];
>>>>>>> origin/blaz
  // -------------------------------------------------------------
  // Here begins a function that we will 'call' just after it's built
  
  
//------------------------------------------------------------------------------------

  var createScene = function() {
    // scene objekt
    var scene = new BABYLON.Scene(engine);
    //barva scene
    scene.clearColor = new BABYLON.Color3( .5, .5, .5);

    // camera
    var camera = new BABYLON.ArcRotateCamera("camera1",  0, 0, 0, new BABYLON.Vector3(0, 0, 0), scene);
    camera.setPosition(new BABYLON.Vector3(0, 25, -60)); //0, 50, -100?
    camera.attachControl(canvas, true);
<<<<<<< HEAD
    
=======
>>>>>>> origin/blaz
    //globalna luc
    var light0 = new BABYLON.HemisphericLight("Hemi0", new BABYLON.Vector3(1, 1, 0), scene);
    var light1 = new BABYLON.HemisphericLight("Hemi0", new BABYLON.Vector3(-1, 1, 0), scene);

    // MESH IMPORTS
    BABYLON.SceneLoader.ImportMesh("", "", "assets/diaMontiffe.babylon", scene, function (newMeshes) {
        camera.target = newMeshes[0];
        dia = newMeshes[0];
        dia.scaling.x = 0.5;
        dia.scaling.y = 0.5;
        dia.scaling.z = 0.5;
<<<<<<< HEAD
        dia.position.z = -length/2 ;//+ 50;
		dia.position.y = -dia.position.z * glMatrix.toRadian(slope);
    });

  for(var j = 0; j < rockPositionsX.length; j++){
=======
        dia.position.z = -length/2 + 50;
				dia.position.y = -dia.position.z * glMatrix.toRadian(slope);
    });

  for(var i = 0; i <= 11; i++){
>>>>>>> origin/blaz
    BABYLON.SceneLoader.ImportMesh("", "", "assets/cube.babylon", scene, function (newMeshes) { //rock zahteven, začasno cube
      rock = newMeshes[0];
      rock.scaling.x = 5;
      rock.scaling.y = 5;
      rock.scaling.z = 5;

<<<<<<< HEAD
      rock.position.x = rockPositionsX[rockCtr]; // randomNumber(-400, 400); // ne dela, piše da je undefined o.O
     	rock.position.z = rockPositionsZ[rockCtr]; //randomNumber(-length/2, length/2);
     	console.log("narjen kamen " + rockCtr + " na " + rock.position.x +", " + rock.position.z);
			rock.position.y = -rock.position.z * glMatrix.toRadian(slope);
			rock.rotation.x = glMatrix.toRadian(-slope);
      rocks.push(rock);
	  rockCtr++;
    });
  }

    for(var j = 0; j < snowPilePositionsX.length; j++){
	  BABYLON.SceneLoader.ImportMesh("", "", "assets/mountain-rock.babylon", scene, function (newMeshes) {
	    snowPile = newMeshes[0];
	    snowPile.scaling.x = 90;
	    snowPile.scaling.y = 90;
	    snowPile.scaling.z = 90;
	    snowPile.position.x = snowPilePositionsX[snowPileCtr];//+ 50;
	    snowPile.position.z = snowPilePositionsZ[snowPileCtr];//+ 50;
		snowPile.position.y = -snowPile.position.z * glMatrix.toRadian(slope) - 50; //-50 ker je ta objekt ogromen in dela probleme s collisions
		snowPiles.push(snowPile);
		snowPileCtr++;
	  });
	}

	//for(var j = 0; j < snowPilePositionsX.length; j++){
	  BABYLON.SceneLoader.ImportMesh("", "", "assets/snowmanstl.babylon", scene, function (newMeshes) {
	    snowman = newMeshes[0];
	    snowman.scaling.x = 0.4;
	    snowman.scaling.y = 0.4;
	    snowman.scaling.z = 0.4;
	    snowman.position.x = 0;//+ 50;
	    snowman.position.z = -2300;//+ 50;
		snowman.position.y = (-snowman.position.z * glMatrix.toRadian(slope)) + 17; // + 17 ker je testen snežak ogromen
		snowmanCtr++;
	  });
	//}
=======
      rock.position.x = rockPositionsX[i]; // randomNumber(-400, 400); // ne dela, piše da je undefined o.O
     	rock.position.z = rockPositionsZ[i]; //randomNumber(-length/2, length/2);
     	console.log("narjen kamen " + i + "na " + rock.position.x +", " + rock.position.z);
			rock.position.y = -rock.position.z * glMatrix.toRadian(slope);
			rock.rotation.x = glMatrix.toRadian(-slope);
      rocks.push(rock);
    });
  }
>>>>>>> origin/blaz

    var leafMaterial = new BABYLON.StandardMaterial("leafMaterial", scene);
    leafMaterial.diffuseColor = new BABYLON.Color3(0.5, 1, 0.5);
    
    var woodMaterial = new BABYLON.StandardMaterial(name, scene);
    woodMaterial.diffuseColor = new BABYLON.Color3(0.627451, 0.321569, 0.176471);

    //var ground = BABYLON.Mesh.CreateGround("ground1", 800, 2000, 2, scene);
    var groundMaterial = new BABYLON.StandardMaterial("ground", scene);
    groundMaterial.diffuseTexture = new BABYLON.Texture("./textures/snow2.jpg", scene);
    var ghm = BABYLON.Mesh.CreateGroundFromHeightMap("ground", "lightning.png", width, length, 3, 0.1, 0.5, scene, false); //ime, url, width, height, subdivizije, minH, maxH 
    ghm.material = groundMaterial;
<<<<<<< HEAD
	ghm.rotation.x = glMatrix.toRadian(slope);
=======
		ghm.rotation.x = glMatrix.toRadian(slope);
>>>>>>> origin/blaz

	// CANVAS EDGES (left, right, bottom)
    var leftWall = BABYLON.Mesh.CreatePlane("Plane", 100, scene);
    leftWall.position.x = -width/2;
    leftWall.position.y = 50;
    leftWall.rotation.y = glMatrix.toRadian(-90);
    leftWall.rotation.z = glMatrix.toRadian(-slope);
    leftWall.scaling.x = 100;
    var leftWallMaterial = new BABYLON.StandardMaterial("background", scene);
    leftWallMaterial.diffuseTexture = new BABYLON.Texture("./textures/Mountain.jpg", scene);
    leftWall.material = leftWallMaterial;

    var rightWall = BABYLON.Mesh.CreatePlane("Plane", 100, scene);;
    rightWall.position.x = width/2;
    rightWall.position.y = 50;
    rightWall.scaling.x = 100;
    rightWall.rotation.y = glMatrix.toRadian(90);
    rightWall.rotation.z = glMatrix.toRadian(slope);
    rightWall.material = leftWallMaterial;

    /*
    var skybox = BABYLON.Mesh.CreateBox("skyBox", 3000.0, scene);
    var skyboxMaterial = new BABYLON.StandardMaterial("skyBox", scene);
    skyboxMaterial.backFaceCulling = false;
    skyboxMaterial.disableLighting = true;
    skybox.material = skyboxMaterial;
    skybox.infiniteDistance = true;
    skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
    skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
    
    skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture("textures/sky32", scene);
    skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
    
    skybox.position.y = 5;
  */

    
    for(var i = 0; i < 50; i++){
      var tree = QuickTreeGenerator(15, 10, 5, woodMaterial, leafMaterial, scene);
      tree.position.x = randomNumber(-400, 400);
      tree.position.z = randomNumber(-length/2, length/2);
			tree.position.y = -tree.position.z * glMatrix.toRadian(slope);
			tree.rotation.x = glMatrix.toRadian(-slope);
      trees.push(tree);
    }
      return scene;
  };

    var moveRight = false;
    var moveLeft = false;
    window.addEventListener('keydown', function(event) {
      switch (event.keyCode) {
        case 37: // Left
        case 65: //a
          moveLeft = true;
          dia.rotation.y = glMatrix.toRadian(-10);
          break;

        case 39: // Right
        case 68: //d
          moveRight = true;
          dia.rotation.y = glMatrix.toRadian(10);
          break;

        case 40:
        case 83:
        	speed = originalSpeed/2;
        }
    }, false);

    window.addEventListener('keyup', function(event) {
      moveLeft = false;
      moveRight = false;
      dia.rotation.y = glMatrix.toRadian(0);
      speed = originalSpeed; // treba poslušat izrecno za tipko S / down arrow
    }, false);

  //ANIMATION
  var scene = createScene();
  engine.runRenderLoop(function(){
	
      if(scene.isReady()){
<<<<<<< HEAD
         if (dia.position.z > (length/2)-50){ // GAME LOOP
           dia.position = new BABYLON.Vector3(0, 0, (-length/2)+50);
         }
         //if (dia.position.z < 950){
           dia.position.z += speed;
		   dia.position.y = -dia.position.z * glMatrix.toRadian(slope);
=======
         if (dia.position.z > 950){ // GAME LOOP
          // dia.position = new BABYLON.Vector3(0, 0, -950);
         }
         //if (dia.position.z < 950){
           dia.position.z += speed;
           //poz = dia.position.z;
           //console.log(dia.position.z);
					 dia.position.y = -dia.position.z * glMatrix.toRadian(slope);
>>>>>>> origin/blaz
           dia.rotation.x = glMatrix.toRadian(slope);
         //}
         if (moveRight){
           if(speed != originalSpeed) dia.position.x += steeringFactor/2;
           else dia.position.x += steeringFactor;
           //dia.moveWithCollisions(3, 0, 0); //metoda sprejme vektor
         }
         if (moveLeft){
           if(speed != originalSpeed) dia.position.x -= steeringFactor/2;
           else dia.position.x -= steeringFactor;
           //dia.moveWithCollisions(speed, gravity, 0); //metoda sprejme vektor
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
<<<<<<< HEAD

         rocks.forEach(function(rock){
         		if(dia.intersectsMesh(rock, false)){
=======
         /*if(dia.intersectsMesh(rocks, false)){ // ne zazna collisiona s kamnom :/
>>>>>>> origin/blaz
            console.warn("collision!!");
            engine.stopRenderLoop();
            if(window.confirm("GAME OVER\nPLAY AGAIN?") == true){
              startGame();
            }
<<<<<<< HEAD
          }
         });

         snowPiles.forEach(function(snowPile){
         	if(dia.intersectsMesh(snowPile, false)){
=======
         } */
         rocks.forEach(function(rock){
         		if(dia.intersectsMesh(rock, false)){
>>>>>>> origin/blaz
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

QuickTreeGenerator = function(sizeBranch, sizeTrunk, radius, trunkMaterial, leafMaterial, scene) {

      var tree = new BABYLON.Mesh("tree", scene);
      tree.isVisible = false;
      
      var leaves = new BABYLON.Mesh("leaves", scene);
      
      var vertexData = BABYLON.VertexData.CreateSphere({segments:2, diameter:sizeBranch}); 
      
      vertexData.applyToMesh(leaves, false);

      var positions = leaves.getVerticesData(BABYLON.VertexBuffer.PositionKind);
      var indices = leaves.getIndices();
      var numberOfPoints = positions.length/3;

      var map = [];

      var v3 = BABYLON.Vector3;
      var max = [];

      for (var i=0; i<numberOfPoints; i++) {
          var p = new v3(positions[i*3], positions[i*3+1], positions[i*3+2]);

          if (p.y >= sizeBranch/2) {
              max.push(p);
          }

          var found = false;
          for (var index=0; index<map.length&&!found; index++) {
              var array = map[index];
              var p0 = array[0];
              if (p0.equals (p) || (p0.subtract(p)).lengthSquared() < 0.01){
                  array.push(i*3);
                  found = true;
              }
          }
          if (!found) {
              var array = [];
              array.push(p, i*3);
              map.push(array);
          }

      }

      map.forEach(function(array) {
          var index, min = -sizeBranch/10, max = sizeBranch/10;
          var rx = randomNumber(min,max);
          var ry = randomNumber(min,max);
          var rz = randomNumber(min,max);

          for (index = 1; index<array.length; index++) {
              var i = array[index];
              positions[i] += rx;
              positions[i+1] += ry;
              positions[i+2] += rz;
          }
      });
      leaves.setVerticesData(BABYLON.VertexBuffer.PositionKind, positions);
      var normals = [];
      BABYLON.VertexData.ComputeNormals(positions, indices, normals);
      leaves.setVerticesData(BABYLON.VertexBuffer.NormalKind, normals);
      leaves.convertToFlatShadedMesh();
      
      leaves.material = leafMaterial;
      leaves.position.y = sizeTrunk+sizeBranch/2-2;
      

      var trunk = BABYLON.Mesh.CreateCylinder("trunk", sizeTrunk, radius-2<1?1:radius-2, radius, 10, 2, scene );
      
      trunk.position.y = (sizeBranch/2+2)-sizeTrunk/2;

      trunk.material = trunkMaterial;
      trunk.convertToFlatShadedMesh();
      
      leaves.parent = tree;
      trunk.parent = tree;
      return tree;

    };
