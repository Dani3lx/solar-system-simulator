import { OrbitControls } from "@react-three/drei";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";

import "./App.css";
import Star from "./components/Star";
import Planet from "./components/Planet";
import { planets } from "./constants/planets";
import { Perf } from "r3f-perf";
import { useControls } from "leva";
import { Sun } from "./constants/stars";
import { useEffect, useState } from "react";
import { Stars } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

function App({ onReady }) {
    const { perfVisible } = useControls({
        perfVisible: false,
    });

    const controls = useControls("sphere", {
        orbit: true,
        label: true,
        timeScale: {
            min: -3,
            max: 3,
            value: 1,
        },
    });

    const [pov, setPov] = useState({
        active: false,
        position: [0, 0, 0],
    });

    const onActive = (targetRef) => {
        setPov({ active: true, targetRef });
    };

    const onDeactive = () => {
        setPov((prev) => ({ ...prev, active: false }));
    };

    useFrame(({ camera }) => {
        if (pov.active && pov.targetRef?.current) {
            const target = pov.targetRef.current.position;

            const dist = Math.sqrt(target.x ** 2 + target.z ** 2);
            const nx = target.x / dist;
            const nz = target.z / dist;

            camera.position.lerp(
                {
                    x: target.x + nx * 15,
                    y: target.y + 5,
                    z: target.z + nz * 15,
                },
                0.05,
            );

            camera.lookAt(target.x * 0.3, target.y, target.z * 0.3);
        }
    });

    useEffect(() => {
        onReady();
    }, [onReady]);

    return (
        <>
            {perfVisible && <Perf position="top-left" />}
            <EffectComposer>
                <Bloom intensity={1.5} luminanceThreshold={0.5} luminanceSmoothing={1} />
                <Vignette eskil={false} offset={0.3} darkness={0.8} />
            </EffectComposer>
            <ambientLight intensity={0.5} />
            <OrbitControls makeDefault enabled={!pov.active} />

            <mesh scale={900} onClick={onDeactive}>
                <sphereGeometry args={[1, 8, 8]} />
                <meshBasicMaterial side={THREE.BackSide} transparent opacity={0} depthWrite={false} />
            </mesh>

            <Star star={Sun} timeScale={controls.timeScale} />
            {planets.map((planet) => (
                <Planet
                    key={planet.name}
                    planet={planet}
                    orbit={controls.orbit}
                    timeScale={controls.timeScale}
                    label={controls.label}
                    onActive={onActive}
                />
            ))}
            <Stars radius={300} depth={50} count={5000} factor={10} fade saturation={1} />
        </>
    );
}

export default App;
