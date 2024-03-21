import { useEffect } from "react";
import { useThree } from "@react-three/fiber";
import * as SPLAT from "gsplat"; // Assuming gsplat is correctly installed and imported

function Scene({ onProgress }) {
  const { scene } = useThree(); // useThree provides access to the Three.js scene object

  useEffect(() => {
    let isMounted = true; // Flag to manage component lifecycle

    // Define an async function to load and add SPLAT objects to the Three.js scene
    async function loadSplatObjects() {
      const splatScene = new SPLAT.Scene();
      const url =
        "https://huggingface.co/datasets/dylanebert/3dgs/resolve/main/bonsai/point_cloud/iteration_7000/point_cloud.ply";

      try {
        // Load the SPLAT object asynchronously
        const splatObject = await SPLAT.PLYLoader.LoadAsync(url, splatScene, (progress) => {
          if (isMounted) {
            onProgress(progress * 100);
          }
        });

        // Check if the component is still mounted before adding the object to the scene
        if (isMounted && splatObject) {
          scene.add(splatScene);
        }

        // Return a cleanup function to remove the object from the scene and perform necessary cleanup
        return () => {
          if (splatObject) {
            scene.remove(splatObject);
            // Dispose of the object if it has a dispose method
            if (typeof splatObject.dispose === "function") {
              splatObject.dispose();
            }
          }
        };
      } catch (error) {
        console.error("Failed to load the SPLAT object:", error);
      }
    }

    // Invoke the load function
    const cleanupFn = loadSplatObjects();

    // Cleanup logic to be executed when the component unmounts
    return () => {
      isMounted = false; // Indicate the component has unmounted
      cleanupFn.then((fn) => fn && fn()); // Execute the cleanup function if it's available
    };
  }, [onProgress, scene]); // Dependency array includes scene to ensure the effect is correctly updated

  return null; // This component does not render anything itself
}

export default Scene;
