import { verifyToken } from '../config/jwt.js';

export const authenticate = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ 
        message: 'Erişim yetkiniz yok. Giriş yapmalısınız.'
      });
    }
    const token = authHeader.split(' ')[1];
    const result = verifyToken(token);
    
    if (!result.success) {
      return res.status(401).json({ 
        message: 'Geçersiz token veya süresi dolmuş.'
      });
    }
    req.user = result.data;
    next();
    
  } catch (error) {
    return res.status(500).json({ 
      message: 'Kimlik doğrulama hatası.'
    });
  }
}; 