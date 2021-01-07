import { PerspectiveCamera } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

export const createControls = (
    camera: PerspectiveCamera,
    canvas: HTMLCanvasElement,
): OrbitControls => {
    const controls = new OrbitControls(camera, canvas);
    return controls;
};
