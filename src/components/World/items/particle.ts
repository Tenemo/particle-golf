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
    ArrowHelper,
} from 'three';
import mobile from 'is-mobile';

import { AnimatedParticle } from '../types';

let particleIndex = 1;
const isMobile = mobile();

const colors = [
    '#3352FF', // blue
    '#F33724', // orange-ish
    '#067220', // dark green
    '#860684', // purple
    '#0FD3D3', // teal
    '#EE8714', // orange
    '#830000', // dark red
    '#464646', // gray
];

export const createParticle = (
    trajectoryGroup: Group,
    isVelocityVectorsVisible: boolean,
): AnimatedParticle => {
    const color = colors[particleIndex % colors.length];
    const geometry = new SphereBufferGeometry(0, 0, 0);
    const material = new ShaderMaterial({
        transparent: true,
        depthWrite: false,
        uniforms: {
            size: { value: isMobile ? 20 : 10 },
            scale: { value: 1 },
            color: { value: new Color(color) },
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

    particle.name = `Particle ${particleIndex}`;
    particle.color = color;

    particle.position.z += Math.random() * 10;
    particle.position.x += Math.random() * 10;
    particle.position.y += Math.random() * 10;

    const lineMaterial = new LineBasicMaterial({
        color: new Color(color),
    });

    let trajectoryLimiterCount = 0;
    let previousPosition = new Vector3(
        particle.position.x,
        particle.position.y,
        particle.position.z,
    );
    const particleTrajectoryGroup = new Group();
    particleTrajectoryGroup.name = `Particle ${particleIndex} trajectory`;
    trajectoryGroup.add(particleTrajectoryGroup);

    particleIndex += 1;

    particle.isHovered = false;
    particle.creationTime = Date.now();

    const velocityArrow = new ArrowHelper(
        new Vector3(0, 0, 0),
        new Vector3(0, 0, 0),
        0,
        new Color(color),
    );
    velocityArrow.name = `Particle ${particleIndex} velocity`;
    velocityArrow.visible = isVelocityVectorsVisible;
    particle.add(velocityArrow);

    particle.tick = (delta: number, isStopping?: boolean) => {
        const metersPerSecond = 0.3;
        particle.position.x += metersPerSecond * delta;

        const newPosition = new Vector3(
            particle.position.x,
            particle.position.y,
            particle.position.z,
        );
        if (trajectoryLimiterCount % 50 === 0 || isStopping) {
            const lineGeometry = new BufferGeometry().setFromPoints([
                previousPosition,
                newPosition,
            ]);
            const line = new Line(lineGeometry, lineMaterial);
            particleTrajectoryGroup.add(line);
        }
        if (trajectoryLimiterCount % 50 === 0) {
            const direction = new Vector3();
            direction
                .subVectors(previousPosition, newPosition)
                .normalize()
                .negate();
            const speed = parseFloat(
                previousPosition.distanceTo(newPosition).toFixed(1),
            );
            velocityArrow.setLength(speed * (isMobile ? 40 : 20));
            velocityArrow.setDirection(direction);
            previousPosition = new Vector3(
                particle.position.x,
                particle.position.y,
                particle.position.z,
            );
        }
        trajectoryLimiterCount += 1;
    };

    return particle;
};
