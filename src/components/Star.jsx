import { useRef } from "react";
import * as THREE from "three";

const Star = ({ size, surfaceColor, emissiveColor, lightColor }) => {
    const starRef = useRef();
    return (
        <group ref={starRef}>
            <mesh scale={size * 0.95}>
                <sphereGeometry args={[1, 64, 64]} />
                <meshBasicMaterial color={surfaceColor} />
            </mesh>
            <mesh scale={size}>
                <sphereGeometry args={[1, 64, 64]} />
                <meshBasicMaterial color={emissiveColor} transparent opacity={0.25} blending={THREE.AdditiveBlending} depthWrite={false} />
            </mesh>
            <pointLight color={lightColor} intensity={30} distance={0} decay={0} />
        </group>
    );
};

export default Star;
