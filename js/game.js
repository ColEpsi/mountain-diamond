// Get the canvas element from our HTML below
document.addEventListener("DOMContentLoaded", function() {
    var animationCanvas = document.getElementById("animationCanvas");
    animationCanvasContext = animationCanvas.getContext("2d");
    document.getElementById('animationCanvas').setAttribute('width', screen.availWidth);
    document.getElementById('animationCanvas').setAttribute('height', screen.availHeight);
    animationCanvas.style.display = 'inline-block';
    startScreen();
}, false);
var engine;
var stage = 0;

function startGame() {
    renderCanvas.style.display = 'inline-block';
    var canvas = document.getElementById("renderCanvas");
    // Load the BABYLON 3D engine
    engine = new BABYLON.Engine(canvas, true);
    switch (stage) {
        case 1:
            //global variables
            var dia, rock, snowPile, snowman, guard, mont; // MESHES
            var camera;
            var deathByTree, deathByYeti, bgMusic;
            var trees = [];
            var rocks = [];
            var snowPiles = [];
            var snowmen = [];
            var guards = [];
            var slope = 10;
            var sides = [];
            var length = 5000;
                width = 500;
            var originalSpeed = 5;
            var speed = originalSpeed;
            // OBSTACLE POSITIONS
            // ROCKS
            var rockPositionsX = [-190, -80, 25, -8, 116, -16, 103, -200, -170, -50, -175, -60, 90, -30, -200, -100, -190, -50, -50, -190, -180, -50, -160];
            var rockPositionsZ = [-2200, -2100, -1903, -790, -850, 1999, -10, 0, 1430, 1800, 250, 438, 697, 1700, 1600, 1000, 1000, 1240, -650, -1850, 450, 300, 900];
            // SNOW PILES
            var snowPilePositionsX = [200, -80, 0, 155, -175];
            var snowPilePositionsZ = [-2000, -1300, 450, 1750, 2300];
            // TREES
            var treePositionsX = [78, -50, 50, 150, 30, 100, -100, 60, -210, -78, 30, -200, 0, 20, -180, 170, 90, 175, -60, 200, 225, -120, -80, -170, -150, -225, -140, -80, -100];
            var treePositionsZ = [-2000, -1759, -2100, 1592, -1345, -1001, -800, 300, 120, 2000, -950, -900, -925, 2200, -1500, 1130, 1290, 1005, 2000, 90, 130, 290, 80, -400, 200, -400, 1200, 1230, 1111];
            // SNOWMEN
            var snowmanPositionsX = [90];
            var snowmanPositionsZ = [2450];
            // GUARDS
            var guardPositionsX = [-75, 20, -50, 20, 175, -40, 230];
            var guardPositionsZ = [-2450, -2450, -1100, 600, -1850, 600, 1100];
            break;
        case 2:
            //global variables
            var dia, rock, snowPile, snowman, guard, mont; // MESHES
            var camera;
            var deathByTree, deathByYeti, bgMusic; //sounds
            var trees = [];
            var rocks = [];
            var snowPiles = [];
            var snowmen = [];
            var guards = [];
            var sides = [];
            var slope = 10;
            var length = 5000;
                width = 500;
            var originalSpeed = 5;
            var speed = originalSpeed;
            // OBSTACLE POSITIONS
            // ROCKS
            var rockPositionsX = [-200, -100, 50, -180, -100, 50, 155, 200, 210, 220, 200, -50, -210, 0, -90, -75, 20, 50, 100, 170, 30, -40];
            var rockPositionsZ = [-2000, -2200, -2300, -1600, -1200, -800, -400, -300, 230, -1630, -1630, 500, 500, 650, 850, 1400, 1300, 1150, 1600, 1700, 2010, 2295];
            // SNOW PILES
            var snowPilePositionsX = [0, 100, -155, 155, -160];
            var snowPilePositionsZ = [-1800, -1250, 0, 700, 1800];
            // TREES
            var treePositionsX = [165, 175, -205, -10, 6, 14, 3, 20, -150, -140, 90, 175, 125, -125, -210, -90, 140, 75, 100, 75];
            var treePositionsZ = [-100, 110, -1650, -1450, -666, -555, 470, 700, 1500, 700, 1400, 2000, 200, -1122, -950, -1010, 2350, 2300, 1750, 2010];
            // SNOWMEN
            var snowmanPositionsX = [150];
            var snowmanPositionsZ = [2450];
            // GUARDS
            var guardPositionsX = [-120, -150, 200, -25, 0, -55, 160, -99];
            var guardPositionsZ = [-2450, -2460, -1000, -1650, 150, 150, 850, 1950];
            break;
        case 3:
            //global variables
            var dia, rock, snowPile, snowman, guard, mont; // MESHES
            var camera;
            var deathByTree, deathByYeti, bgMusic;
            var trees = [];
            var rocks = [];
            var snowPiles = [];
            var snowmen = [];
            var guards = [];
            var slope = 10;
            var sides = [];
            var length = 5000;
                width = 500;
            var originalSpeed = 5;
            var speed = originalSpeed;
            // OBSTACLE POSITIONS
            // ROCKS
            var rockPositionsX = [-120, 180, -150, 90, 70, -170, 75, -40, 60, 120, 160, 0, 34, -50, 60, 34, -20,
                52, -40, 75, 180, -150
            ];
            var rockPositionsZ = [-2100, -1300, -30, 1600, 500, 1200, 2300, 2100, 1550, 1000, 0, -250, -500, 800, -1200, 350, 80, -800, -350, -650, 250, 380];
            // SNOW PILES
            var snowPilePositionsX = [50, -70, -180, 10];
            var snowPilePositionsZ = [-110, -1250, 250, 1500];
            // TREES
            var treePositionsX = [80, 190, 200, 190, 210, -190, -150, 0, -40, 80, 160, -75,
                0, 20, 190, -60, -120, 100, -75, 40, 60, -70, -50, -120,
                90, 110, -80, 140, -20, 0, 100, -75, -95, -120, 90, -67, 84, 63, -30, -150, 90, -75, -110, 30, 0, 170, 96, -60, 45, 0
            ];
            var treePositionsZ = [-1300, -1300, -50, -30, -30, -100, -120, -1200, -1100, -1250, -900, -800, -2000, -1500, -1400, -2200, -2000, -1700, -1800, -1650, -2000, -900, -700, -500,
                0, 20, 90, 100, 200, 250, 300, 450, 400, 600, 700, 850, 1000, 1100, 1250,
                1500, 1550, 1600, 1700, 1850, 2000, 2100, 2340, 2370, 2340, 2400
            ];
            // SNOWMEN
            var snowManPositionsX = [0, 30, -20];
            var snowManPositionsZ = [-2000, 800, 800];
            // GUARDS
            var guardPositionsX = [-70, -50, 0, 20, 100, -75, 50, 25, 75, 0, 25, 170, -150];
            var guardPositionsZ = [-1120, -1120, -1995, -1495, -1695, -1795, 20, 20, 20, 1575, 1575, 2005, 1505];
            break;
        case 4:
            //global variables
            var dia, rock, snowPile, snowman, guard, mont; // MESHES
            var camera;
            var deathByTree, deathByYeti, bgMusic, bgWind;
            var trees = [];
            var rocks = [];
            var snowPiles = [];
            var snowmen = [];
            var guards = [];
            var slope = 10;
            var sides = [];
            var length = 5000;
                width = 500;
            var originalSpeed = 5;
            var speed = originalSpeed;
            // OBSTACLE POSITIONS
            // ROCKS
            var rockPositionsX = [60, -30, -40, -80, -81, -85, -90, -102, 30, 38, 50, 200];
            var rockPositionsZ = [2400, -2200, -2, -790, -900, -1300, -10, -1111, -1039, -2000, -1530, -1450];
            // SNOW PILES
            var snowPilePositionsX = [200, -80, 0, 155, -5];
            var snowPilePositionsZ = [-2000, -1300, 450, 1750, 2300];
            // TREES
            var treePositionsX = [78, -50, 50, 150, 30, 100, -100, 60, -210, 217, -78, 30, -200, 0, 20];
            var treePositionsZ = [-2000, -17590, -2100, 1592, -1345, -1001, -800, 300, 120, 1590, 2000, -950, -900, -925];
            // SNOWMEN
            var snowmanPositionsX = [];
            var snowmanPositionsZ = [];
            // GUARDS
            var guardPositionsX = [200, 100, -150, 20, -150, 0, 150];
            var guardPositionsZ = [-2450, -2450, -2450, -2450, -1700, -1700, -1700];
            break;
    }
    // -------------------------------------------------------------
    // Here begins a function that we will 'call' just after it's built
    //------------------------------------------------------------------------------------
    var createScene = function() {
        var scene = new BABYLON.Scene(engine);
        scene.fogMode = BABYLON.Scene.FOGMODE_EXP;
        scene.fogDensity = 0.003;
        scene.fogColor = new BABYLON.Color3(0.862745, 0.862745, 0.862745);
        scene.clearColor = new BABYLON.Color3(.5, .5, .5);
        camera = new BABYLON.ArcRotateCamera("camera1", 0, 0, 0, new BABYLON.Vector3(0, 0, 0), scene);
        camera.setPosition(new BABYLON.Vector3(0, 50, -100)); //0, 50, -100?
        camera.attachControl(canvas, true);
        var light0 = new BABYLON.HemisphericLight("Hemi0", new BABYLON.Vector3(1, 1, 0), scene);
        var light1 = new BABYLON.HemisphericLight("Hemi0", new BABYLON.Vector3(-1, 1, 0), scene);
        deathByTree = new BABYLON.Sound("deathByTree", "./sounds/Crash_07.wav", scene);
        deathByYeti = new BABYLON.Sound("eaten", "./sounds/DinosaurDesign10.wav", scene);
        bgMusic = new BABYLON.Sound("bgMusic", "./sounds/Escape_Looping.mp3", scene, null, {
            loop: true,
            autoplay: true
        });
        bgWind = new BABYLON.Sound("bgWind", "./sounds/bestWind.mp3", scene, null, {
            loop: true,
            autoplay: true
        });
        var groundMaterial = new BABYLON.StandardMaterial("ground", scene);
        groundMaterial.diffuseTexture = new BABYLON.Texture("./textures/snow2.jpg", scene);
        groundMaterial.bumpTexture = new BABYLON.Texture("./textures/normalMap.jpg", scene);
        groundMaterial.emissiveColor = new BABYLON.Color3
        groundMaterial.diffuseTexture.uScale = 5.0; //Repeat 5 times on the Vertical Axes
        groundMaterial.diffuseTexture.vScale = 10.0; //Repeat 10 times on the Horizontal Axes
        var ground = BABYLON.Mesh.CreateGround("ground", width, length, 2, scene);
        ground.material = groundMaterial;
        ground.rotation.x = glMatrix.toRadian(slope);
        // MESH IMPORTS
        BABYLON.SceneLoader.ImportMesh("", "", "assets/dia.babylon", scene, function(newMeshes) {
            dia = newMeshes[0];
            camera.target = dia;
            dia.scaling.x = 10;
            dia.scaling.y = 4;
            dia.scaling.z = 3;
            dia.position.z = -length / 2 + 100;
            dia.position.y = -dia.position.z * Math.tan(glMatrix.toRadian(slope)) + 3;
            dia.rotation.x = glMatrix.toRadian(-90 + slope);
        });
        BABYLON.SceneLoader.ImportMesh("", "", "assets/test-kamensneg.babylon", scene, function(newMeshes) {
            rock = newMeshes[0];
            rock.scaling.x = 10;
            rock.scaling.y = 10;
            rock.scaling.z = 10;
            for (var j = 0; j < rockPositionsX.length;) {
                var newRock = rock.createInstance("i" + j);
                newRock.position.x = rockPositionsX[j];
                newRock.position.z = rockPositionsZ[j];
                newRock.position.y = -newRock.position.z * Math.tan(glMatrix.toRadian(slope)) + 6;
                newRock.rotation.x = glMatrix.toRadian(-slope);
                rocks.push(newRock);
                j++;
            }
        });
        BABYLON.SceneLoader.ImportMesh("", "", "assets/mountain1.babylon", scene, function(newMeshes) {
            newMeshes[0].scaling = new BABYLON.Vector3(55, 55, 55);
            newMeshes[0].rotation.y = glMatrix.toRadian(90);
            newMeshes[0].position = new BABYLON.Vector3(280, -75, 0);
            mont = newMeshes[0];
            for (var j = -2300; j < 2500;) {
                var newMont = mont.createInstance("i" + j);
                newMont.position = new BABYLON.Vector3(280, (-j * Math.tan(glMatrix.toRadian(slope)) - 75), j);
                sides.push(newMont);
                j += 500;
            }
        });
        BABYLON.SceneLoader.ImportMesh("", "", "assets/mountainLeft.babylon", scene, function(newMeshes) {
            newMeshes[0].scaling = new BABYLON.Vector3(55, 55, 55);
            newMeshes[0].rotation.y = glMatrix.toRadian(90);
            newMeshes[0].position = new BABYLON.Vector3(-280, -75, 0);
            mont = newMeshes[0];
            for (var j = -2300; j < 2500;) {
                var newMont = mont.createInstance("i" + j);
                newMont.position = new BABYLON.Vector3(-280, (-j * Math.tan(glMatrix.toRadian(slope)) - 75), j); 
                sides.push(newMont);
                j += 500;
            }
        });
        BABYLON.SceneLoader.ImportMesh("", "", "assets/block.babylon", scene, function(newMeshes) {
            snowPile = newMeshes[0];
            snowPile.scaling.x = 200;
            snowPile.scaling.y = 200;
            snowPile.scaling.z = 200;
            snowPile.position.x = snowPilePositionsX[0];
            snowPile.position.z = snowPilePositionsZ[0];
            snowPile.position.y = -snowPile.position.z * glMatrix.toRadian(slope) + 10; 
            snowPiles.push(snowPile);
            for (var j = 1; j < snowPilePositionsX.length;) {
                var newSnowPile = snowPile.createInstance("i" + j);
                newSnowPile.position.x = snowPilePositionsX[j];
                newSnowPile.position.z = snowPilePositionsZ[j]; 
                newSnowPile.position.y = -newSnowPile.position.z * glMatrix.toRadian(slope) + 10; 
                snowPiles.push(newSnowPile);
                j++;
            }
        });
        BABYLON.SceneLoader.ImportMesh("", "", "assets/snowmanstl.babylon", scene, function(newMeshes) {
            snowman = newMeshes[0];
            snowman.scaling.x = 0.4;
            snowman.scaling.y = 0.4;
            snowman.scaling.z = 0.4;
            snowman.position.x = snowmanPositionsX[snowmanCtr]; 
            snowman.position.z = snowmanPositionsZ[snowmanCtr]; 
            snowman.position.y = (-snowman.position.z * glMatrix.toRadian(slope)) + 17;
            for(var j = 0; j < snowManPositionsX.length; ){
                var newSnowman = snowman.createInstance("i" + j);
                newSnowman.position.x = snowManPositionsX[j];//+ 50;
                newSnowman.position.z = snowManPositionsZ[j];//+ 50;
                newSnowman.position.y = -newSnowman.position.z * Math.tan(glMatrix.toRadian(slope)) + 17;
                snowmen.push(newSnowman);
                j++;
      }
        });
        BABYLON.SceneLoader.ImportMesh("", "", "assets/snowtree.babylon", scene, function(newMeshes) { 
            tree = newMeshes[0];
            tree.scaling.x = 3;
            tree.scaling.y = 3;
            tree.scaling.z = 3;
            for (var j = 0; j < treePositionsX.length;) {
                var newTree = tree.createInstance("i" + j);
                newTree.position.x = treePositionsX[j];
                newTree.position.z = treePositionsZ[j];
                newTree.position.y = -newTree.position.z * Math.tan(glMatrix.toRadian(slope)) + 4;
                trees.push(newTree);
                j++;
            }
        });
        BABYLON.SceneLoader.ImportMesh("", "", "assets/yeti.babylon", scene, function(newMeshes) { 
            guard = newMeshes[0];
            guard.scaling = new BABYLON.Vector3(2, 5, 5);
            guard.rotation.y = glMatrix.toRadian(-90);
            for (var g = 0; g < guardPositionsX.length;) {
                var newGuard = guard.createInstance("i" + g);
                newGuard.position.x = guardPositionsX[g];
                newGuard.position.z = guardPositionsZ[g];
                newGuard.position.y = -newGuard.position.z * Math.tan(glMatrix.toRadian(slope)) + 4;
                guards.push(newGuard);
                guards.push(-5000);
                g++
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
        return scene;
    };
    var moveRight = false;
    var moveLeft = false;
    window.addEventListener('keydown', function(event) {
        switch (event.keyCode) {
            case 65:
                moveLeft = true;
                break;
            case 68:
                moveRight = true;
                break;
            case 83:
                speed = originalSpeed / 2;
                break;
            case 87:
                dia.position.y += 40;
                break;
        }
    }, false);
    window.addEventListener('keyup', function(event) {
        switch (event.keyCode) {
            case 65:
                moveLeft = false;
                break;
            case 68: 
                moveRight = false;
                break;
            case 83:
                speed = originalSpeed;
                break;
        }
    }, false);    
    //ANIMATION ============================================================================================== CHANGE STAGE
    var accel = 0;
    var scene = createScene();
    engine.runRenderLoop(function() {
        if (scene.isReady()) {
            if (dia.position.z > length / 2 - 75) { 
                engine.stopRenderLoop();
                camera.dispose();
                scene.dispose();
                changeStage();
            }
            dia.position.z += speed;
            dia.position.y = -dia.position.z * Math.tan(glMatrix.toRadian(slope)) + 2;
            if (dia.position.x > -225 && dia.position.x < 225) {
                if (moveRight) {
                    dia.position.x += speed / 2;
                    dia.rotation.y = glMatrix.toRadian(20);
                }
                if (moveLeft) {
                    dia.position.x -= speed / 2;
                    dia.rotation.y = glMatrix.toRadian(-20);
                }
                if (!moveLeft && !moveRight) {
                    dia.rotation.y = glMatrix.toRadian(0);
                }
            } else if (dia.position.x <= -225) {
                if (moveRight) {
                    dia.position.x += speed / 2;
                    dia.rotation.y = glMatrix.toRadian(20);
                }
                if (!moveLeft && !moveRight) {
                    dia.rotation.y = glMatrix.toRadian(0);
                }
            } else if (dia.position.x >= 225) {
                if (moveLeft) {
                    dia.position.x -= speed / 2;
                    dia.rotation.y = glMatrix.toRadian(-20);
                }
                if (!moveLeft && !moveRight) {
                    dia.rotation.y = glMatrix.toRadian(0);
                }
            }
            for (var i = 0; i < trees.length; i++) {
                if (dia.intersectsMesh(trees[i], false)) {
                    deathByTree.play();
                    engine.stopRenderLoop();
                    bgMusic.stop();
                    bgWind.stop();
                    gameOver();
                }
            }
            for (var i = 0; i < snowPiles.length; i++) {
                if (dia.intersectsMesh(snowPiles[i], false)) {
                    deathByTree.play();
                    engine.stopRenderLoop();
                    bgMusic.stop();
                    bgWind.stop();
                    gameOver();
                }
            }
            for (var i = 0; i < rocks.length; i++) {
                if (dia.intersectsMesh(rocks[i], false)) {
                    deathByTree.play();
                    engine.stopRenderLoop();
                    bgMusic.stop();
                    bgWind.stop();
                    gameOver();
                }
            }
            //CHASE
            for (var g = 1; g < guards.length; g += 2) {
                if (guards[g - 1].position.z < dia.position.z - 50) {
                    guards[g] = 5000;
                }
                if (guards[g] == 5000) {
                    if (Math.floor(guards[g - 1].position.x) > Math.floor(dia.position.x) + 5) {
                        guards[g - 1].position.x -= 0.3;
                    } else if (Math.floor(guards[g - 1].position.x) < Math.floor(dia.position.x) - 5) {
                        guards[g - 1].position.x += 0.3;
                    }
                    if (guards[g - 1].position.z >= dia.position.z && guards[g - 1].position.z < dia.position.z + 2) {
                        guards[g - 1].position.z = dia.position.z;
                    } else {
                        guards[g - 1].position.z += speed + 0.075;
                        guards[g - 1].position.y = -guards[g - 1].position.z * Math.tan(glMatrix.toRadian(slope)) + 5;
                    }
                }
                //guard intersects        
                if (dia.intersectsMesh(guards[g - 1], false)) {
                    deathByYeti.play();
                    engine.stopRenderLoop();
                    bgMusic.stop();
                    bgWind.stop();
                    gameOver();
                }
                for (var i = 0; i < rocks.length; i++) {
                    if (guards[g - 1].intersectsMesh(rocks[i], false)) {
                        guards[g - 1].dispose();
                    }
                }
                for (var i = 0; i < trees.length; i++) {
                    if (guards[g - 1].intersectsMesh(trees[i], false)) {
                        guards[g - 1].dispose();
                    }
                }
                for (var i = 0; i < snowPiles.length; i++) {
                    if (guards[g - 1].intersectsMesh(snowPiles[i], false)) {
                        guards[g - 1].dispose();
                    }
                }
            }
        }
        scene.render();
    });
    // Watch for browser/canvas resize events
    window.addEventListener("resize", function() {
        engine.resize();
    });
} //===@===@===@===@===@===@===@===@===@=== END OF PROGRAM ===@===@===@===@===@===@===@===@===@===
