import { useState, useEffect } from "react";
import { TextField } from "@mui/material";
import authServices from "../../services/auth";
import { useNavigate } from "react-router-dom";
import { LuLogIn } from "react-icons/lu";
import './index.scss';

import Loading from '../../components/loading'

import { 
    FaWhatsapp,
    FaInstagram,
    FaLinkedin  
} from "react-icons/fa";


export default function Auth() {
    const [formType, setFormType] = useState('login'); // Tipo de formulário (login ou signup)
    const [formData, setFormData] = useState(null); // Dados do formulário
    const { login, signup, authLoading } = authServices(); // Serviços de autenticação
    const navigate = useNavigate();

    const authData = JSON.parse(localStorage.getItem('auth'));

    // Redireciona para o perfil se já estiver autenticado
    useEffect(() => {
        if (authData) {
            return navigate('/perfil');
        }
    }, [authData]);

    // Alterna entre os tipos de formulário
    const handleChangeFormType = () => {
        setFormData(null); // Reseta os dados do formulário
        setFormType(formType === 'login' ? 'signout' : 'login'); // Alterna o tipo de formulário
    };

    // Atualiza os dados do formulário com base na entrada do usuário
    const handleFormDataChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    // Envia o formulário
    const handleSubmitForm = (e) => {
        e.preventDefault();
        
        switch (formType) {
            case 'login':
                login(formData); // Chama a função de login
                break;
            case 'signout':
                if (formData.password !== formData.confirmPassword) {
                    console.log('Passwords do not match'); // Verifica se as senhas coincidem
                    return;
                }
                signup(formData); // Chama a função de registro
                break;
        }
    };

    if (authLoading) {
        return (<Loading />); // Exibe carregamento durante autenticação
    }

    return (
        <section className="auth-container">
            {formType === 'login' ? (
                <article className="login-container">
                    <div className="login-left">
                        <h1>Faça login com sua conta</h1>
                        <ul>
                            <li><FaWhatsapp /></li>
                            <li><FaInstagram /></li>
                            <li><FaLinkedin /></li>
                        </ul>
                        <form onSubmit={handleSubmitForm}>
                            <TextField 
                            required
                            label="Email"
                            type="email"
                            name="email"
                            className="input-login"
                            onChange={handleFormDataChange}
                            />
                            <TextField 
                            required
                            label="Password"
                            type="password"
                            name="password"
                            className="input-login"
                            onChange={handleFormDataChange}
                            />
                            <button type="submit">Login <LuLogIn className="icon"/></button>
                        </form>
                    </div>
                    <div className="login-right">
                        <h1>Novo aqui?</h1>
                        <h3>Cadastre-se e crie experiências inesquecíveis</h3>
                        <button onClick={handleChangeFormType}>
                            <span></span>
                            Criar Conta
                        </button>
                    </div>
                </article>
            ) : null}

            {formType === 'signout' ? (
                <article className="signout-container">
                    <div className="signout-left">
                        <h1>Já possui uma conta?</h1>
                        <button onClick={handleChangeFormType}>Faça Login</button>
                    </div>
                    <div className="signout-right">
                        <h2>Crie sua conta gratuitamente!</h2>
                        <form onSubmit={handleSubmitForm}>
                            <TextField 
                            required
                            label="Fullname"
                            type="fullname"
                            name="fullname"
                            onChange={handleFormDataChange}
                            className="input-signout"
                            />
                            <TextField 
                            required
                            label="Email"
                            type="email"
                            name="email"
                            onChange={handleFormDataChange}
                            className="input-signout"
                            />
                            <TextField 
                            required
                            label="Password"
                            type="password"
                            name="password"
                            onChange={handleFormDataChange}
                            className="input-signout"
                            />
                            <TextField 
                            required
                            label="Confirm password"
                            type="password"
                            name="confirmPassword"
                            onChange={handleFormDataChange}
                            className="input-signout"
                            />
                            <button type="submit">Signup <LuLogIn /></button>
                        </form>
                    </div>
                </article>
            ) : null}
        </section>
    );
}
