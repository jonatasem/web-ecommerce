import { Link } from 'react-router-dom';
import './index.scss';

import imgFooterRight from '../../assets/img/footer/right-footer.png';
import imgFooterLeft from '../../assets/img/footer/footer-left.png';

export default function FooterComponent() {
    return (
        <footer className='footer-container'>
            <article className="footer-head">
                <div>
                    <h3>Entre em Contato</h3>
                    <ul>
                        <li>Fale Conosco</li>
                        <li>Perguntas Frequentes</li>
                        <li>Suporte ao Cliente</li>
                        <li>Deixe seu Feedback</li>
                    </ul>
                </div>

                <div className='item-footer-right'>
                    <h3>Sobre Nós</h3>
                    <ul>
                        <li>Quem Somos</li>
                        <li>Nossa Missão</li>
                        <li>Nossos Valores</li>
                        <li>Trabalhe Conosco</li>
                    </ul>
                </div>

                <div>
                    <h3>Redes Sociais</h3>
                    <ul>
                        <li>Facebook</li>
                        <li>Instagram</li>
                        <li>Twitter</li>
                        <li>LinkedIn</li>
                    </ul>
                </div>

                <div className='item-footer-right'>
                    <h3>Serviços</h3>
                    <ul>
                        <li>Entrega</li>
                        <li>Catering</li>
                        <li>Reservas</li>
                        <li><Link to="/plates">Nosso Menu</Link></li>
                    </ul>
                </div>
                
                <img className='layout-footer-left' src={imgFooterLeft} alt="footer left" />
                <img className='layout-footer-right' src={imgFooterRight} alt="footer right" />
            </article>
            <article className="footer-main">
                <div>
                    <p>&copy; 2025 Restaurante Delícia. Todos os direitos reservados.</p>
                </div>
                <div>
                    <p>Visite nosso site: <a href="https://jonatasmoreira.com" target="_blank" rel="noopener noreferrer">jonatasmoreira.com</a></p>
                </div>
                <div>
                    <p>Desenvolvedor: Jonatas Moreira</p>
                </div>
            </article>
        </footer>
    );
}