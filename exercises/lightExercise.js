import * as THREE from  'three';
import GUI from '../libs/util/dat.gui.module.js'
import { OrbitControls } from '../build/jsm/controls/OrbitControls.js';
import {initRenderer, 
        setDefaultMaterial,
        initDefaultBasicLight,        
        onWindowResize, 
        createLightSphere} from "../libs/util/util.js";
import {loadLightPostScene} from "../libs/util/utilScenes.js";

let scene, renderer, camera, orbit;
scene = new THREE.Scene();    // Create main scene
renderer = initRenderer();    // View function in util/utils
   renderer.setClearColor("rgb(30, 30, 42)");
camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
   camera.lookAt(0, 0, 0);
   camera.position.set(5, 5, 5);
   camera.up.set( 0, 1, 0 );
orbit = new OrbitControls( camera, renderer.domElement ); // Enable mouse rotation, pan, zoom etc.

// Listen window size changes
window.addEventListener( 'resize', function(){onWindowResize(camera, renderer)}, false );

// Show axes (parameter is size of each axis)
let axesHelper = new THREE.AxesHelper( 3 );
  axesHelper.visible = false;
scene.add( axesHelper );


var cylinderGeometry = new THREE.CylinderGeometry(0.15,0.15,0.6);
var cylinderMaterial = new THREE.MeshPhongMaterial({color:'yellow'});
var cylinder = new THREE.Mesh(cylinderGeometry,cylinderMaterial);
scene.add(cylinder);

var cylinderGeometry1 = new THREE.CylinderGeometry(0.15,0.15,0.6);
var cylinderMaterial1 = new THREE.MeshPhongMaterial({color:'purple'});
var cylinder1 = new THREE.Mesh(cylinderGeometry1,cylinderMaterial1);
scene.add(cylinder1);

var cubeGeometry = new THREE.BoxGeometry(0.4,0.6,0.4);
var cubeMaterial = new THREE.MeshPhongMaterial({color:'red'});
var cube = new THREE.Mesh(cubeGeometry,cubeMaterial);
scene.add(cube);

var cubeGeometry1 = new THREE.BoxGeometry(0.4,0.6,0.4);
var cubeMaterial1 = new THREE.MeshPhongMaterial({color:'green'});
var cube1 = new THREE.Mesh(cubeGeometry1,cubeMaterial1);
scene.add(cube1);

cube.position.set(2,0.3,0);
cube1.position.set(2,0.3,1.5);
cylinder.position.set(0.8,0.3,-1.5);
cylinder1.position.set(0.8,0.3,2.0);

let ambientColor = "rgb(80,80,80)";
let ambientLight = new THREE.AmbientLight(ambientColor);
scene.add(ambientLight);
let dirPosition = new THREE.Vector3(2, 2, 4)
const dirLight = new THREE.DirectionalLight('white', 0.2);
dirLight.position.copy(dirPosition);
 //mainLight.castShadow = true;
scene.add(dirLight);  

let position = new THREE.Vector3(2,2,4);
let lightColor = "rgb(255,255,255)";
const spotLight = new THREE.SpotLight(lightColor);
spotLight.position.copy(position);
spotLight.angle = THREE.MathUtils.degToRad(40);
//spotLight.castShadow = true;
scene.add(spotLight);
spotLight.target.position.set(0.0,0.2,1.3);
// Load default scene
loadLightPostScene(scene)

// REMOVA ESTA LINHA APÓS CONFIGURAR AS LUZES DESTE EXERCÍCIO
initDefaultBasicLight(scene);

//---------------------------------------------------------
// Load external objects
buildInterface();
render();

function buildInterface()
{
  // GUI interface
  let gui = new GUI();
}

function render()
{
  requestAnimationFrame(render);
  renderer.render(scene, camera)
}
