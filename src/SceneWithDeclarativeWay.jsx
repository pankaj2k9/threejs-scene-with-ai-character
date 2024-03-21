/* eslint-disable no-unused-vars */
import { useEffect, useRef } from "react";
import { useThree, useFrame } from "@react-three/fiber";
import * as GaussianSplats3D from "@mkkellogg/gaussian-splats-3d";

const SceneWithDeclarativeWay = ({ onProgress, fileurl, position }) => {
  const { gl, camera, scene } = useThree();
  useEffect(() => {
    // onProgress(100);
    // Initialize the viewer with the provided renderer and camera from R3F
    const viewer = new GaussianSplats3D.DropInViewer();

    // Load the scene
    viewer
      .addSplatScene(fileurl, {
        streamView: true,
        scale: [0.5, 0.5, 0.5],
        position: position,
      })
      .then(() => {
        // viewer.start();
        scene.add(viewer);
      });

    return () => {
      // Perform cleanup
      viewer.dispose();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gl, camera]);

  // useFrame(() => {
  //   if (viewerRef.current) {
  //     viewerRef.current.update();
  //     viewerRef.current.render();
  //   }
  // });

  return null;
};
export default SceneWithDeclarativeWay;
