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



  // -------------------------------------------------------------
  // Here begins a function that we will 'call' just after it's built
  
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
//------------------------------------------------------------------------------------

  var createScene = function() {
    // scene objekt
    var scene = new BABYLON.Scene(engine);
    //barva scene
    scene.clearColor = new BABYLON.Color3( .5, .5, .5);

    // camera
    var camera = new BABYLON.ArcRotateCamera("camera1",  0, 0, 0, new BABYLON.Vector3(0, 0, 0), scene);
    camera.setPosition(new BABYLON.Vector3(0, 25, -60));
    //camera.attachControl(canvas, true);
    //globalna luc

    var light0 = new BABYLON.HemisphericLight("Hemi0", new BABYLON.Vector3(1, 1, 0), scene);
    var light1 = new BABYLON.HemisphericLight("Hemi0", new BABYLON.Vector3(-1, 1, 0), scene);

    // import mesh
    var mesh; 
    BABYLON.SceneLoader.ImportMesh("", "", "assets/diaMontiffe.babylon", scene, function (newMeshes) {
    
    // Set the target of the camera to the first imported mesh
    camera.target = newMeshes[0];
    mesh = newMeshes[0];
    mesh.scaling.x = 0.5;
    mesh.scaling.y = 0.5;
    mesh.scaling.z = 0.5;


    //WORK IN PROGRESS
    /*
     if (mesh.intersectsMesh(rock, false)) {
      console.log("COLISSION");
    } 
    */

    // Creation of a basic animation with mesh
    //----------------------------------------

  // Blending animation
    var animation2Mesh = new BABYLON.Animation("moving", "position.z", 30, BABYLON.Animation.ANIMATIONTYPE_FLOAT,
    BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
                                
    // Animation keys
    var keys = [];
    keys.push({
        frame: 0,
        value: -950
    });

    keys.push({
        frame: 400,
        value: 950
    });
    animation2Mesh.setKeys(keys);
  
    scene.beginDirectAnimation(mesh, [animation2Mesh], 0, 400, true);
    });

    var rock;
    BABYLON.SceneLoader.ImportMesh("", "", "assets/rock.babylon", scene, function (newMeshes) {

    newMeshes[0].scaling.x = 10;
    newMeshes[0].scaling.y = 10;
    newMeshes[0].scaling.z = 10;
    newMeshes[0].position.z = -800;
    rock = newMeshes[0];
    });

    

    var leafMaterial = new BABYLON.StandardMaterial("leafMaterial", scene);
    leafMaterial.diffuseColor = new BABYLON.Color3(0.5, 1, 0.5);
    
    var woodMaterial = new BABYLON.StandardMaterial(name, scene);
    woodMaterial.diffuseColor = new BABYLON.Color3(0.627451, 0.321569, 0.176471);
    
 
    var ground = BABYLON.Mesh.CreatePlane("Plane", 200, scene);
    ground.rotation.x = glMatrix.toRadian(90);
    ground.scaling.y = 10;
    var groundMaterial = new BABYLON.StandardMaterial("ground", scene);
    groundMaterial.diffuseTexture = new BABYLON.Texture("./textures/field-of-dimpled-snow.jpg", scene);
    ground.material = groundMaterial;

    var background = BABYLON.Mesh.CreatePlane("Plane", 100, scene);
    background.position.x = -100;
    background.position.y = 50;
    background.rotation.y = glMatrix.toRadian(-90);
    background.scaling.x = 20;
    var backgroundMaterial = new BABYLON.StandardMaterial("background", scene);
    backgroundMaterial.diffuseTexture = new BABYLON.Texture("./textures/Mountain.jpg", scene);
    background.material = backgroundMaterial;

    var backgroundRight = BABYLON.Mesh.CreatePlane("Plane", 100, scene);;
    backgroundRight.position.x = 100;
    backgroundRight.position.y = 50;
    backgroundRight.scaling.x = 20;
    backgroundRight.rotation.y = glMatrix.toRadian(90);
    backgroundRight.material = backgroundMaterial;


    var trees = [];
    for(var i = 0; i < 50; i++){
      var tree = QuickTreeGenerator(15, 10, 5, woodMaterial, leafMaterial, scene);
      tree.position.x = randomNumber(-100, 100);
      tree.position.z = randomNumber(-1000, 1000);
      tree.checkCollisions = true;
      trees.push(tree);
    }

    window.addEventListener('keydown', function(event) {
      switch (event.keyCode) {
        case 37: // Left
          if(mesh.position.x > -90){
            mesh.position.x -= 4;
            mesh.rotation.y = glMatrix.toRadian(-10);
          }
          break;

        case 38: // Up
          mesh.rotation.y = glMatrix.toRadian(0);
          break;

        case 39: // Right
          if(mesh.position.x < 90){
            mesh.position.x += 4;
            mesh.rotation.y = glMatrix.toRadian(10);
          }
          break;

        case 40: // Down
          newAnimation.pause();
          break;
      }
    }, false);
      return scene;
  };

  var scene = createScene();
  engine.runRenderLoop(function(){
    scene.render();
  });

  // Watch for browser/canvas resize events
  window.addEventListener("resize", function () {
  engine.resize();
  });

}
