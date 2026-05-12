import { createRoot } from "react-dom/client";
import "./index.css";
import { Canvas } from "@react-three/fiber";
import App from "./App";
import { Leva } from "leva";
import { StrictMode } from "react";

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <Leva collapsed />
        <Canvas
            camera={{
                fov: 45,
                near: 0.1,
                far: 1000,
                position: [0, 100, 0],
            }}
        >
            <App />
        </Canvas>
    </StrictMode>,
);
