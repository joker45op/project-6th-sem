import './style.css'

import * as THREE from 'three'
import { PointLight } from 'three/src/lights/PointLight'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { GridHelper, PointLightHelper } from 'three'
import { FirstPersonControls } from 'three/examples/jsm/controls/FirstPersonControls'
import { AmbientLight } from 'three'


// scene
const scene = new THREE.Scene()
scene.background = new THREE.Color(0x00f5ff)

// camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100)
camera.position.z = 2.7
camera.position.y = 3.2
camera.lookAt(0, 0.75, 0)

// renderer
const renderer = new THREE.WebGL1Renderer({ canvas: document.querySelector('#bg') })
renderer.setSize(window.innerWidth, window.innerHeight)
// document.body.appendChild(renderer.domElement)

// plane
const planeGeometry = new THREE.BoxGeometry(30, 0.01, 30)
const planeMaterial = new THREE.MeshStandardMaterial({ color: 0xbb9a59 })
const plane = new THREE.Mesh(planeGeometry, planeMaterial)
scene.add(plane)

// point light
const plight = new PointLight(0xffffff)
plight.position.set(5, 10, 2)
scene.add(plight)

const plightHelper = new PointLightHelper(plight)
scene.add(plightHelper)

//ambient light
const alight = new AmbientLight(0xffffff)
scene.add(alight)

// character
let character
const loader = new GLTFLoader()
loader.load('/character/scene.gltf',
    (obj) => {
        character = obj.scene
        character.position.y = 0.005
        character.scale.set(0.1, 0.1, 0.1)
        scene.add(character)
    },
    (xhr) => {
        console.log(xhr)
    },
    (err) => {
        console.log(err)
    }
)

window.addEventListener('keypress', (e) => {
    if (e.key === 'w' || e.key === 'W') {
        character.rotation.y = Math.PI / 2
        character.position.z -= 0.05
        camera.position.z -= 0.05
    }
    if (e.key === 'a' || e.key === 'A') {
        character.position.x -= 0.05
        camera.position.x -= 0.05
        character.rotation.y = Math.PI
    }
    if (e.key === 'd' || e.key === 'D') {
        character.position.x += 0.05
        camera.position.x += 0.05
        character.rotation.y = 0
    }
    if (e.key === 's' || e.key === 'S') {
        character.rotation.y = -Math.PI / 2
        character.position.z += 0.05
        camera.position.z += 0.05
    }
})

function animate() {
    renderer.render(scene, camera)
    requestAnimationFrame(animate)
}
animate()