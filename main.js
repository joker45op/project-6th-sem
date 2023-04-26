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

const c = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.1, 0.1), new THREE.MeshStandardMaterial({ color: 0x66000000 }))
var pivot = new THREE.Object3D();
c.position.set(0.2, 0.38, 0.2);
pivot.add(c);
// pivot.rotation.y += 0.01;
scene.add(pivot)
// pivot.visible = false

//sceond camera
const camera2 = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100)
const c2Helper = new THREE.CameraHelper(camera2)
// scene.add(c2Helper)


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
scene.updateMatrixWorld(true)

// building
// let building
// const loader2 = new GLTFLoader()
// loader2.load('/character/starting344.gltf',
//     (obj) => {
//         building = obj.scene
//         building.position.y = 0.005
//         building.scale.set(0.1, 0.1, 0.1)
//         scene.add(building)
//     },
//     (xhr) => {
//         console.log(xhr)
//     },
//     (err) => {
//         console.log(err)
//     }
// )


window.addEventListener('keypress', (e) => {
    if (e.key === 'w' || e.key === 'W') {
        let w = s.position
        character.position.set(w.x, w.y, w.z)
    }
    if (e.key === 'a' || e.key === 'A') {
        pivot.rotation.y -= 0.05;
    }
    if (e.key === 'd' || e.key === 'D') {
        pivot.rotation.y += 0.05;
    }
    if (e.key === 's' || e.key === 'S') {
        // pivot.position.z += 0.05
    }
})


const s = new THREE.Mesh(new THREE.SphereGeometry(0.2, 32, 16), new THREE.MeshBasicMaterial({ color: 'green' }));
scene.add(s);
s.visible = false

let r2
function createLine(x1, y1, x2, y2) {
    let d = Math.sqrt(((x2 - x1) ** 2) + ((y2 - y1) ** 2))
    let ext = 0.000000000001
    let extD = (d + ext) / 5
    let x3 = x2 + ((x2 - x1) / d) * extD
    let y3 = y2 + ((y2 - y1) / d) * extD
    return [x3, y3]
}

let charPos = new THREE.Vector3()
let target

function animate() {
    requestAnimationFrame(animate)
    if (character !== undefined) {
        character.rotation.y = Math.PI
        pivot.position.set(character.position.x, character.position.y, character.position.z)
        charPos.copy(c.position)
        charPos.applyMatrix4(c.matrixWorld)
        let pp = createLine(charPos.x, charPos.z, character.position.x, character.position.z)
        s.position.set(pp[0], 0, pp[1])
        character.lookAt(pp[0], 0, pp[1])
        // character.rotation.y+=1.6
        camera2.lookAt(pp[0], 0.5, pp[1])
        camera2.position.set(charPos.x, charPos.y, charPos.z)
    }
    renderer.render(scene, camera2)
}
animate()

document.body.onload = function () {
    async function getData() {
        const res = await fetch("http://localhost:3001/")
        if (!res.ok) throw new Error("error")
        const data = await res.json()
        console.log(data);

        document.querySelector('#welcome').innerHTML = data[0].data
        document.querySelector('#vision').innerHTML = data[1].data
        document.querySelector('#mission1').innerHTML = data[2].data
        document.querySelector('#mission2').innerHTML = data[3].data
        document.querySelector('#mission3').innerHTML = data[4].data
    }
    getData()
}