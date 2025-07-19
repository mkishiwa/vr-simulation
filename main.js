let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);

let renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

let geometry = new THREE.CylinderGeometry(5, 5, 200, 32, 32, true);
let material = new THREE.MeshBasicMaterial({ color: 0x00ffcc, wireframe: true, side: THREE.BackSide });
let tunnel = new THREE.Mesh(geometry, material);
tunnel.rotation.x = Math.PI / 2;
scene.add(tunnel);

camera.position.z = 0;
let isAnimating = false;
let isMovingMode = true;
const resetLimit = 100;

function animate() {
  if (isAnimating && isMovingMode) {
    tunnel.position.z += 0.1;
    if (tunnel.position.z > resetLimit) {
      tunnel.position.z = 0;
    }
  }
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

document.getElementById('startButton').addEventListener('click', function () {
  isAnimating = true;
  this.style.display = 'none';
  document.getElementById('stopButton').style.display = 'inline-block';
});

document.getElementById('stopButton').addEventListener('click', function () {
  isAnimating = false;
  this.style.display = 'none';
  document.getElementById('startButton').style.display = 'inline-block';
});

document.getElementById('enterButton').addEventListener('click', function () {
  document.getElementById('welcomeScreen').style.display = 'none';
  document.getElementById('controls').style.display = 'block';
});

document.getElementById('modeToggle').addEventListener('click', function () {
  isMovingMode = !isMovingMode;
  if (isMovingMode) {
    this.textContent = 'Toggle Mode: Moving';
  } else {
    this.textContent = 'Toggle Mode: Static';
  }
});

animate();
