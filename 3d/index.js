import * as THREE from "https://unpkg.com/three@0.121.1/build/three.module.js";
import { OrbitControls } from "https://unpkg.com/three@0.121.1/examples/jsm/controls/OrbitControls.js";
import initLights from "./lights.js";
import initPainting from "./painting.js";

const animate = function () {
  requestAnimationFrame(animate);
  controls.update();
  var timer = Date.now() * 0.00025;

  particleLight.position.x = Math.sin(timer * 7) * 3;
  particleLight.position.y = Math.cos(timer * 5) * 5;
  particleLight.position.z = Math.abs(Math.cos(timer * 3)) * 2 + 0.1;
  renderer.render(scene, camera);
};

const container = document.getElementsByTagName("main")[0];
const { offsetWidth, offsetHeight } = container;
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x181919);
const camera = new THREE.PerspectiveCamera(90, offsetWidth / container.offsetHeight, 0.1, 1000);
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer();
renderer.outputEncoding = THREE.sRGBEncoding;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 0.75;
renderer.setSize(offsetWidth, offsetHeight);
renderer.setPixelRatio(window.devicePixelRatio);

container.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);

const mondrian = initPainting();
const { particleLight, ambientLight } = initLights();

scene.add(mondrian);
scene.add(particleLight);
scene.add(ambientLight);

scene.updateMatrixWorld(true);
controls.update();

animate();
new THREE.Box3().setFromObject(mondrian).getCenter(mondrian.position).multiplyScalar(-1);

window.addEventListener("resize", () => {
  camera.aspect = offsetWidth / offsetHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(offsetWidth, offsetHeight);
});
