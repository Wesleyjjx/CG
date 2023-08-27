import * as THREE from  'three';
import { OrbitControls } from '../build/jsm/controls/OrbitControls.js';
import {initRenderer, 
        initCamera,
        initDefaultBasicLight,
        setDefaultMaterial,
        InfoBox,
        onWindowResize,
        createGroundPlaneXZ} from "../libs/util/util.js";

let scene, renderer, camera, material, light, orbit; // Initial variables
scene = new THREE.Scene();    // Create main scene
renderer = initRenderer();    // Init a basic renderer
camera = initCamera(new THREE.Vector3(0, 15, 30)); // Init camera in this position
material = setDefaultMaterial(); // create a basic material
light = initDefaultBasicLight(scene); // Create a basic light to illuminate the scene
orbit = new OrbitControls( camera, renderer.domElement ); // Enable mouse rotation, pan, zoom etc.

// Listen window size changes
window.addEventListener( 'resize', function(){onWindowResize(camera, renderer)}, false );

// Show axes (parameter is size of each axis)
let axesHelper = new THREE.AxesHelper( 12 );
scene.add( axesHelper );

// create the ground plane
let plane = createGroundPlaneXZ(20, 20)
scene.add(plane);
var a,b;
a = 0;
b = -7;
// create sphere
let angle = THREE.MathUtils.degToRad(35);
let angle1 = THREE.MathUtils.degToRad(30);
for (var i = 0; i < 12; i++) {
  let sphereGeometry = new THREE.SphereGeometry(2, 15, 16);
  let sphere = new THREE.Mesh(sphereGeometry, material);
  scene.add(sphere);
  sphere.scale.set(0.25, 0.3, 0.3);
  if (i < 6) {
    sphere.rotateY(angle);
    sphere.translateY(0.5);
    sphere.translateX(6);
    sphere.translateZ(4);
    angle = angle - angle1;
  }
  if (i >= 6) {
    angle = angle + angle1;
    sphere.rotateY(angle);
    sphere.translateY(0.5);
    sphere.translateX(-6);
    sphere.translateZ(-4);
  }
}

// Use this to show information onscreen
let controls = new InfoBox();
  controls.add("Basic Scene");
  controls.addParagraph();
  controls.add("Use mouse to interact:");
  controls.add("* Left button to rotate");
  controls.add("* Right button to translate (pan)");
  controls.add("* Scroll to zoom in/out.");
  controls.show();

render();
function render()
{
  requestAnimationFrame(render);
  renderer.render(scene, camera) // Render scene
}