import {
    BoxBufferGeometry,
    Mesh,
    MeshStandardMaterial,
    MathUtils,
} from 'three';
import { AnimatedMesh } from '../types';

const radiansPerSecond = MathUtils.degToRad(30);

export const createCube = (): AnimatedMesh => {
    const geometry = new BoxBufferGeometry(2, 2, 2);

    const material = new MeshStandardMaterial({
        color: '#666',
    });

    const cube = (new Mesh(geometry, material) as unknown) as AnimatedMesh;

    const metersPerSecond = 4;
    let positionAcc = 0;

    cube.tick = (delta: number) => {
        cube.rotation.z += radiansPerSecond * delta;
        cube.rotation.x += radiansPerSecond * delta;
        cube.rotation.y += radiansPerSecond * delta;
        positionAcc += 0.01;
        if (positionAcc % 2 < 1) {
            cube.position.y += metersPerSecond * delta;
        } else {
            cube.position.y -= metersPerSecond * delta;
        }
    };

    return cube;
};
