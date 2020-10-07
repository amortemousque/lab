// Find the latest version by visiting https://unpkg.com/three. The URL will
// redirect to the newest stable release.
import * as THREE from "https://unpkg.com/three@0.121.1/build/three.module.js";

document.addEventListener("mousedown", onDocumentMouseDown, false);

var projector = new THREE.Projector();

function onDocumentMouseDown(event) {
  event.preventDefault();

  var vector = new THREE.Vector3(
    (event.clientX / window.innerWidth) * 2 - 1,
    -(event.clientY / window.innerHeight) * 2 + 1,
    0.5
  );
  projector.unprojectVector(vector, camera);

  var ray = new THREE.Ray(camera.position, vector.subSelf(camera.position).normalize());

  var intersects = ray.intersectObjects(objects);

  if (intersects.length > 0) {
    intersects[0].object.materials[0].color.setHex(Math.random() * 0xffffff);

    var particle = new THREE.Particle(particleMaterial);
    particle.position = intersects[0].point;
    particle.scale.x = particle.scale.y = 8;
    scene.add(particle);
  }
}

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const shift = 1;
const depth = 0;
const gutter = 0.6;
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube1 = new THREE.Mesh(
  new THREE.BoxGeometry(0.9, 1.7, depth),
  new THREE.MeshBasicMaterial({ color: 0x0384fc })
);
const cube2 = new THREE.Mesh(
  new THREE.BoxGeometry(1.9, 1.7, depth),
  new THREE.MeshBasicMaterial({ color: 0xffffff })
);
const cube3 = new THREE.Mesh(
  new THREE.BoxGeometry(1.9, 0.8, depth),
  new THREE.MeshBasicMaterial({ color: 0xeefe00 })
);
const cube4 = new THREE.Mesh(
  new THREE.BoxGeometry(1.9, 0.8, depth),
  new THREE.MeshBasicMaterial({ color: 0xffffff })
);
const cube5 = new THREE.Mesh(
  new THREE.BoxGeometry(1.9, 3.5, depth),
  new THREE.MeshBasicMaterial({ color: 0xffffff })
);

const cube6 = new THREE.Mesh(
  new THREE.BoxGeometry(0.9, 1.7, depth),
  new THREE.MeshBasicMaterial({ color: 0xffffff })
);
const cube7 = new THREE.Mesh(
  new THREE.BoxGeometry(3.9, 1.7, depth),
  new THREE.MeshBasicMaterial({ color: 0xff0604 })
);

scene.add(cube1);
scene.add(cube2);
scene.add(cube3);
scene.add(cube4);
scene.add(cube5);
scene.add(cube6);
scene.add(cube7);

cube1.position.x = 0 - shift;
cube2.position.x = cube1.position.x + 0.9 + gutter;
cube3.position.x = cube2.position.x + 1.4 + gutter;
cube3.position.y -= 0.45;

cube4.position.x = cube2.position.x + 1.4 + gutter;
cube4.position.y = 0.45;

cube5.position.x = cube4.position.x + 1.9 + 0.1;
cube5.position.y = -0.9;

cube6.position.x = 0 - shift;
cube6.position.y = -1.8;

cube7.position.x = cube1.position.x + 1.9 + gutter;
cube7.position.y = -1.8;

camera.position.z = 5;

const animate = function () {
  requestAnimationFrame(animate);
  cube1.rotation.x += 0.01;
  cube1.rotation.y += 0.01;

  renderer.render(scene, camera);
};

animate();
