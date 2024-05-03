import { useNavigate } from 'react-router-dom';

function useLogout() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('username');

    alert('Logged out due to expired token');

    navigate('/login');
  };

  return logout;
}

export default useLogout;
