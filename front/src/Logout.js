import React from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Remover dados de autenticação
        localStorage.removeItem('token');
        localStorage.removeItem('user');

        // Redirecionar para a página de login
        navigate('/login');
    };

    return (
        <div className="logout-screen">
            <h3>Você está saindo</h3>
            <button className="btn btn-danger" onClick={handleLogout}>
                Logout
            </button>
        </div>
    );
};

export default Logout;
