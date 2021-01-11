import { PerspectiveCamera } from 'three';

import { INITIAL_CAMERA_POSITION } from '../constants';

export const createCamera = (): PerspectiveCamera => {
    const camera = new PerspectiveCamera(
        60, // fov = Field Of View
        1, // aspect ratio (dummy value)
        0.1, // near clipping plane
        10000000, // far clipping plane
    );
    camera.position.copy(INITIAL_CAMERA_POSITION);

    return camera;
};
