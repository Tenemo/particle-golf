import { Mesh } from 'three';

export type AnimatedMesh = Mesh & { tick: (delta: number) => void };
