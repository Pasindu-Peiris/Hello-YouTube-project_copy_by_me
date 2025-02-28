import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRouters = ({ allowedRoles }) => {
  const isAuth = sessionStorage.getItem('isAuth');
  const role = sessionStorage.getItem('role');

 
  if (!isAuth) {
    return <Navigate to="/" replace />;
  }

  
  if (!allowedRoles.includes(role)) {
    const redirectPath = role === 'admin' ? '/admin-video-task' : '/user-dashboard';
    return <Navigate to={redirectPath} replace />;
  }

  return <Outlet />;
};

export default ProtectedRouters;