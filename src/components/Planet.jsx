import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Line } from "@react-three/drei";
import { getOrbitalPathPoints, transformOrbitPoint } from "../utils/orbit";

const Planet = ({ planet, orbit }) => {
    const { a, e, size, color, speed, i, Ω, ω } = planet;
    const planetRef = useRef();
    const angleRef = useRef(0);

    const b = a * Math.sqrt(1 - Math.pow(e, 2)); // semi-minor axis
    const c = a * e; // focus offset

    const T = Math.pow(a, 1.5); // orbital period
    const angularSpeed = (speed * (2 * Math.PI)) / T; // full rotation over that period

    const orbitPoints = useMemo(() => getOrbitalPathPoints(a, b, c, 200, i, Ω, ω), [a, b, c, i, Ω, ω]);

    useFrame((_, delta) => {
        angleRef.current += angularSpeed * delta;
        const p = transformOrbitPoint(Math.cos(angleRef.current) * a - c, 0, Math.sin(angleRef.current) * b, i, Ω, ω);
        planetRef.current.position.x = p[0];
        planetRef.current.position.y = p[1];
        planetRef.current.position.z = p[2];
    });

    return (
        <group>
            <mesh ref={planetRef} scale={size}>
                <sphereGeometry args={[1, 32, 32]} />
                <meshStandardMaterial color={color} roughness={0.9} metalness={0.0} />
            </mesh>

            <Line points={orbitPoints} dashed dashSize={0.1} gapSize={1} transparent opacity={0.3} visible={orbit} />
        </group>
    );
};

export default Planet;
