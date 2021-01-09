import { PerspectiveCamera, Scene, WebGLRenderer, Clock } from 'three';

import { AnimatedParticle, DampenedControls } from '../types';

const animationClock = new Clock();
const globalClock = new Clock();
let isStopped = false;
let fpsDelay = 0;

export class Loop {
    camera: PerspectiveCamera;

    scene: Scene;

    renderer: WebGLRenderer;

    controls: DampenedControls;

    updatables: AnimatedParticle[];

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
        this.tick(true);
        isStopped = true;
    }

    tick(isStopping?: boolean): void {
        const delta = animationClock.getDelta();
        this.updatables.forEach((updatableObject) => {
            updatableObject.tick(isStopped ? 0 : delta, isStopping);
        });
        isStopped = false;
    }

    globalTick(): void {
        const delta = globalClock.getDelta();
        if (fpsDelay === 10) {
            const fps = 1 / delta;
            (document.querySelector(
                '#fpsCounter',
            ) as HTMLScriptElement).textContent = `${fps.toFixed(0)} fps`;
            fpsDelay = 0;
        }
        fpsDelay += 1;
        this.controls.tick(delta);
    }
}
