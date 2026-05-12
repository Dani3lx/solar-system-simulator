import * as THREE from "three";

const temp = new THREE.Vector3();

export const transformOrbitPoint = (x, y, z, i, Ω, ω) => {
    temp.set(x, y, z);

    // 1. rotate inside orbital plane (periapsis)
    temp.applyAxisAngle(new THREE.Vector3(0, 1, 0), ω);

    // 2. tilt orbit (inclination)
    temp.applyAxisAngle(new THREE.Vector3(1, 0, 0), i);

    // 3. rotate around ecliptic plane
    temp.applyAxisAngle(new THREE.Vector3(0, 1, 0), Ω);

    return [temp.x, temp.y, temp.z];
};

export const getOrbitalPathPoints = (a, b, c, numPoints, i = 0, Ω = 0, ω = 0) => {
    const points = [];

    for (let j = 0; j < numPoints; j++) {
        const angle = (j / numPoints) * Math.PI * 2;

        const x = Math.cos(angle) * a - c;
        const z = Math.sin(angle) * b;

        const p = transformOrbitPoint(x, 0, z, i, Ω, ω);

        points.push(p);
    }

    return points;
};
