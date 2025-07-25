import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authServices from '../../services/auth';
import Loading from '../../components/loading';


// Imagens (Adapte os caminhos ou adicione imgSignup se necessário)
import imgGoogle from '../../assets/img/login/google.svg';
import imgFacebook from '../../assets/img/login/facebook.svg';

// react-icons
import {
    CiLock,
    CiAt
} from "react-icons/ci";
import { FaUser } from "react-icons/fa"; // Para o campo de nome completo

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

        const { confirmPassword, ...dataToSend } = formData; // Remove 'confirmPassword' antes de enviar

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
                <p>imagem</p>
            </article>
            <div className="layout-signup"></div>
            <article className="signup-welcome">
                <h2>Crie sua Conta!</h2>
                <div className="welcome-forms">
                    <form onSubmit={handleSubmitForm}>
                        <label htmlFor="fullname">
                            <FaUser className='icon-user' />
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

                        {signupError && <p className="error-message" style={{ color: 'red', fontSize: '0.8rem', marginTop: '5px' }}>{signupError}</p>}
                        <button type="submit">Registrar</button>
                    </form>
                    <div className="layout-forms">
                        <ul>
                            <li className='item'></li>
                            <li>Ou</li>
                            <li className='item'></li>
                        </ul>
                    </div>
                    <div className='social-media'>
                        <ul>
                            <li>
                                <img src={imgGoogle} alt="Google logo" />
                                Google
                            </li>
                            <li>
                                <img src={imgFacebook} alt="Facebook logo" />
                                Facebook
                            </li>
                        </ul>
                        <div className="has-account">
                            <p>Já tem uma conta? <a href="#" onClick={() => navigate('/login')}>Fazer Login</a></p>
                        </div>
                    </div>
                </div>
            </article>
        </section>
    );
}