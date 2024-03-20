import { Html } from "@react-three/drei";

function Loader({ progress }) {
  return (
    <Html center>
      <div
        style={{
          color: "white",
          backgroundColor: "black",
          minWidth: "150px",
          padding: "10px 5px",
          borderRadius: 5,
        }}
      >
        {progress < 100 ? `Loading: ${progress.toFixed(0)}%` : "Load complete!"}
      </div>
    </Html>
  );
}

export default Loader;
