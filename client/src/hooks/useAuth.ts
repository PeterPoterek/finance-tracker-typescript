import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store/store';
import { logoutUser } from '@/redux/slices/userSlice';
import { useNavigate } from 'react-router-dom';

const useAuth = () => {
  const isLoggedIn = useSelector((state: RootState) => state.isLoggedIn);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const logout = () => {
    dispatch(logoutUser());
    navigate('/');
  };

  const login = () => {};

  return { isLoggedIn, logout, login };
};

export default useAuth;
