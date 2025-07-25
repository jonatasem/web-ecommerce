import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authServices from '../../hooks/useAuth';
import Loading from '../../components/loading';

import './index.scss';


import imgSignout from '../../assets/img/login/login.png'

// react-icons
import {
    CiLock,
    CiAt
} from "react-icons/ci";
import { CiUser } from "react-icons/ci"; 

export default function SignupPage() {
    const [formData, setFormData] = useState({
        fullname: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [signupError, setSignupError] = useState('');
    const { signup, authLoading } = authServices();
    const navigate = useNavigate();

    const handleFormDataChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmitForm = async (e) => {
        e.preventDefault();
        setSignupError('');

        if (formData.password !== formData.confirmPassword) {
            setSignupError('As senhas não coincidem. Por favor, verifique.');
            return;
        }

        const { confirmPassword, ...dataToSend } = formData;

        const result = await signup(dataToSend);

        if (result.success) {
            console.log('Registro bem-sucedido!', result.user);
            navigate('/', { replace: true });
        } else {
            console.error('Falha no registro:', result.message);
            setSignupError(result.message || 'Ocorreu um erro inesperado no registro. Tente novamente.');
        }
    };

    if (authLoading) {
        return <Loading />;
    }

    return (
        <section className="signup-page">
            <article className="signup-image">
                <img src={imgSignout} alt="imagem de signup" />
            </article>
            <div className="layout-signup"></div>
            <article className="signup-welcome">
                <h2>Crie sua Conta!</h2>
                <div className="welcome-forms">
                    <form onSubmit={handleSubmitForm}>
                        <label htmlFor="fullname">
                            <CiUser className='icon-user' />
                            <input
                                type="text"
                                name="fullname"
                                id="fullname"
                                placeholder="Nome Completo"
                                onChange={handleFormDataChange}
                                required
                                value={formData.fullname}
                            />
                        </label>
                        <label htmlFor="email">
                            <CiAt className='icon-at' />
                            <input
                                type="email"
                                name="email"
                                id="email"
                                placeholder="Endereço de E-mail"
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
                                placeholder='Senha'
                                onChange={handleFormDataChange}
                                required
                                value={formData.password}
                            />
                        </label>
                        <label htmlFor="confirmPassword">
                            <CiLock className='icon-lock' />
                            <input
                                type="password"
                                name="confirmPassword"
                                id="confirmPassword"
                                placeholder='Confirmar Senha'
                                onChange={handleFormDataChange}
                                required
                                value={formData.confirmPassword}
                            />
                        </label>

                        <div className="privacy-notice">
                            <p>By signing below, you agree to the <span>Team of use</span> and <span>privacy notice</span></p>
                        </div>

                        {signupError && <p className="error-message">{signupError}</p>}
                        <button type="submit">Registrar</button>
                    </form>
                    <div className="layout-forms">
                        <ul>
                            <li className='item'></li>
                            <li>Ou</li>
                            <li className='item'></li>
                        </ul>
                    </div>
                    <div className='already-account'>
                        <div className="has-account">
                            <p>Already have an account?<a onClick={() => navigate('/login')}><strong>Login</strong></a></p>
                        </div>
                    </div>
                </div>
            </article>
        </section>
    );
}