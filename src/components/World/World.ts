import { PerspectiveCamera, Scene, WebGLRenderer } from 'three';

import { createCamera } from './items/camera';
import { createCube } from './items/cube';
import { createScene } from './items/scene';
import { createLights } from './items/lights';

import { createRenderer } from './systems/renderer';
import { Resizer } from './systems/Resizer';
import { Loop } from './systems/Loop';

import { AnimatedMesh } from './types';

let camera: PerspectiveCamera;
let renderer: WebGLRenderer;
let scene: Scene;
let cube: AnimatedMesh;
let sceneContainer: HTMLScriptElement;
let loop: Loop;

class World {
    constructor(container: HTMLScriptElement) {
        sceneContainer = container;
        camera = createCamera();
        scene = createScene();
        renderer = createRenderer();
        loop = new Loop(camera, scene, renderer);
        container.append(renderer.domElement);
        cube = createCube();

        const light = createLights();

        loop.updatables.push(cube);

        scene.add(cube, light);

        // eslint-disable-next-line
        new Resizer(sceneContainer, camera, renderer);
    }

    start = (): void => {
        loop.start();
    };

    stop = (): void => {
        loop.stop();
    };

    render(): void {
        renderer.render(scene, camera);
    }
}

export default World;
