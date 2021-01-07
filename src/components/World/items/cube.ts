import {
    BoxBufferGeometry,
    Mesh,
    MeshStandardMaterial,
    MathUtils,
} from 'three';

export const createCube = (): Mesh => {
    const geometry = new BoxBufferGeometry(2, 2, 2);

    const material = new MeshStandardMaterial({
        color: '#666',
    });

    const cube = new Mesh(geometry, material);
    cube.rotation.set(MathUtils.degToRad(45), MathUtils.degToRad(45), 0);

    const cube2 = new Mesh(geometry, material);
    cube2.position.x = 3;
    cube.add(cube2);

    return cube;
};
