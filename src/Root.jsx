import { useState, Suspense, useCallback } from "react";
import { StrictMode } from "react";
import { Canvas } from "@react-three/fiber";
import { Leva } from "leva";
import App from "./App";
import LoadingScreen from "./components/LoadingScreen";

function Root() {
    const [ready, setReady] = useState(false);

    const handleReady = useCallback(() => {
        setReady(true);
    }, []);

    return (
        <StrictMode>
            <Leva collapsed />
            <LoadingScreen ready={ready} />
            <Canvas
                style={{
                    opacity: ready ? 1 : 0,
                    transition: "opacity 1s ease 0.75s",
                }}
                camera={{
                    fov: 45,
                    near: 0.1,
                    far: 1000,
                    position: [0, 100, 0],
                }}
            >
                <Suspense fallback={null}>
                    <App onReady={handleReady} />
                </Suspense>
            </Canvas>
        </StrictMode>
    );
}

export default Root;
