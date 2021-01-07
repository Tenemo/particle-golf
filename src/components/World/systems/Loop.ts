import { PerspectiveCamera, Scene, WebGLRenderer, Clock } from 'three';

import { AnimatedMesh, DampenedControls } from '../types';

const animationClock = new Clock();
const globalClock = new Clock();
let isStopped = false;

export class Loop {
    camera: PerspectiveCamera;

    scene: Scene;

    renderer: WebGLRenderer;

    controls: DampenedControls;

    updatables: AnimatedMesh[];

    constructor(
        camera: PerspectiveCamera,
        scene: Scene,
        renderer: WebGLRenderer,
        controls: DampenedControls,
    ) {
        this.camera = camera;
        this.scene = scene;
        this.renderer = renderer;
        this.controls = controls;
        this.updatables = [];
    }

    start(): void {
        this.renderer.setAnimationLoop(() => {
            this.tick();
            this.globalTick();
            this.renderer.render(this.scene, this.camera);
        });
    }

    stop(): void {
        this.renderer.setAnimationLoop(() => {
            this.globalTick();
            this.renderer.render(this.scene, this.camera);
        });
        isStopped = true;
    }

    tick(): void {
        const delta = animationClock.getDelta();
        this.updatables.forEach((updatableObject) => {
            updatableObject.tick(isStopped ? 0 : delta);
        });
        isStopped = false;
    }

    globalTick(): void {
        const delta = globalClock.getDelta();
        this.controls.tick(delta);
    }
}
