import { useRef } from "react";
import * as THREE from "three";
import { useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

const Star = ({ star, timeScale }) => {
    const { size, surfaceColor, emissiveColor, lightColor, name, rotationPeriod, T, axialTilt } = star;
    const meshRef = useRef();
    const texture = useTexture(`src/assets/textures/${name.toLowerCase()}.jpg`);

    const rotationSpeed = (2 * Math.PI * T) / rotationPeriod;

    useFrame((_, delta) => {
        meshRef.current.rotation.y += rotationSpeed * timeScale * delta;
    });

    return (
        <group>
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
