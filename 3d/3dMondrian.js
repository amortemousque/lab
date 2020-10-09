// Find the latest version by visiting https://unpkg.com/three. The URL will
// redirect to the newest stable release.
import * as THREE from "https://unpkg.com/three@0.121.1/build/three.module.js";
import { OrbitControls } from "https://unpkg.com/three@0.121.1/examples/jsm/controls/OrbitControls.js";
const container = document.getElementsByTagName("main")[0];

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x181919);
const camera = new THREE.PerspectiveCamera(
  90,
  container.offsetWidth / container.offsetHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer();

renderer.outputEncoding = THREE.sRGBEncoding;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 0.75;

renderer.setSize(container.offsetWidth, container.offsetHeight);
renderer.setPixelRatio(window.devicePixelRatio);

container.appendChild(renderer.domElement);
const controls = new OrbitControls(camera, renderer.domElement);

const mondrian = new THREE.Group();
const depth = 0.1;
const gap = 0.15;
camera.position.z = 5;

const convertUnitToDimension = (uW, uH) => {
  const unitW = 0.9;
  const unitH = 0.8;

  return [unitW * uW + (uW - 1) * gap, unitH * uH + (uH - 1) * gap];
};

const createCube = (name, uW, uH, color) => {
  let [width, height] = convertUnitToDimension(uW, uH);
  let cube = new THREE.Mesh(
    new THREE.BoxGeometry(width, height, depth),
    new THREE.MeshPhysicalMaterial({
      color: color,
      metalness: 0,
      roughness: 0.5,
      clearcoat: 1.0,
      clearcoatRoughness: 1.5,
      reflectivity: 1.0,
    })
  );
  cube.name = name;
  return cube;
};

const positions = new Map();
positions.set(createCube("cube1", 1, 2, 0x0384fc), { x: 0, y: 0 });
positions.set(createCube("cube2", 2, 2, 0xffffff), { x: "cube1" });
positions.set(createCube("cube3", 2, 1, 0xeefe00), { x: "cube2", y: 0 });
positions.set(createCube("cube4", 2, 1, 0xffffff), { x: "cube2", y: "cube3" });
positions.set(createCube("cube5", 2, 4, 0xffffff), { x: "cube3", y: 0 });
positions.set(createCube("cube6", 1, 2, 0xffffff), { x: 0, y: "cube1" });
positions.set(createCube("cube7", 4, 2, 0xff0604), { x: "cube6", y: "cube1" });

positions.set(createCube("cube8", 1, 4, 0xffffff), { x: 0, y: "cube6" });
positions.set(createCube("huge-white", 4, 4, 0xffffff), { x: "cube8", y: "cube6" }); // grand blanc
positions.set(createCube("cube10", 2, 2, 0x0384fc), { x: "huge-white", y: "cube6" });
positions.set(createCube("cube11", 2, 2, 0xffffff), { x: "huge-white", y: "cube10" });

positions.set(createCube("small-blue", 1, 1, 0x0384fc), { x: 0, y: "cube11" });
positions.set(createCube("small-white", 2, 1, 0xffffff), { x: "small-blue", y: "cube11" });
positions.set(createCube("big-yellow", 4, 2, 0xeefe00), { x: "small-white", y: "cube11" });
positions.set(createCube("medium-white", 3, 1, 0xffffff), { x: 0, y: "small-blue" });

scene.add(mondrian);
scene.add(new THREE.AmbientLight(0x222222));
const particleLight = new THREE.Mesh(
  new THREE.SphereBufferGeometry(0.1, 0.1, 0.1),
  new THREE.MeshBasicMaterial({ color: 0xffffff })
);
particleLight.position.set(1, 1, 2);
scene.add(particleLight);

var pointLight = new THREE.PointLight(0xffffff, 2, 800);
particleLight.add(pointLight);

scene.updateMatrixWorld(true);

for (let [cube] of positions) {
  mondrian.add(cube);
}

const setPosition = (cube, position) => {
  let x = parseInt(position.x);
  let y = parseInt(position.y);
  const xRef = isNaN(x) ? mondrian.getObjectByName(position.x) : null;
  const yRef = isNaN(y) ? mondrian.getObjectByName(position.y) : null;
  const { width, height } = cube.geometry.parameters;
  if (xRef)
    cube.position.x = xRef.position.x + xRef.geometry.parameters.width / 2 + width / 2 + gap;
  else cube.position.x = (position.x ?? 0) + width / 2;

  if (yRef)
    cube.position.y = -(
      Math.abs(yRef.position.y) +
      yRef.geometry.parameters.height / 2 +
      height / 2 +
      gap
    );
  else cube.position.y = (position.y ?? 0) - height / 2;
};

for (let [cube, position] of positions) {
  setPosition(cube, position);
}

controls.update();

const animate = function () {
  requestAnimationFrame(animate);
  controls.update();
  var timer = Date.now() * 0.00025;

  particleLight.position.x = Math.sin(timer * 7) * 3;
  particleLight.position.y = Math.cos(timer * 5) * 5;
  particleLight.position.z = Math.abs(Math.cos(timer * 3)) * 2 + depth;
  renderer.render(scene, camera);
};

animate();
new THREE.Box3().setFromObject(mondrian).getCenter(mondrian.position).multiplyScalar(-1);

window.addEventListener("resize", () => {
  camera.aspect = container.offsetWidth / container.offsetHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(container.offsetWidth, container.offsetHeight);
});
