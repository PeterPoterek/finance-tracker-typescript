import { SyncLoader } from "react-spinners";

const LoadingSpinner = () => {
  const spinnerColor = getComputedStyle(document.documentElement)
    .getPropertyValue("--primary")
    .trim();

  return (
    <div
      className="fixed w-full h-full flex justify-center items-center"
      style={{ backgroundColor: "var(--background)" }}
    >
      <SyncLoader color={`hsl(${spinnerColor})`} size={25} />
    </div>
  );
};

export default LoadingSpinner;
