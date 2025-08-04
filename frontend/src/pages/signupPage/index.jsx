import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthServices from '../../hooks/useAuth.js';
import LoadingComponent from '../../components/loadingComponent';

import AuthComponent from '../../components/authComponent/index.jsx';
import { CiLock, CiAt, CiUser } from "react-icons/ci";

export default function SignupPage() {
    const [formData, setFormData] = useState({
        fullname: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [errorMessage, setErrorMessage] = useState('');
    const { signup, authLoading } = useAuthServices();
    const navigate = useNavigate();

    const handleFormDataChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmitForm = async (e) => {
        e.preventDefault();
        setErrorMessage('');
        if (formData.password !== formData.confirmPassword) {
            setErrorMessage('As senhas não coincidem. Por favor, verifique.');
            return;
        }
        const { confirmPassword, ...dataToSend } = formData;
        const result = await signup(dataToSend);
        if (result.success) {
            console.log('Registro bem-sucedido!', result.user);
            navigate('/login', { replace: true });
        } else {
            setErrorMessage(result.message || 'Ocorreu um erro inesperado no registro. Tente novamente.');
        }
    };

    if (authLoading) {
        return <LoadingComponent />;
    }

    const formFields = (
        <>
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
        </>
    );

    const hasAccountLink = (
        <div className="has-account">
            <p>Already have an account? <a onClick={() => navigate('/login')}><strong>Login</strong></a></p>
        </div>
    );

    return (
        <AuthComponent
            title="Crie sua Conta!"
            formFields={formFields}
            onSubmit={handleSubmitForm}
            errorMessage={errorMessage}
            socialMediaSection={hasAccountLink}
        />
    );
}