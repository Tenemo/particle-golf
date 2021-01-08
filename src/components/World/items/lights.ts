import { DirectionalLight, HemisphereLight } from 'three';

export const createLights = (): {
    ambientLight: HemisphereLight;
    mainLight: DirectionalLight;
} => {
    const ambientLight = new HemisphereLight('white', 'darkslategrey', 4);
    const mainLight = new DirectionalLight('white', 6);
    mainLight.position.set(500, 500, 500);
    return { ambientLight, mainLight };
};
