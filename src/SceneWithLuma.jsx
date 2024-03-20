/* eslint-disable react/no-unknown-property */
import { extend } from "@react-three/fiber";
import { LumaSplatsThree, LumaSplatsSemantics } from "@lumaai/luma-web";

// Make LumaSplatsThree available to R3F
extend({ LumaSplats: LumaSplatsThree });

function SceneWithLuma() {
  return (
    <lumaSplats
      semanticsMask={LumaSplatsSemantics.FOREGROUND}
      source="https://lumalabs.ai/capture/d80d4876-cf71-4b8a-8b5b-49ffac44cd4a"
      position={[-1, 0, 0]}
      scale={0.5}
      loadingAnimationEnabled
    />
  );
}

export default SceneWithLuma;
