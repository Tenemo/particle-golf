import {
    BoxBufferGeometry,
    Mesh,
    MeshStandardMaterial,
    MathUtils,
} from 'three';
import { AnimatedMesh } from '../types';

const radiansPerSecond = MathUtils.degToRad(15);
const metersPerSecond = 2;
let positionAcc = 0;

export const createCube = (): AnimatedMesh => {
    const geometry = new BoxBufferGeometry(2, 2, 2);

    const material = new MeshStandardMaterial({
        color: '#666',
    });

    const cube = (new Mesh(geometry, material) as unknown) as AnimatedMesh;

    cube.tick = (delta: number) => {
        cube.rotation.z += radiansPerSecond * delta;
        cube.rotation.x += radiansPerSecond * delta;
        cube.rotation.y += radiansPerSecond * delta;
        positionAcc += 0.01;
        if (positionAcc % 8 < 4) {
            cube.position.y += metersPerSecond * delta;
        } else {
            cube.position.y -= metersPerSecond * delta;
        }
    };

    return cube;
};
