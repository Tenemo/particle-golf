import { BoxBufferGeometry, Mesh, MeshBasicMaterial } from 'three';

export const createCube = (): Mesh => {
    const geometry = new BoxBufferGeometry(2, 2, 2);

    // create a default (white) Basic material
    const material = new MeshBasicMaterial();

    const cube = new Mesh(geometry, material);

    return cube;
};
