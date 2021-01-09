import { PerspectiveCamera } from 'three';

export const createCamera = (): PerspectiveCamera => {
    const camera = new PerspectiveCamera(
        60, // fov = Field Of View
        1, // aspect ratio (dummy value)
        0.1, // near clipping plane
        50000, // far clipping plane
    );
    camera.position.set(5, 5, 30);

    return camera;
};
