import React, { useState } from 'react';
import axios from 'axios';

const LoginForm = ({ onLoginSuccess }) => { // Recebe a função de callback
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const [responseMessage, setResponseMessage] = useState('');

    // Handle form input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                'http://localhost:8080/users/login', // Substituir pela rota correta
                formData,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );

            if (response.status === 200) {
                setResponseMessage('Login bem-sucedido!');
                localStorage.setItem('token', response.data.token);
                onLoginSuccess(); // Chama a função de callback para redirecionar
            } else {
                setResponseMessage('Erro ao realizar login.');
            }
        } catch (error) {
            setResponseMessage('Falha ao conectar ao servidor.');
        }
    };

    return (
        <div className="login-form">
            <h3>Login</h3>
            <form onSubmit={handleSubmit} className="form-group">
                <div>
                    <label>Email:</label>
                    <input
                        className="form-control"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Senha:</label>
                    <input
                        className="form-control"
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary btn-block mt-3">Login</button>
            </form>
            {responseMessage && <p>{responseMessage}</p>}
        </div>
    );
};

export default LoginForm;