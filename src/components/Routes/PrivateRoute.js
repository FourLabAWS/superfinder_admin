import React from 'react';
import { useNavigate } from 'react-router-dom';

function PrivateRoute({ children }) {
    const isLogged = localStorage.getItem('authenticated');
    const navigate = useNavigate();

    React.useEffect(() => {
        isLogged === null && navigate('/login');
    });
        
    return isLogged && children;


}

export default PrivateRoute;