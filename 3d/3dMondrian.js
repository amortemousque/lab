// Find the latest version by visiting https://unpkg.com/three. The URL will
// redirect to the newest stable release.
import * as THREE from "https://unpkg.com/three@0.121.1/build/three.module.js";
import { OrbitControls } from "https://unpkg.com/three@0.121.1/examples/jsm/controls/OrbitControls.js";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(95, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);

const mondrian = new THREE.Group();

const depth = 0;
const gap = 0.1;
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
    new THREE.MeshBasicMaterial({ color: color })
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
// const calculatePosition = (cube, position) => {
//   // vector.copy(cube.position);
//   // cube.parent.worldToLocal(vector);
//   // console.log(vector);
//   //  position.setFromMatrixPosition(scene.getObjectByName("cube1").matrixWorld);

//   // alert(position.x + "," + position.y + "," + position.z);

//   if (cube.position.x < position.x && position.x > 0) cube.position.x += 0.03;
//   if (cube.position.x > position.x && position.x < 0) cube.position.x -= 0.03;

//   if (cube.position.y < position.y && position.y > 0) cube.position.y += 0.03;
//   if (cube.position.y > position.y && position.y < 0) cube.position.y -= 0.03;
// };
for (let [cube, position] of positions) {
  setPosition(cube, position);
}

controls.update();

const animate = function () {
  requestAnimationFrame(animate);
  controls.update();

  // mondrian.getObjectByName("huge-white").rotation.x += 0.01;
  // mondrian.getObjectByName("huge-white").rotation.y += 0.01;

  renderer.render(scene, camera);
};

animate();
new THREE.Box3().setFromObject(mondrian).getCenter(mondrian.position).multiplyScalar(-1);
