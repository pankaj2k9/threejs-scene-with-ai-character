/* eslint-disable react/no-unknown-property */
import { extend } from "@react-three/fiber";
import { LumaSplatsThree, LumaSplatsSemantics } from "@lumaai/luma-web";

// Make LumaSplatsThree available to R3F
extend({ LumaSplats: LumaSplatsThree });

function SceneWithLuma() {
  return (
    <lumaSplats
      semanticsMask={LumaSplatsSemantics.FOREGROUND}
      source="https://huggingface.co/datasets/dylanebert/3dgs/resolve/main/bonsai/point_cloud/iteration_7000/point_cloud.ply"
      position={[-1, 0, 0]}
      scale={0.5}
      loadingAnimationEnabled
    />
  );
}

export default SceneWithLuma;
