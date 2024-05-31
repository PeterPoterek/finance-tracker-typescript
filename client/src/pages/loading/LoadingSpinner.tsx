import { SyncLoader } from "react-spinners";

const LoadingSpinner = () => {
  return (
    <div className="absolute w-full h-full bg-slate-400 flex justify-center items-center">
      <SyncLoader color="#36d7b7" size={25} />
    </div>
  );
};

export default LoadingSpinner;
