import { DirectionalLight } from 'three';

export const createLights = (): DirectionalLight => {
    const light = new DirectionalLight('white', 8);
    light.position.set(500, 500, 500);
    return light;
};
