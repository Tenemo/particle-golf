import { PerspectiveCamera, Vector3 } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

import { roundToPrecision } from 'utils/helpers';
import { DampenedControls } from '../types';

let isCameraMoving = false;
let positionTarget: Vector3;
let targetTarget: Vector3;
let positionDistance: number;
let targetDistance: number;
let currentStep: number;

export const createControls = (
    camera: PerspectiveCamera,
    canvas: HTMLCanvasElement,
): DampenedControls => {
    const controls = new OrbitControls(camera, canvas) as DampenedControls;

    // controls.enablePan = false;
    controls.enableDamping = true;

    controls.tick = (delta) => {
        if (isCameraMoving) {
            if (
                positionTarget.x === roundToPrecision(camera.position.x) &&
                positionTarget.y === roundToPrecision(camera.position.y) &&
                positionTarget.z === roundToPrecision(camera.position.z) &&
                targetTarget.x === roundToPrecision(controls.target.x) &&
                targetTarget.y === roundToPrecision(controls.target.y) &&
                targetTarget.z === roundToPrecision(controls.target.z)
            ) {
                isCameraMoving = false;
                controls.enabled = true;
                controls.enableDamping = true;
                return;
            }
            const steps = 500 / delta;

            positionDistance = positionTarget.distanceTo(camera.position);
            targetDistance = targetTarget.distanceTo(controls.target);

            if (positionDistance < 0.01 || targetDistance < 0.01) {
                controls.enableDamping = false;
                camera.position.set(
                    positionTarget.x,
                    positionTarget.y,
                    positionTarget.z,
                );
                controls.target.set(
                    targetTarget.x,
                    targetTarget.y,
                    targetTarget.z,
                );
                camera.position.set(1, 1, 20);
                controls.target.set(0, 0, 0);
            } else {
                currentStep += 1;
                camera.position.setX(
                    camera.position.x +
                        ((positionTarget.x - camera.position.x) * currentStep) /
                            steps,
                );
                camera.position.setY(
                    camera.position.y +
                        ((positionTarget.y - camera.position.y) * currentStep) /
                            steps,
                );
                camera.position.setZ(
                    camera.position.z +
                        ((positionTarget.z - camera.position.z) * currentStep) /
                            steps,
                );

                controls.target.setX(
                    controls.target.x +
                        ((targetTarget.x - controls.target.x) * currentStep) /
                            steps,
                );
                controls.target.setY(
                    controls.target.y +
                        ((targetTarget.y - controls.target.y) * currentStep) /
                            steps,
                );
                controls.target.setZ(
                    controls.target.z +
                        ((targetTarget.z - controls.target.z) * currentStep) /
                            steps,
                );
            }
        }
        controls.update();
    };

    controls.moveCamera = (
        cameraPositionTarget: Vector3,
        controlsTargetTarget: Vector3,
    ) => {
        positionTarget = cameraPositionTarget;
        targetTarget = controlsTargetTarget;
        isCameraMoving = true;
        controls.enabled = false;
        currentStep = 0;
        positionDistance = positionTarget.distanceTo(camera.position);
        targetDistance = targetTarget.distanceTo(controls.target);
    };

    return controls;
};
