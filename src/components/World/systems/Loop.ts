import {
    PerspectiveCamera,
    Scene,
    WebGLRenderer,
    Clock,
    Raycaster,
    Vector2,
    Group,
    Vector3,
} from 'three';

import { AnimatedParticle, DampenedControls } from '../types';

const animationClock = new Clock();
const globalClock = new Clock();
let isStopped = false;
let fpsDelay = 0;

const raycaster = new Raycaster();
const mouse = new Vector2();

const onMouseMove = (event: MouseEvent): void => {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
};

export class Loop {
    camera: PerspectiveCamera;

    scene: Scene;

    renderer: WebGLRenderer;

    controls: DampenedControls;

    updatables: AnimatedParticle[];

    particleGroup: Group;

    toScreenPosition: (particle: AnimatedParticle) => Vector3;

    constructor(
        camera: PerspectiveCamera,
        scene: Scene,
        renderer: WebGLRenderer,
        controls: DampenedControls,
        particleGroup: Group,
        toScreenPosition: (particle: AnimatedParticle) => Vector3,
    ) {
        this.camera = camera;
        this.scene = scene;
        this.renderer = renderer;
        this.controls = controls;
        this.particleGroup = particleGroup;
        this.toScreenPosition = toScreenPosition;
        this.updatables = [];
        window.addEventListener('mousemove', onMouseMove, false);
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
        raycaster.setFromCamera(mouse, this.camera);
        const intersects = raycaster.intersectObjects(
            this.particleGroup.children,
        );
        for (let i = 0; i < this.particleGroup.children.length; i += 1) {
            const particle = this.particleGroup.children[i] as AnimatedParticle;
            const {
                x: screenPositionX,
                y: screenPositionY,
                z: screenPositionZ,
            } = this.toScreenPosition(particle);
            particle.screenPositionX = screenPositionX;
            particle.screenPositionY = screenPositionY;
            particle.screenPositionZ = screenPositionZ;
            particle.isHovered = false;
        }
        for (let i = 0; i < intersects.length; i += 1) {
            const intersectedParticle = intersects[i]
                .object as AnimatedParticle;
            if ((intersects[i].distanceToRay ?? 1) < 0.3) {
                intersectedParticle.isHovered = true;
            }
        }
        this.controls.tick(delta);
    }
}
