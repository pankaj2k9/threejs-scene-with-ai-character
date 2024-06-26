/* eslint-disable no-unused-vars */
import { Suspense, useState, useRef } from "react";
import { Canvas } from "@react-three/fiber";
// eslint-disable-next-line no-unused-vars
import SceneWithDeclarativeWay from "./SceneWithDeclarativeWay";
// import Scene from "./Scene";
import Loader from "./Loader.jsx";
import { Perf } from "r3f-perf";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";

function App() {
  const [progress, setProgress] = useState(0);
  const canvasRef = useRef(null);
  return (
    <Canvas ref={canvasRef}>
      <Perf position="top-left" />
      <PerspectiveCamera makeDefault position={[-1, -4, 6]} fov={65} />
      <Suspense fallback={null}>
        {/* <SceneWithDreiOnlyForSplat onProgress={setProgress} /> */}
        <SceneWithDeclarativeWay
          onProgress={setProgress}
          canvasRef={canvasRef}
          fileurl="https://huggingface.co/datasets/dylanebert/3dgs/resolve/main/bonsai/point_cloud/iteration_7000/point_cloud.ply"
          position={[-3, -2, -3.2]}
        />
        <SceneWithDeclarativeWay
          onProgress={setProgress}
          canvasRef={canvasRef}
          fileurl="https://huggingface.co/datasets/runes/coolsplats/resolve/main/output.splat"
          position={[3, 2, 3.2]}
        />
        {/* <Scene onProgress={setProgress} canvasRef={canvasRef} /> */}
        {/* {progress !== 100 && <Loader progress={progress} />} */}
      </Suspense>
      <OrbitControls />
    </Canvas>
  );
}

export default App;
