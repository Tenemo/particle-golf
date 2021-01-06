import { PerspectiveCamera, Scene, WebGLRenderer } from 'three';

import { createCamera } from './items/camera';
import { createCube } from './items/cube';
import { createScene } from './items/scene';
import { createRenderer } from './systems/renderer';
import { Resizer } from './systems/Resizer';

let camera: PerspectiveCamera;
let renderer: WebGLRenderer;
let scene: Scene;

class World {
    // 1. Create an instance of the World app
    constructor(container: HTMLScriptElement) {
        camera = createCamera();
        scene = createScene();
        renderer = createRenderer();
        container.append(renderer.domElement);
        const cube = createCube();
        scene.add(cube);

        // eslint-disable-next-line
        new Resizer(container, camera, renderer);
    }

    // 2. Render the scene
    render(): void {
        renderer.render(scene, camera);
    }
}

export default World;
