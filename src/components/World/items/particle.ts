import {
    Points,
    SphereBufferGeometry,
    BufferGeometry,
    ShaderMaterial,
    Color,
    ShaderLib,
    LineBasicMaterial,
    Line,
    Vector3,
    Group,
} from 'three';

import { AnimatedParticle } from '../types';

let particleNameIndex = 1;

export const createParticle = (trajectoryGroup: Group): AnimatedParticle => {
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

    const particle = (new Points(
        geometry,
        material,
    ) as unknown) as AnimatedParticle;

    particle.name = `Particle ${particleNameIndex}`;

    particle.position.z += Math.random() * 10;
    particle.position.x += Math.random() * 10;
    particle.position.y += Math.random() * 10;

    const metersPerSecond = 0.3;

    const lineMaterial = new LineBasicMaterial({
        color: 0x0000ff,
        // color: new Color('black'),
    });

    let trajectoryLimiterCount = 0;
    let previousPosition = new Vector3(
        particle.position.x,
        particle.position.y,
        particle.position.z,
    );
    const particleTrajectoryGroup = new Group();
    particleTrajectoryGroup.name = `Particle ${particleNameIndex} trajectory`;
    trajectoryGroup.add(particleTrajectoryGroup);

    particleNameIndex += 1;

    particle.isHovered = false;

    particle.tick = (delta: number, isStopping?: boolean) => {
        particle.position.x += metersPerSecond * delta;
        const newPosition = new Vector3(
            particle.position.x,
            particle.position.y,
            particle.position.z,
        );
        if (trajectoryLimiterCount === 50 || isStopping) {
            const lineGeometry = new BufferGeometry().setFromPoints([
                previousPosition,
                newPosition,
            ]);
            const line = new Line(lineGeometry, lineMaterial);
            particleTrajectoryGroup.add(line);
            previousPosition = new Vector3(
                particle.position.x,
                particle.position.y,
                particle.position.z,
            );
            trajectoryLimiterCount = 0;
        }
        trajectoryLimiterCount += 1;
    };

    return particle;
};
