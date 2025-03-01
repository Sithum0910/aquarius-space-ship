// Set up scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Add lighting
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(5, 5, 5).normalize();
scene.add(light);

// Load GLB model
const loader = new THREE.GLTFLoader();
let spaceship;

loader.load('aquaris.glb', (gltf) => {
    spaceship = gltf.scene;
    scene.add(spaceship);
}, undefined, (error) => {
    console.error('Error loading GLB model:', error);
});

// Camera position
camera.position.z = 10;

// Animation loop
function animate() {
    requestAnimationFrame(animate);

    // Move spaceship forward
    if (spaceship) {
        spaceship.position.z -= 0.05; // Adjust speed as needed
    }

    // Make camera follow the spaceship
    camera.position.z = spaceship ? spaceship.position.z + 10 : 10;
    camera.lookAt(spaceship ? spaceship.position : new THREE.Vector3(0, 0, 0));

    renderer.render(scene, camera);
}
animate();

// Handle window resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
