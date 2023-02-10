import React from 'react';
import { useNavigate } from 'react-router-dom';

function PublicRoute({ children }) {
    const isLogged = localStorage.getItem('authenticated');
    const navigate = useNavigate();

    React.useEffect(() => {
        isLogged && navigate('/');
    })

    return children;

}

export default PublicRoute;