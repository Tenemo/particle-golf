import { WebGLRenderer } from 'three';

export const createRenderer = (): WebGLRenderer => {
    const renderer = new WebGLRenderer();
    return renderer;
};
