import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store/store';
import { logoutUser } from '@/redux/slices/userSlice';

const useAuth = () => {
  const isLoggedIn = useSelector((state: RootState) => state.isLoggedIn);
  const dispatch = useDispatch<AppDispatch>();

  const logout = () => {
    dispatch(logoutUser());
  };

  const login = () => {};

  return { isLoggedIn, logout, login };
};

export default useAuth;
