import { PerspectiveCamera, Scene, WebGLRenderer, Clock } from 'three';

import { AnimatedMesh } from '../types';

const clock = new Clock();
let isStopped = false;

export class Loop {
    camera: PerspectiveCamera;

    scene: Scene;

    renderer: WebGLRenderer;

    updatables: AnimatedMesh[];

    constructor(
        camera: PerspectiveCamera,
        scene: Scene,
        renderer: WebGLRenderer,
    ) {
        this.camera = camera;
        this.scene = scene;
        this.renderer = renderer;
        this.updatables = [];
    }

    start(): void {
        this.renderer.setAnimationLoop(() => {
            this.tick();
            this.renderer.render(this.scene, this.camera);
        });
    }

    stop(): void {
        this.renderer.setAnimationLoop(null);
        isStopped = true;
    }

    tick(): void {
        const delta = clock.getDelta();
        this.updatables.forEach((updatableObject) => {
            updatableObject.tick(isStopped ? 0 : delta);
        });
        isStopped = false;
    }
}
