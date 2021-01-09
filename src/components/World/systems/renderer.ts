import { WebGLRenderer } from 'three';

export const createRenderer = (): WebGLRenderer => {
    const renderer = new WebGLRenderer({ antialias: true });
    renderer.physicallyCorrectLights = true;
    renderer.setClearColor(0x888888, 1);
    return renderer;
};
