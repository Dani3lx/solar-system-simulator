import { OrbitControls } from "@react-three/drei";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";

import "./App.css";
import Star from "./components/Star";
import Planet from "./components/Planet";
import { planets } from "./constants/planets";
import { Perf } from "r3f-perf";
import { useControls } from "leva";
import { Sun } from "./constants/stars";
import { useEffect, useRef } from "react";
import { Stars } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useSolarStore } from "./store/useSolarStore";

function App({ onReady }) {
    const orbitRef = useRef();
    const clearActiveObject = useSolarStore((s) => s.clearActiveObject);

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

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === "Escape") clearActiveObject();
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    useEffect(() => {
        onReady();
    }, [onReady]);

    useFrame(() => {
        const activeObject = useSolarStore.getState().activeObject;
        if (activeObject?.current && orbitRef.current) {
            orbitRef.current.target.lerp(activeObject.current.position, 0.1);
            orbitRef.current.update();
        }
    });

    return (
        <>
            {perfVisible && <Perf position="top-left" />}
            <EffectComposer>
                <Bloom intensity={1.5} luminanceThreshold={0.5} luminanceSmoothing={1} />
                <Vignette eskil={false} offset={0.3} darkness={0.8} />
            </EffectComposer>
            <ambientLight intensity={0.5} />
            <OrbitControls makeDefault ref={orbitRef} />

            <Star star={Sun} timeScale={controls.timeScale} />
            {planets.map((planet) => (
                <Planet key={planet.name} planet={planet} orbit={controls.orbit} timeScale={controls.timeScale} label={controls.label} />
            ))}
            <Stars radius={300} depth={50} count={5000} factor={10} fade saturation={1} />
        </>
    );
}

export default App;
