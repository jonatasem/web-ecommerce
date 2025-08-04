import imgAuth from '../../assets/img/login/login.png';

export default function AuthComponent({ title, formFields, onSubmit, errorMessage }) {
    return (
        <section className="auth-page">
            <article className="auth-image">
                <img src={imgAuth} alt="imagem de boas vindas" />
            </article>

            <div className="auth-layout"></div>
            
            <article className="auth-forms">
                <h2>{title}</h2>
                <div className="layout-auth-forms">
                    <form onSubmit={onSubmit}>
                        {formFields}
                        {errorMessage && <p className="error-message">{errorMessage}</p>}
                        <button type="submit">
                            {title.includes('Welcome') ? 'Login' : 'Registrar'}
                        </button>
                    </form>
                </div>
            </article>
        </section>
    );
}