import { PerspectiveCamera, Scene, WebGLRenderer, Mesh } from 'three';

import { createCamera } from './items/camera';
import { createCube } from './items/cube';
import { createScene } from './items/scene';
import { createLights } from './items/lights';

import { createRenderer } from './systems/renderer';
import { Resizer } from './systems/Resizer';

let camera: PerspectiveCamera;
let renderer: WebGLRenderer;
let scene: Scene;
let cube: Mesh;
let sceneContainer: HTMLScriptElement;

class World {
    constructor(container: HTMLScriptElement) {
        sceneContainer = container;
        camera = createCamera();
        scene = createScene();
        renderer = createRenderer();
        container.append(renderer.domElement);
        cube = createCube();

        const light = createLights();
        scene.add(cube, light);

        // eslint-disable-next-line
        const resizer = new Resizer(sceneContainer, camera, renderer);
        resizer.onResize = () => {
            this.render();
        };
    }

    removeCube = (): void => {
        scene.remove(cube);
    };

    render(): void {
        renderer.render(scene, camera);
    }
}

export default World;
