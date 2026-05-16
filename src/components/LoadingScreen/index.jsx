import { useProgress } from "@react-three/drei";
import "./loadingScreen.css";

const LoadingScreen = () => {
    const { progress, active } = useProgress();

    return (
        <div
            className="screen__container"
            style={{
                opacity: active || progress < 100 ? 1 : 0,
                pointerEvents: active || progress < 100 ? "auto" : "none",
            }}
        >
            <h1 className="screen__title">Solar System</h1>

            <div className="screen__bar">
                <div
                    className="screen__progress"
                    style={{
                        width: `${progress}%`,
                    }}
                />
            </div>

            <p className="screen__text">{Math.round(progress)}%</p>
        </div>
    );
};

export default LoadingScreen;
