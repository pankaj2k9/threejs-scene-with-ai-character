import { useEffect } from "react";
import { Splat, OrbitControls } from "@react-three/drei";
function SceneWithDreiOnlyForSplat({ onProgress }) {
  useEffect(() => {
    onProgress(100);
  }, []);
  return (
    <>
      <OrbitControls
        maxDistance={0.5}
        minDistance={0.3}
        maxPolarAngle={Math.PI * 0.75}
        minPolarAngle={Math.PI * 0.25}
        minAzimuthAngle={Math.PI * 1.75}
        maxAzimuthAngle={Math.PI * 2.25}
      />
      <Splat
        src="https://huggingface.co/datasets/runes/coolsplats/resolve/main/output.splat"
        rotation={[0.55 * Math.PI, 0.01 * Math.PI, 1.25 * Math.PI]}
      />
    </>
  );
}

export default SceneWithDreiOnlyForSplat;
