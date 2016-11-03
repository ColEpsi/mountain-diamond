// Get the canvas element from our HTML below

document.addEventListener("DOMContentLoaded", function () {
  if (BABYLON.Engine.isSupported()) {
    startGame();
  }
}, false);

function startGame(){
  var canvas = document.getElementById("renderCanvas");
  // Load the BABYLON 3D engine
  var engine = new BABYLON.Engine(canvas, true);
  // -------------------------------------------------------------
  // Here begins a function that we will 'call' just after it's built
  var createScene = function() {
    // scene objekt
    var scene = new BABYLON.Scene(engine);
    //barva scene
    scene.clearColor = new BABYLON.Color3( .5, .5, .5);

    // camera
    var camera = new BABYLON.ArcRotateCamera("camera1",  0, 0, 0, new BABYLON.Vector3(0, 0, -0), scene);
    camera.setPosition(new BABYLON.Vector3(0, 25, -60));
    camera.attachControl(canvas, true);
    //globalna luc
    var light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(1, 0.5, 0), scene);
    light.intensity = 0.7;
    //spot luci
    var spot = new BABYLON.SpotLight("spot", new BABYLON.Vector3(25, 15, -50), new BABYLON.Vector3(-1, -0.8, 1), 15, 1, scene);
    spot.diffuse = new BABYLON.Color3(0.545098, 0.270588, 0.0745098);
    spot.specular = new BABYLON.Color3(0, 0, 0);
    spot.intensity = 0.8;

    var leafMaterial = new BABYLON.StandardMaterial("leafMaterial", scene);
    leafMaterial.diffuseColor = new BABYLON.Color3(0.5, 1, 0.5);
    
    var woodMaterial = new BABYLON.StandardMaterial(name, scene);
    
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
      var randomNumber = function (min, max) {
          if (min == max) {
              return (min);
          }
          var random = Math.random();
          return ((random * (max - min)) + min);
      };

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
  	var plane = BABYLON.Mesh.CreatePlane("Plane", 100, scene);
  	plane.rotation.x = 1.57;

  	var tree1 = QuickTreeGenerator(15, 10, 5, woodMaterial, leafMaterial, scene);
    	tree1.position.x = 20;

    	var tree2 = QuickTreeGenerator(15, 10, 5, woodMaterial, leafMaterial, scene);
    	tree2.position.x = -20; 

    	var tree3 = QuickTreeGenerator(15, 10, 5, woodMaterial, leafMaterial, scene);
    	tree3.position.z = 20;  

    	var tree4 = QuickTreeGenerator(15, 10, 5, woodMaterial, leafMaterial, scene);
    	tree4.position.x = 25; 
    	tree4.position.z = -20; 


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




