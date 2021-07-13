import { Canvas } from "@react-three/fiber";
import { CSSProperties, FC, useCallback, useEffect, useState } from "react";
import { globalConfig } from "../../globalConfig";

import { Splash } from "../scenes/Splash";

import { GameInstance } from "../types";

interface Props {
    instance: GameInstance;
}

const styles = {
    previewContainer: {
        position: 'absolute',
    } as CSSProperties,
    absolutePositionStyle: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    } as CSSProperties,
}

export const GameInstanceRenderer: FC<Props> = ({instance}) => {
    const [showSplash, setShowSplash] = useState(true);
    
    const {
        Game,
        Ui,
    } = instance;

    useEffect(() => {setTimeout(() => setShowSplash(false), globalConfig.SHOW_SPLASH ? 2000 : 0)}, []);

    const lockMouse = useCallback(() => {
        // alert('mouse lock');
        document.body.requestPointerLock();
    }, []);

    useEffect(() => {
        document.addEventListener('click', lockMouse);
    }, [lockMouse])

    if (showSplash) {
        return (
            <Canvas style={styles.absolutePositionStyle} shadows camera={{position: [10, 10, 10]}}>
                <Splash />
            </Canvas>
        )
    }

    return (
        <div style={styles.absolutePositionStyle}>
            <Canvas
                style={styles.absolutePositionStyle}
                shadows
                camera={{position: [0, 5, 9], fov: 100}}
            >
                <Game />
            </Canvas>
            <div style={{...styles.absolutePositionStyle, pointerEvents: 'none'}}>
                <Ui/>
            </div>
        </div>
    )
}
