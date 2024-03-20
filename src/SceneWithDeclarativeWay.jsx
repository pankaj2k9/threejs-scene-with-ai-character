import { useEffect, useRef } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import * as GaussianSplats3D from '@mkkellogg/gaussian-splats-3d';
import * as THREE from 'three';

const SceneWithDeclarativeWay = ({ onProgress }) => {
  const { gl, camera, scene } = useThree();
  const viewerRef = useRef(null);
  useEffect(() => {
    onProgress(100)
    // Initialize the viewer with the provided renderer and camera from R3F
    const viewer = new GaussianSplats3D.Viewer({
      selfDrivenMode: true,
      renderer: gl,
      camera: camera,
      useBuiltInControls: false,
      ignoreDevicePixelRatio: false,
      gpuAcceleratedSort: true,
      halfPrecisionCovariancesOnGPU: true,
      sharedMemoryForWorkers: true,
      integerBasedSort: true,
      dynamicScene: false,
      webXRMode: GaussianSplats3D.WebXRMode.None,
      renderMode: GaussianSplats3D.RenderMode.OnChange,
      sceneRevealMode: GaussianSplats3D.SceneRevealMode.Instant,
    });

    // Load the scene
    viewer.addSplatScene('https://huggingface.co/datasets/dylanebert/3dgs/resolve/main/bonsai/point_cloud/iteration_7000/point_cloud.ply')
    .then(() => {
        viewer.start()
    });

    viewerRef.current = viewer;

    return () => {
      // Perform cleanup
      viewer.dispose();
      viewerRef.current = null;
    };
  }, [gl, camera]); // Depend on gl and camera to ensure they are initialized

  useFrame(() => {
    if (viewerRef.current) {
       viewerRef.current.update();
       viewerRef.current.render();
    }
  });

  return null; // This component does not render anything itself
};
export default SceneWithDeclarativeWay;
