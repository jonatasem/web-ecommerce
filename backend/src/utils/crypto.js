import crypto from 'crypto';

export function hashPassword(password) {
    return new Promise((resolve, reject) => {
        const salt = crypto.randomBytes(16);
        crypto.pbkdf2(password, salt, 310000, 16, 'sha256', (err, hashedPassword) => {
            if (err) {
                return reject(err);
            }
            resolve({ hashedPassword, salt });
        });
    });
}

export function checkPassword(password, salt, hashedPassword) {
    return new Promise((resolve, reject) => {
        crypto.pbkdf2(password, salt.buffer, 310000, 16, 'sha256', (err, newHashedPassword) => {
            if (err) {
                return reject(err);
            }
            resolve(crypto.timingSafeEqual(hashedPassword.buffer, newHashedPassword));
        });
    });
}