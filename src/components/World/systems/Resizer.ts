import { PerspectiveCamera, WebGLRenderer } from 'three';

export class Resizer {
    constructor(
        container: HTMLScriptElement,
        camera: PerspectiveCamera,
        renderer: WebGLRenderer,
    ) {
        // eslint-disable-next-line no-param-reassign
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();

        // update the size of the renderer AND the canvas
        renderer.setSize(container.clientWidth, container.clientHeight);

        // set the pixel ratio (for mobile devices)
        renderer.setPixelRatio(window.devicePixelRatio);
    }
}
