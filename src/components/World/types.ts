import { Mesh } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

export type AnimatedMesh = Mesh & { tick: (delta: number) => void };

export type DampenedControls = OrbitControls & {
    tick: () => void;
};
