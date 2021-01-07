import { WebGLRenderer } from 'three';

export const createRenderer = (): WebGLRenderer => {
    const renderer = new WebGLRenderer({ antialias: true });
    renderer.physicallyCorrectLights = true;
    return renderer;
};
