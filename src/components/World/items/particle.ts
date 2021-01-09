import {
    Points,
    SphereBufferGeometry,
    ShaderMaterial,
    Color,
    ShaderLib,
} from 'three';

export const createParticle = (): Points => {
    const geometry = new SphereBufferGeometry(0, 0, 0);
    const material = new ShaderMaterial({
        transparent: true,
        depthWrite: false,
        uniforms: {
            size: { value: 10 },
            scale: { value: 1 },
            color: { value: new Color('#333') },
        },
        vertexShader: ShaderLib.points.vertexShader,
        fragmentShader: `
            uniform vec3 color;
            void main() {
                vec2 xy = gl_PointCoord.xy - vec2(0.5);
                float ll = length(xy);
                gl_FragColor = vec4(color, step(ll, 0.5));
            }
        `,
    });

    const particle = new Points(geometry, material);
    particle.position.z += Math.random() * 10;
    particle.position.x += Math.random() * 10;
    particle.position.y += Math.random() * 10;

    return particle;
};
