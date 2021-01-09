import {
    PerspectiveCamera,
    Scene,
    WebGLRenderer,
    AxesHelper,
    Vector3,
    Group,
} from 'three';

import { createCamera } from './items/camera';
import { createScene } from './items/scene';
import { createLights } from './items/lights';

import { createRenderer } from './systems/renderer';
import { Resizer } from './systems/Resizer';
import { createControls } from './systems/controls';
import { Loop } from './systems/Loop';
import { createParticle } from './items/particle';

import { AnimatedParticle, DampenedControls } from './types';

let camera: PerspectiveCamera;
let renderer: WebGLRenderer;
let scene: Scene;
let sceneContainer: HTMLScriptElement;
let loop: Loop;
let controls: DampenedControls;
let particleGroup: Group;
let trajectoryGroup: Group;

class World {
    constructor(container: HTMLScriptElement) {
        sceneContainer = container;
        camera = createCamera();
        scene = createScene();
        renderer = createRenderer();

        container.append(renderer.domElement);

        controls = createControls(camera, renderer.domElement);

        loop = new Loop(camera, scene, renderer, controls);

        const { ambientLight, mainLight } = createLights();

        const axesHelper = new AxesHelper(500);

        particleGroup = new Group();
        trajectoryGroup = new Group();

        scene.add(
            particleGroup,
            trajectoryGroup,
            ambientLight,
            mainLight,
            axesHelper,
        );

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

    goToCoords = (x: number, y: number, z: number): void => {
        this.stop();
        controls.moveCamera(
            new Vector3(x + 5, y + 5, z + 10),
            new Vector3(x, y, z),
        );
    };

    addParticle = (): AnimatedParticle => {
        const particle = createParticle(trajectoryGroup);
        particleGroup.add(particle);
        loop.updatables.push(particle);
        return particle;
    };

    deleteParticle = (particleName: string): void => {
        particleGroup.remove(
            particleGroup.children.find(
                ({ name }) => name === particleName,
            ) as AnimatedParticle,
        );
        const particleIndex = loop.updatables.findIndex(
            ({ name }) => name === particleName,
        );
        loop.updatables.splice(particleIndex, 1);
        const particleTrajectoryGroup = trajectoryGroup.children.find(
            ({ name }) => name === `${particleName} trajectory`,
        ) as Group;
        trajectoryGroup.remove(particleTrajectoryGroup);
    };
}

export default World;
