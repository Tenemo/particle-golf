import { Points, Vector3 } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

export type AnimatedParticle = Points & {
    tick: ({
        delta,
        isStopping,
        isStarting,
    }: {
        delta: number;
        isStopping?: boolean;
        isStarting?: boolean;
    }) => void;
    previousPosition: Vector3;
    isHovered: boolean;
    screenPositionX?: number;
    screenPositionY?: number;
    screenPositionZ?: number;
    color: string;
    lastResumeTime: number;
    totalTime: number;
    expressions: { x: string; y: string; z: string };
};

export type DampenedControls = OrbitControls & {
    tick: ({ delta }: { delta: number }) => void;
    moveCamera: (
        cameraPositionTarget: Vector3,
        controlsTargetTarget: Vector3,
    ) => void;
};
