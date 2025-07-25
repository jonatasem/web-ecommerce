import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import authServices from '../../hooks/useAuth'; 
import Loading from '../../components/loading';

import './index.scss';

// Imagens
import imgLogin from '../../assets/img/login/login.png';
import imgGoogle from '../../assets/img/login/google.svg';
import imgFacebook from '../../assets/img/login/facebook.svg';

// react-icons
import {
    CiLock,
    CiAt
} from "react-icons/ci";

export default function LoginPage() {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [loginError, setLoginError] = useState('');
    const { login, authLoading } = authServices();
    const navigate = useNavigate();

    const handleFormDataChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmitForm = async (e) => {
        e.preventDefault();
        setLoginError('');

        const result = await login(formData); // Aguarda o resultado do login

        if (result.success) {
            console.log('Login bem-sucedido!', result.user);
            navigate('/', { replace: true });
        } else {
            console.error('Falha no login:', result.message);
            setLoginError(result.message || 'Ocorreu um erro inesperado no login.');
        }
    };

    if (authLoading) {
        return <Loading />;
    }

    return (
        <section className="login-page">
            <article className="login-image">
                <img src={imgLogin} alt="imagem de boas vindas" />
            </article>
            <div className="layout-login"></div>
            <article className="login-welcome">
                <h2>Welcome Back!</h2>
                <div className="welcome-forms">
                    <form onSubmit={handleSubmitForm}>
                        <label htmlFor="email">
                            <CiAt className='icon-at' />
                            <input
                                type="email"
                                name="email"
                                id="email"
                                placeholder="Email Address"
                                onChange={handleFormDataChange}
                                required
                                value={formData.email}
                            />
                        </label>
                        <label htmlFor="password">
                            <CiLock className='icon-lock' />
                            <input
                                type="password"
                                name="password"
                                id="password"
                                placeholder='Password'
                                onChange={handleFormDataChange}
                                required
                                value={formData.password}
                            />
                        </label>
                        <Link to="/forget-password">Forget Password?</Link>
                        {loginError && <p className="error-message">{loginError}</p>}
                        <button type="submit">Login</button>
                    </form>
                    <div className="layout-forms">
                        <ul>
                            <li className='item'></li>
                            <li>Or</li>
                            <li className='item'></li>
                        </ul>
                    </div>
                    <div className='social-media'>
                        <ul>
                            <li>
                                <img src={imgGoogle} alt="Google logo" />
                                Em breve
                            </li>
                            <li>
                                <img src={imgFacebook} alt="Facebook logo" />
                                Em breve
                            </li>
                        </ul>
                        <div className="dont-account">
                            <p>Don't have an account? <a onClick={() => navigate('/signup')}>Sign Up</a></p>
                        </div>
                    </div>
                </div>
            </article>
        </section>
    );
}