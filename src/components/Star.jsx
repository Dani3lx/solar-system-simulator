import { useRef, useState } from "react";
import * as THREE from "three";
import { useTexture, useCursor } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useSolarStore } from "../store/useSolarStore";

const Star = ({ star, timeScale }) => {
    const { size, surfaceColor, emissiveColor, lightColor, name, rotationPeriod, T, axialTilt } = star;
    const meshRef = useRef();
    const starRef = useRef();
    const texture = useTexture(`/textures/${name.toLowerCase()}.jpg`);
    const setActiveObject = useSolarStore((s) => s.setActiveObject);

    const [hovered, setHover] = useState(false);
    useCursor(hovered);

    const rotationSpeed = (2 * Math.PI * T) / rotationPeriod;

    useFrame((_, delta) => {
        meshRef.current.rotation.y += rotationSpeed * timeScale * delta;
    });

    return (
        <group
            ref={starRef}
            onPointerOver={(e) => {
                e.stopPropagation();
                setHover(true);
            }}
            onPointerOut={() => setHover(false)}
            onClick={(e) => {
                e.stopPropagation();
                setActiveObject(starRef);
            }}
        >
            <group rotation-z={axialTilt}>
                <mesh ref={meshRef} scale={size * 0.95}>
                    <sphereGeometry args={[1, 64, 64]} />
                    <meshBasicMaterial color={surfaceColor} map={texture} />
                </mesh>
            </group>
            <mesh scale={size}>
                <sphereGeometry args={[1, 64, 64]} />
                <meshBasicMaterial color={emissiveColor} transparent opacity={0.25} blending={THREE.AdditiveBlending} depthWrite={false} />
            </mesh>
            <pointLight color={lightColor} intensity={30} distance={0} decay={0} />
        </group>
    );
};

export default Star;
