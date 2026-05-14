import { OrbitControls } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import "./App.css";
import Star from "./components/Star";
import Planet from "./components/Planet";
import { planets } from "./constants/planets";
import { Perf } from "r3f-perf";
import { useControls } from "leva";
import { Sun } from "./constants/stars";

function App() {
    const { perfVisible } = useControls({
        perfVisible: true,
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

    return (
        <>
            {perfVisible && <Perf position="top-left" />}

            <EffectComposer>
                <Bloom intensity={1} luminanceThreshold={0.5} luminanceSmoothing={1} />
            </EffectComposer>
            <ambientLight intensity={0.5} />
            <OrbitControls makeDefault />
            <Star star={Sun} timeScale={controls.timeScale} />
            {planets.map((planet) => (
                <Planet key={planet.name} planet={planet} orbit={controls.orbit} timeScale={controls.timeScale} label={controls.label} />
            ))}
        </>
    );
}

export default App;
