import * as THREE from  'three';
import { OrbitControls } from '../build/jsm/controls/OrbitControls.js';
import {initRenderer, 
        initCamera,
        initDefaultBasicLight,
        setDefaultMaterial,
        InfoBox,
        onWindowResize,
        createGroundPlaneXZ} from "../libs/util/util.js";

let scene, renderer, camera, material, light, orbit;; // Initial variables
scene = new THREE.Scene();    // Create main scene
renderer = initRenderer();    // Init a basic renderer
camera = initCamera(new THREE.Vector3(0, 15, 30)); // Init camera in this position
material = setDefaultMaterial("yellow"); // create a basic material
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

// position the cube
var a = 16.0;
var b = 2.0;
var c = -8.0;
for (var i = 0; i < 9; i++) {
  // create a cube
  let cubeGeometry = new THREE.BoxGeometry(4, 4, 4);
  let cube = new THREE.Mesh(cubeGeometry, material);
  if (i < 3) {
    a = a - 8.0;
    cube.position.set(a, b, c);
  } else
    if (i >= 3 && i < 6) {
      c = 0.0;
      cube.position.set(a, b, c);
      a = a + 8.0;
    } else
      if (i >= 6 && i < 9) {
        c = 8.0;
        a = a - 8.0;
        cube.position.set(a, b, c);
      }
  // add the cube to the scene
  scene.add(cube);
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