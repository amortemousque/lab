import * as THREE from "https://unpkg.com/three@0.121.1/build/three.module.js";
import { pieces } from "../common/mondrian-data.js";
const depth = 0.1;
const gap = 0.15;
const mondrian = new THREE.Group();

const convertUnitToDimension = (uW, uH) => {
  const unitW = 0.9;
  const unitH = 0.8;

  return [unitW * uW + (uW - 1) * gap, unitH * uH + (uH - 1) * gap];
};

const createCube = (name, color, { w, h }) => {
  let [width, height] = convertUnitToDimension(w, h);
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

const initPainting = () => {
  for (const piece of pieces) {
    const { name, color, dimension } = piece;
    const cube = createCube(name, color, dimension);
    setPosition(cube, piece.position);
    mondrian.add(cube);
  }
  return mondrian;
};

export default initPainting;
