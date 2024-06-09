import { Button } from "@/components/ui/button";
import { getCurrentUser } from "@/redux/slices/userSlice";
import { AppDispatch } from "@/redux/store/store";
import { useDispatch } from "react-redux";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { useEffect } from "react";

import useUser from "@/hooks/useUser";
import useAuth from "@/hooks/useAuth";

const UserProfile = () => {
  const dispatch = useDispatch<AppDispatch>();
  const axiosPrivate = useAxiosPrivate();
  const user = useUser();
  const auth = useAuth();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        await dispatch(getCurrentUser());
      } catch (error) {
        console.error("Failed to fetch user:", error);
      }
    };

    fetchUser();
  }, [dispatch, axiosPrivate]);

  const handleClick = () => {
    console.log("click");
    dispatch(getCurrentUser());
  };

  return (
    <div className="pt-20">
      <h1>User Profile</h1>
      <Button onClick={handleClick}>Current User</Button>
      {auth.loading ? (
        <p>Loading...</p>
      ) : user.error ? (
        <p>Error: {user.error}</p>
      ) : (
        <div>
          <p>ID: {user._id}</p>
          <p>Username: {user.username}</p>
          <p>Email: {user.email}</p>
          <p>
            Avatar: <img src={user.avatarURL} alt="Avatar" />
          </p>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
