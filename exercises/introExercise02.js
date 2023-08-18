import * as THREE from  'three';
import { OrbitControls } from '../build/jsm/controls/OrbitControls.js';
import {initRenderer, 
        initCamera,
        initDefaultBasicLight,
        setDefaultMaterial,
        InfoBox,
        onWindowResize,
        createGroundPlaneXZ} from "../libs/util/util.js";
import { CylinderGeometry, SphereGeometry } from '../build/three.module.js';

let scene, renderer, camera, material,material1,material2, light, orbit;; // Initial variables
scene = new THREE.Scene();    // Create main scene
renderer = initRenderer();    // Init a basic renderer
camera = initCamera(new THREE.Vector3(0, 15, 30)); // Init camera in this position
material = setDefaultMaterial("lightblue");
material1 = setDefaultMaterial("rgb(255,0,0)");
material2 = setDefaultMaterial("green"); // create a basic material
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

// create a cube
let cubeGeometry = new THREE.BoxGeometry(4, 4, 4);
let cube = new THREE.Mesh(cubeGeometry, material2);
let cylinderGeometry = new THREE.CylinderGeometry(2, 2, 5,28);
let cylinder = new THREE.Mesh(cylinderGeometry, material1);
let sphereGeometry = new THREE.SphereGeometry(2, 15, 16);
let sphere = new THREE.Mesh(sphereGeometry, material);
// position the cube
cube.position.set(2.0, 1.9, 0.0);
cylinder.position.set(2.0, 2.5, 6.0);
sphere.position.set(2.0, 1.8, -6.0);
// add the cube to the scene
scene.add(cube);
scene.add(cylinder);
scene.add(sphere);

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