import * as THREE from 'three';
import GUI from '../libs/util/dat.gui.module.js'
import {TrackballControls} from '../build/jsm/controls/TrackballControls.js';
import {initRenderer, 
        initDefaultSpotlight,
        initCamera,
        createGroundPlane,
        onWindowResize} from "../libs/util/util.js";

let scene    = new THREE.Scene();    // Create main scene
let renderer = initRenderer();    // View function in util/utils
let light    = initDefaultSpotlight(scene, new THREE.Vector3(7.0, 7.0, 7.0)); 
let camera   = initCamera(new THREE.Vector3(3.6, 4.6, 8.2)); // Init camera in this position
let trackballControls = new TrackballControls(camera, renderer.domElement );

var posicaoX=-3;
var posicaoX2=-3;
var posicaoZ= 3;
var speed = 0.1;
var speed1 = 0.15;

// Show axes 
let axesHelper = new THREE.AxesHelper( 5 );
  axesHelper.translateY(0.1);
scene.add( axesHelper );

// Listen window size changes
window.addEventListener( 'resize', function(){onWindowResize(camera, renderer)}, false );

let groundPlane = createGroundPlane(10, 10, 40, 40); // width, height, resolutionW, resolutionH
  groundPlane.rotateX(THREE.MathUtils.degToRad(-90));
scene.add(groundPlane);

// Create sphere
  let geometry = new THREE.SphereGeometry(0.2, 32, 16);
  let material = new THREE.MeshPhongMaterial({ color: "red", shininess: "200" });
  let obj = new THREE.Mesh(geometry, material);
  obj.castShadow = true;
  obj.position.set(-3, 0.2, 3);
  scene.add(obj);

  let geometry1 = new THREE.SphereGeometry(0.2, 32, 16);
  let material1 = new THREE.MeshPhongMaterial({ color: "red", shininess: "200" });
  let obj1 = new THREE.Mesh(geometry1, material1);
  obj1.castShadow = true;
  obj1.position.set(-3, 0.2, -3);
  scene.add(obj1);
  
var animationOn1 = true;
var animationOn2 = true;

buildInterface();
render();

function translateSphere()
{
  // More info:
  // https://threejs.org/docs/#manual/en/introduction/Matrix-transformations
  obj.matrixAutoUpdate = false;
  obj1.matrixAutoUpdate = false;
  var mat4 = new THREE.Matrix4();
  if (animationOn1) {
    posicaoX += speed;

    obj.matrix.identity();  // reset matrix

      obj.matrix.multiply(mat4.makeTranslation(posicaoX, 0.2, posicaoZ)); 
  }
    if (animationOn2) {
      posicaoX2 += speed1;
      obj1.matrix.identity(); //reset
      obj1.matrix.multiply(mat4.makeTranslation(posicaoX2, 0.2, -posicaoZ));
    } 
    if (posicaoX >= 4) {
      obj.matrix.makeTranslation(4, 0.2, 3);
    }
    if (posicaoX2 >= 4) {
      obj1.matrix.makeTranslation(4, 0.2, -3);
    }
  
}
function buildInterface() {
  var controls = new function () {
    this.onMoveObject = function () {
      animationOn1 = !animationOn1;
    };
    this.onMoveObject1 = function () {
      animationOn2 = !animationOn2;
   };
   this.resetObject = function () {
    obj.updateMatrix();
    obj1.updateMatrix();
    posicaoX = -3;
    posicaoX2= -3;
    animationOn1 = false;
    animationOn2 = false;
    };
  };
  let gui = new GUI();
  gui.add(controls, "onMoveObject1", true).name("Esfera1");
  gui.add(controls, "onMoveObject", true).name("Esfera2");
  gui.add(controls, "resetObject", true).name("Reset");
}

function render() {
  trackballControls.update();
  translateSphere();
  requestAnimationFrame(render);
  renderer.render(scene, camera) // Render scene
}