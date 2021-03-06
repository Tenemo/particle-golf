import {
    PerspectiveCamera,
    Scene,
    WebGLRenderer,
    AxesHelper,
    Vector3,
    Group,
    Frustum,
    Matrix4,
} from 'three';

import { createCamera } from './items/camera';
import { createScene } from './items/scene';
import { createLights } from './items/lights';

import { createRenderer } from './systems/renderer';
import { Resizer } from './systems/Resizer';
import { createControls } from './systems/controls';
import { Loop } from './systems/Loop';
import { createParticle } from './items/particle';

import { INITIAL_CAMERA_POSITION } from './constants';
import { AnimatedParticle, DampenedControls } from './types';

let camera: PerspectiveCamera;
let renderer: WebGLRenderer;
let scene: Scene;
let sceneContainer: HTMLScriptElement;
let loop: Loop;
let controls: DampenedControls;
let particleGroup: Group;
let trajectoryGroup: Group;
let isVelocityVectorsVisible = false;

class World {
    constructor(container: HTMLScriptElement) {
        sceneContainer = container;
        camera = createCamera();
        scene = createScene();
        renderer = createRenderer();

        container.append(renderer.domElement);

        controls = createControls(camera, renderer.domElement);

        const { ambientLight, mainLight } = createLights();

        const axesHelper = new AxesHelper(10000000);

        particleGroup = new Group();
        trajectoryGroup = new Group();

        loop = new Loop(
            camera,
            scene,
            renderer,
            controls,
            particleGroup,
            this.toScreenPosition,
        );

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

    isRunning = false;

    start = (): void => {
        if (this.isRunning === false) {
            loop.start();
            this.isRunning = true;
        }
    };

    stop = (): void => {
        if (this.isRunning === true) {
            loop.stop();
            this.isRunning = false;
        }
    };

    returnToOrigin = (): void => {
        controls.moveCamera(INITIAL_CAMERA_POSITION, new Vector3(0, 0, 0));
    };

    goToCoords = (x: number, y: number, z: number): void => {
        this.stop();
        controls.moveCamera(
            new Vector3(x + 5, y + 5, z + 30),
            new Vector3(x, y, z),
        );
    };

    addParticle = (expressions?: {
        x: string;
        y: string;
        z: string;
    }): AnimatedParticle => {
        const particle = createParticle(
            trajectoryGroup,
            isVelocityVectorsVisible,
            expressions,
        );
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

    toScreenPosition = (particle: AnimatedParticle): Vector3 => {
        camera.updateMatrix();
        camera.updateMatrixWorld();
        particle.updateMatrix();
        particle.updateMatrixWorld();
        camera.matrixWorldInverse.copy(camera.matrixWorld).invert();
        const frustum = new Frustum();
        frustum.setFromProjectionMatrix(
            new Matrix4().multiplyMatrices(
                camera.projectionMatrix,
                camera.matrixWorldInverse,
            ),
        );
        if (!frustum.containsPoint(particle.position)) {
            return new Vector3(0, 0, -1);
        }

        const {
            position: { x, y, z },
        } = particle;
        const screenPosition = new Vector3();
        screenPosition.set(x, y, z);
        screenPosition.project(camera);

        screenPosition.x = Math.round(
            ((screenPosition.x + 1) * renderer.domElement.width) / 2,
        );
        screenPosition.y = Math.round(
            ((-screenPosition.y + 1) * renderer.domElement.height) / 2,
        );
        screenPosition.z = 0;
        return screenPosition;
    };

    setIsTrailsVisible = (isVisible: boolean): void => {
        trajectoryGroup.visible = isVisible;
    };

    setIsVelocityVectorsVisible = (isVisible: boolean): void => {
        particleGroup.children.forEach((particle) => {
            particle.children.forEach((child) => {
                if (child.name.includes('velocity')) {
                    // eslint-disable-next-line no-param-reassign
                    child.visible = isVisible;
                }
            });
        });
        isVelocityVectorsVisible = isVisible;
    };
}

export default World;
