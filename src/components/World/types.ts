import { Points, Vector3 } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

export type AnimatedParticle = Points & {
    tick: (delta: number, isStopping?: boolean) => void;
    previousPosition: Vector3;
};

export type DampenedControls = OrbitControls & {
    tick: (delta: number) => void;
    moveCamera: (
        cameraPositionTarget: Vector3,
        controlsTargetTarget: Vector3,
    ) => void;
};
