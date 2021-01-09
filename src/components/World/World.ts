import {
    PerspectiveCamera,
    Scene,
    WebGLRenderer,
    AxesHelper,
    Vector3,
    Group,
} from 'three';

import { createCamera } from './items/camera';
import { createCube } from './items/cube';
import { createScene } from './items/scene';
import { createLights } from './items/lights';

import { createRenderer } from './systems/renderer';
import { Resizer } from './systems/Resizer';
import { createControls } from './systems/controls';
import { Loop } from './systems/Loop';
import { createParticle } from './items/particle';

import { AnimatedMesh, DampenedControls } from './types';

let camera: PerspectiveCamera;
let renderer: WebGLRenderer;
let scene: Scene;
let cube: AnimatedMesh;
let sceneContainer: HTMLScriptElement;
let loop: Loop;
let controls: DampenedControls;
let particleGroup: Group;

class World {
    constructor(container: HTMLScriptElement) {
        sceneContainer = container;
        camera = createCamera();
        scene = createScene();
        renderer = createRenderer();

        container.append(renderer.domElement);

        controls = createControls(camera, renderer.domElement);

        loop = new Loop(camera, scene, renderer, controls);

        cube = createCube();

        const { ambientLight, mainLight } = createLights();

        loop.updatables.push(cube);

        const axesHelper = new AxesHelper(500);

        particleGroup = new Group();

        scene.add(cube, particleGroup, ambientLight, mainLight, axesHelper);

        // eslint-disable-next-line
        new Resizer(sceneContainer, camera, renderer);
    }

    start = (): void => {
        loop.start();
    };

    stop = (): void => {
        loop.stop();
    };

    returnToOrigin = (): void => {
        controls.moveCamera(new Vector3(5, 5, 30), new Vector3(0, 0, 0));
    };

    addParticle = (): void => {
        particleGroup.add(createParticle());
    };
}

export default World;
