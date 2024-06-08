import { useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";

const useUser = () => {
  const user = useSelector((state: RootState) => state.user);

  return user;
};

export default useUser;
