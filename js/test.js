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

  var createScene = function() {
    // scene objekt
    var scene = new BABYLON.Scene(engine);
    //barva scene
    scene.clearColor = new BABYLON.Color3( .5, .5, .5);

    // camera
    var camera = new BABYLON.ArcRotateCamera("camera1",  0, 0, 0, new BABYLON.Vector3(0, 0, 0), scene);
    camera.attachControl(canvas, true);
    //globalna luc

    var light0 = new BABYLON.HemisphericLight("Hemi0", new BABYLON.Vector3(1, 1, 0), scene);

    var box = BABYLON.MeshBuilder.CreateBox("box", {height: 1}, scene);
    var boxMaterial = BABYLON.difusseColor = new BABYLON.Color3(0.5, 1, 0.5);
    box.material = boxMaterial;

      return scene;
  };

  //ANIMATION
  var scene = createScene();
  engine.runRenderLoop(function(){

      scene.render();
  });
  
  // Watch for browser/canvas resize events
  window.addEventListener("resize", function () {
  engine.resize();
  });
} //===@===@===@===@===@===@===@===@===@=== END OF PROGRAM ===@===@===@===@===@===@===@===@===@===
