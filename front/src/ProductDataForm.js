import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

const ProductDataForm = () => {
    const [formData, setFormData] = useState({
        id: '',
        produto: '',
        categoria: '',
        preco: ''
    });

    const [responseMessage, setResponseMessage] = useState('');
    const [searchId, setSearchId] = useState('');
    const [searchResult, setSearchResult] = useState(null);
    const [produtos, setProdutos] = useState([]);

    // Define a URL base para o axios
    axios.defaults.baseURL = 'http://localhost:8080/produtoRoute/';

    // Função para listar produtos ao carregar o componente
    const handleListarProdutos = async () => {
        try {
            const response = await axios.get('/listproduto/');
            setProdutos(response.data);
        } catch (error) {
            setResponseMessage('Erro ao listar produtos.');
        }
    };

    // useEffect para carregar a lista de produtos quando o componente for montado
    useEffect(() => {
        handleListarProdutos();
    }, []);

    // Tratar o evento change dos campos do form
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // Tratar o evento de mudança no campo de pesquisa
    const handleSearchChange = (e) => {
        setSearchId(e.target.value);
    };

    // Tratar o salvar / grava dados
    const handleSave = async (e) => {
        e.preventDefault(); // Previne o comportamento padrão do formulário
        try {
            const response = await axios.post('/novoproduto', formData);
            setResponseMessage('Produto cadastrado com sucesso!');
            handleClear();
            handleListarProdutos(); // Atualiza a lista de produtos após salvar
        } catch (error) {
            setResponseMessage('Erro ao cadastrar o produto.');
        }
    };

    const handleClear = () => {
        setFormData({
            id: '',
            produto: '',
            categoria: '',
            preco: ''
        });
        setResponseMessage('');
        setSearchId('');
        setSearchResult(null);
    };

    const handleSearch = async () => {
        try {
            const response = await axios.get(`/produtos/${searchId}`);
            if (response.data) {
                setSearchResult(response.data);
                setFormData(response.data); // Preenche o formulário com os dados do produto encontrado
                setResponseMessage('');
            } else {
                setResponseMessage('Produto não encontrado.');
            }
        } catch (error) {
            setResponseMessage('Erro ao buscar o produto.');
        }
    };

    return (
        <div className="container mt-5">
            <div className="card">
                <div className="card-body">
                    <h3 className="card-title text-center">Cadastro de Produtos</h3>

                    {/* Formulário de Pesquisa */}
                    <div className="form-group">
                        <label htmlFor="searchId">Pesquisar Produto por ID:</label>
                        <div className="input-group">
                            <input
                                type="text"
                                id="searchId"
                                className="form-control"
                                value={searchId}
                                onChange={handleSearchChange}
                            />
                            <div className="input-group-append">
                                <button className="btn btn-info" onClick={handleSearch}>Buscar</button>
                            </div>
                        </div>
                    </div>

                    {searchResult && (
                        <div className="alert alert-success">
                            Produto encontrado: {searchResult.produto} (ID: {searchResult.id})
                        </div>
                    )}

                    {responseMessage && <div className="alert alert-info">{responseMessage}</div>}

                    <form onSubmit={handleSave}>
                        <div className="form-group">
                            <label htmlFor="id">Id:</label>
                            <input
                                type="text"
                                name="id"
                                id="id"
                                className="form-control"
                                value={formData.id}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="produto">Produto:</label>
                            <input
                                type="text"
                                name="produto"
                                id="produto"
                                className="form-control"
                                value={formData.produto}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                        <label htmlFor="categoria">Categoria:</label>
                            <input
                                type="text"
                                name="categoria"
                                id="categoria"
                                className="form-control"
                                value={formData.categoria}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="preco">Preço:</label>
                            <input
                                type="text"
                                name="preco"
                                id="preco"
                                className="form-control"
                                value={formData.preco}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="text-center">
                            <button type="submit" className="btn btn-primary">Salvar</button>
                            <button type="button" className="btn btn-secondary ml-2" onClick={handleClear}>Limpar</button>
                        </div>
                    </form>

                    {/* Lista de Produtos */}
                    {produtos.length > 0 && (
                        <div className="mt-4">
                            <h4>Lista de Produtos</h4>
                            <ul className="list-group">
                                {produtos.map((produto) => (
                                    <li key={produto.id} className="list-group-item">
                                        {produto.produto} - {produto.categoria} - R$ {produto.preco}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductDataForm;