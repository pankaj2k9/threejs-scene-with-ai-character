import { useEffect } from "react";
import { useThree } from "@react-three/fiber";
import * as SPLAT from "gsplat"; // Assuming this is correct

function Scene({ onProgress, canvasRef }) {
  const { scene } = useThree(); // Removed unused destructured variables for clarity

  useEffect(() => {
    let isMounted = true; // Flag to track component's mount state

    async function loadSplatObjects() {
      const url =
        "https://huggingface.co/datasets/dylanebert/3dgs/resolve/main/bonsai/point_cloud/iteration_7000/point_cloud.ply";

      try {
        // Load the SPLAT object
        const object = await SPLAT.PLYLoader.LoadAsync(url, scene, (progress) => {
          if (isMounted) {
            onProgress(progress * 100);
          }
        });

        // Ensure the component is still mounted before modifying the scene
        if (isMounted && object) {
          scene.add(object);
        }

        // Return a cleanup function that removes the object from the scene
        return () => {
          if (object) {
            scene.remove(object);
            // Properly dispose of the object if necessary
            if (typeof object.dispose === "function") {
              object.dispose();
            }
          }
        };
      } catch (error) {
        console.error("Failed to load object:", error);
      }
    }

    if (canvasRef?.current) {
      const cleanupFn = loadSplatObjects();

      // Cleanup function to be called on component unmount
      return () => {
        isMounted = false; // Indicate the component has unmounted
        cleanupFn.then((fn) => fn && fn()); // Ensure cleanup is called if defined
      };
    }
  }, [onProgress, canvasRef]);

  return null;
}

export default Scene;
