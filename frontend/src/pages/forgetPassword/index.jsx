import imgForgetPassword from '../../assets/img/login/login.png'
import './index.scss'

// react-icons
import {
    CiAt
} from "react-icons/ci";

export default function ForgetPassword(){
    return (
        <section className="forget-password">
            <article className="image-password">
                <img src={imgForgetPassword} alt="imagem do forget password" />
            </article>
            <div className="layout-password"></div>
            <article className="password-forms">
                <h2>Forget Password</h2>
                <p>Please enter your email address below you will receive a verification link</p>
                    <form>
                        <label htmlFor="email">
                            <CiAt className='icon-at'/>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                placeholder="Email Address"
                                required
                            />
                        </label>
                        <button>Continue</button>
                    </form>
            </article>
        </section>
    )
}