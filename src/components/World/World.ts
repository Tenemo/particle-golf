import {
    PerspectiveCamera,
    Scene,
    WebGLRenderer,
    AxesHelper,
    Vector3,
} from 'three';

import { createCamera } from './items/camera';
import { createCube } from './items/cube';
import { createScene } from './items/scene';
import { createLights } from './items/lights';

import { createRenderer } from './systems/renderer';
import { Resizer } from './systems/Resizer';
import { createControls } from './systems/controls';
import { Loop } from './systems/Loop';

import { AnimatedMesh, DampenedControls } from './types';

let camera: PerspectiveCamera;
let renderer: WebGLRenderer;
let scene: Scene;
let cube: AnimatedMesh;
let sceneContainer: HTMLScriptElement;
let loop: Loop;
let controls: DampenedControls;

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

        const light = createLights();

        loop.updatables.push(cube);

        const axesHelper = new AxesHelper(500);

        scene.add(cube, light, axesHelper);

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
        controls.moveCamera(new Vector3(1, 1, 20), new Vector3(0, 0, 0));
    };
}

export default World;
