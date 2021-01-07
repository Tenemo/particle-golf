import { Mesh, Vector3 } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

export type AnimatedMesh = Mesh & { tick: (delta: number) => void };

export type DampenedControls = OrbitControls & {
    tick: (delta: number) => void;
    moveCamera: (
        cameraPositionTarget: Vector3,
        controlsTargetTarget: Vector3,
    ) => void;
};
