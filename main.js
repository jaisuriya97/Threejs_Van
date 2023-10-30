import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import './style.css';


const scene = new THREE.Scene();

const ambientLight = new THREE.AmbientLight(0xffffff, 5);
scene.add(ambientLight);
const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5);
directionalLight.position.set(1, 1, 1);
directionalLight.castShadow = true;
directionalLight.shadow.camera.near = 0.1;
directionalLight.shadow.camera.far = 100;

scene.add(directionalLight);

let object;
const loader = new GLTFLoader();
loader.load(
  `models/Ben10/scene.gltf`,
  function (gltf){
    object = gltf.scene;
    object.castShadow = true;
    object.receiveShadow = true;
    object.rotation.set(0, -Math.PI / 4, 0); // Rotate 90 degrees to the left
    scene.add(object);
  },
  function (xhr){
    console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
  },
  function (error){
    console.log("An error happened");
  }
  )
  const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
  };

const camera = new THREE.PerspectiveCamera(18, sizes.width / sizes.height, 0.1, 100);
camera.position.set(0, 0, 20);
scene.add(camera);

const canvas = document.querySelector(".webgl");
const renderer = new THREE.WebGLRenderer({ canvas, });
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(2);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.setClearColor('#dbdbd8');
renderer.render(scene, camera)
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
// controls.autoRotate = true;
// controls.autoRotateSpeed = 1;
controls.enablePan = false;
controls.enableZoom = false;

window.addEventListener("resize", () => {
  sizes.width = window.innerWidth,
    sizes.height = window.innerHeight


  camera.updateProjectionMatrix()
  camera.aspect = sizes.width / sizes.height

  renderer.setSize(sizes.width, sizes.height)
})



const loop = () => {
  controls.update()
  renderer.render(scene, camera)
  window.requestAnimationFrame(loop)
}
loop()
