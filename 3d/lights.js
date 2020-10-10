import * as THREE from "https://unpkg.com/three@0.121.1/build/three.module.js";

const initLights = () => {
  const ambientLight = new THREE.AmbientLight(0x222222);
  const particleLight = new THREE.Mesh(
    new THREE.SphereBufferGeometry(0.1, 0.1, 0.1),
    new THREE.MeshBasicMaterial({ color: 0xffffff })
  );
  const pointLight = new THREE.PointLight(0xffffff, 2, 800);
  particleLight.add(pointLight);
  particleLight.position.set(1, 1, 2);

  return { particleLight, ambientLight };
};

export default initLights;
