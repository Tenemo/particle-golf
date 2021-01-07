import { PerspectiveCamera, WebGLRenderer } from 'three';
import { throttle } from 'lodash';

const setSize = (
    container: HTMLScriptElement,
    camera: PerspectiveCamera,
    renderer: WebGLRenderer,
): void => {
    // eslint-disable-next-line no-param-reassign
    camera.aspect = container.clientWidth / (container.clientHeight - 10);
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight - 10);
    renderer.setPixelRatio(window.devicePixelRatio);
};

const resize = throttle(
    (
        container: HTMLScriptElement,
        camera: PerspectiveCamera,
        renderer: WebGLRenderer,
        resizer: Resizer,
    ) => {
        setSize(container, camera, renderer);
        resizer.onResize();
    },
    16,
);

export class Resizer {
    constructor(
        container: HTMLScriptElement,
        camera: PerspectiveCamera,
        renderer: WebGLRenderer,
    ) {
        setSize(container, camera, renderer);
        window.addEventListener('resize', () => {
            resize(container, camera, renderer, this);
        });
    }

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    onResize = (): void => {};
}
