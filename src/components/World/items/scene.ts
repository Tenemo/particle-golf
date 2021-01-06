import { Color, Scene } from 'three';

export const createScene = (): Scene => {
    const scene = new Scene();

    scene.background = new Color('#111');

    return scene;
};
