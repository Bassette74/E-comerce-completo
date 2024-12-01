import React, { useState } from 'react';
import './App.css';
import UserAccountForm from './UserAccountForm'; // Certifique-se de que o nome do arquivo está correto
import LoginForm from './LoginForm';
import ProductDataForm from './ProductDataForm'; // Importa o novo componente
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap

function App() {
    const [currentPage, setCurrentPage] = useState('landing');

    // Função para alterar a página atual
    const handleNavClick = (page) => {
        setCurrentPage(page);
    };

    // Função chamada quando o login é bem-sucedido
    const handleLoginSuccess = () => {
        setCurrentPage('productData'); // Muda para a página de cadastro de produtos
    };

    // Função chamada quando a conta é criada com sucesso
    const handleAccountCreated = () => {
        setCurrentPage('productData'); // Muda para a página de cadastro de produtos
    };

    return (
        <div className="App">
            {/* Navbar */}
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <a className="navbar-brand" href="#">Landing Page</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <button className="nav-link btn" onClick={() => handleNavClick('createAccount')}>Criar conta</button>
                        </li>
                        <li className="nav-item">
                            <button className="nav-link btn" onClick={() => handleNavClick('login')}>Login</button>
                        </li>
                    </ul>
                </div>
            </nav>

            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        {/* Renderiza o formulário com base na página atual */}
                        {currentPage === 'createAccount' && (
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">Criar Conta</h5>
                                    <UserAccountForm onAccountCreated={handleAccountCreated} />
                                </div>
                            </div>
                        )}
                        {currentPage === 'login' && (
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">Login</h5>
                                    <LoginForm onLoginSuccess={handleLoginSuccess} />
                                </div>
                            </div>
                        )}
                        {currentPage === 'productData' && (
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">Cadastro de Produtos</h5>
                                    <ProductDataForm />
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;