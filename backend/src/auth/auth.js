import express from 'express';
import passport from 'passport';

const router = express.Router();

// Rota de login
router.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        // Se houver um erro no servidor (ex: erro no banco de dados)
        if (err) {
            return res.status(500).json({ success: false, message: 'Server error.', error: err.message });
        }
        
        // Se a autenticação falhou (usuário ou senha incorretos)
        if (!user) {
            // Retorna a mensagem de erro do Passport em formato JSON
            return res.status(401).json({ success: false, message: info.message });
        }
        
        // Se a autenticação foi bem-sucedida
        req.logIn(user, (err) => {
            if (err) {
                return res.status(500).json({ success: false, message: 'Could not log in user.', error: err.message });
            }
            // Retorna sucesso e os dados do usuário em formato JSON
            // Você precisa gerar um token JWT aqui e retorná-lo
            const token = "SEU_TOKEN_AQUI"; // Exemplo, você deve gerar o token real
            res.status(200).json({ success: true, message: 'Login successful.', body: { user, token } });
        });

    })(req, res, next);
});

export default router;