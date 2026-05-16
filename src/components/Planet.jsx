import { useRef, useMemo, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Billboard, Text, Line, useTexture, useCursor } from "@react-three/drei";
import { getOrbitalPathPoints, transformOrbitPoint } from "../utils/orbit";

const Planet = ({ planet, orbit, timeScale, label, onActive }) => {
    const { a, e, size, speed, i, Ω, ω, name, rotationPeriod, axialTilt } = planet;
    const texture = useTexture(`/textures/${name.toLowerCase()}.jpg`);
    const [hovered, setHover] = useState(false);
    useCursor(hovered);

    const orbitRef = useRef();
    const planetRef = useRef();
    const angleRef = useRef(0);

    const b = a * Math.sqrt(1 - Math.pow(e, 2)); // semi-minor axis
    const c = a * e; // focus offset

    const T = Math.pow(a, 1.5);

    const angularSpeed = ((speed / 5) * timeScale * (2 * Math.PI)) / T;

    const orbitPoints = useMemo(() => getOrbitalPathPoints(a, b, c, 200, i, Ω, ω), [a, b, c, i, Ω, ω]);

    const rotationSpeedRad = (2 * Math.PI * T) / Math.abs(rotationPeriod);
    const rotationDirection = Math.sign(rotationPeriod);

    useFrame((_, delta) => {
        angleRef.current += angularSpeed * delta;
        const p = transformOrbitPoint(Math.cos(angleRef.current) * a - c, 0, Math.sin(angleRef.current) * b, i, Ω, ω);
        orbitRef.current.position.set(p[0], p[1], p[2]);

        // spin planet around tilted axis
        planetRef.current.rotation.y += rotationDirection * rotationSpeedRad * timeScale * delta;
    });

    return (
        <group>
            {/* orbit position */}
            <group ref={orbitRef}>
                <mesh
                    scale={size + 2}
                    onPointerOver={(e) => {
                        e.stopPropagation();
                        setHover(true);
                    }}
                    onPointerOut={() => setHover(false)}
                    onClick={(e) => {
                        e.stopPropagation();
                        onActive(orbitRef);
                    }}
                    visible={false}
                >
                    <sphereGeometry args={[1, 8, 8]} />
                    <meshBasicMaterial transparent opacity={0} depthWrite={false} />
                </mesh>
                {/* axial tilt */}
                <group rotation-z={axialTilt}>
                    {/* spinning planet */}
                    <mesh ref={planetRef} scale={hovered ? 3 : size}>
                        <sphereGeometry args={[1, 32, 32]} />
                        <meshStandardMaterial roughness={0.9} metalness={0.0} map={texture} />
                    </mesh>
                </group>

                <Billboard visible={label}>
                    <Text position={[0, hovered ? 4 : size + 1, 0]} fontSize={1} color="white" anchorX="center" anchorY="middle">
                        {name}
                    </Text>
                </Billboard>
            </group>

            <Line points={orbitPoints} dashed dashSize={0.2} gapSize={1} transparent opacity={0.1} visible={orbit} />
        </group>
    );
};

export default Planet;
