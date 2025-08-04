import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import useAuthServices from '../../hooks/useAuth.js'; 
import LoadingComponent from '../../components/loadingComponent';

import AuthComponent from '../../components/authComponent/index.jsx';
import { CiLock, CiAt } from "react-icons/ci";

// Imagens para as mídias sociais
import imgGoogle from '../../assets/img/login/google.svg';
import imgFacebook from '../../assets/img/login/facebook.svg';

export default function LoginPage() {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [errorMessage, setErrorMessage] = useState('');
    const { login, authLoading } = useAuthServices();
    const navigate = useNavigate();

    const handleFormDataChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmitForm = async (e) => {
        e.preventDefault();
        setErrorMessage('');
        const result = await login(formData);
        if (result.success) {
            navigate('/', { replace: true });
        } else {
            setErrorMessage(result.message || 'Ocorreu um erro inesperado no login.');
        }
    };

    if (authLoading) {
        return <LoadingComponent />;
    }

    const formFields = (
        <>
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
            <Link className='forg-pass' to="/forget-password">Forget Password?</Link>
            <div className="auth-layout">
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
            </div>
            <div  className='on-account'>
                <p>Don't have an account? <a onClick={() => navigate('/signup')}>Sign Up</a></p>
            </div>
        </>
    );

    return (
        <AuthComponent
            title="Welcome Back!"
            formFields={formFields}
            onSubmit={handleSubmitForm}
            errorMessage={errorMessage}
        />
    );
}