import bcrypt from 'bcrypt';
import { generateToken } from '../config/jwt.js';
import { getUserByEmailService, createUserService } from '../services/userService.js';

const handleResponse = (res, status, message, data = null) => {
  res.status(status).json({
    message,
    data
  });
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      handleResponse(res, 400, 'E-posta ve şifre gereklidir');
      return;
    }
    const user = await getUserByEmailService(email);
    if (!user) {
      handleResponse(res, 404, 'Kullanıcı bulunamadı');
      return;
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    
    if (!isPasswordValid) {
      handleResponse(res, 401, 'Geçersiz şifre');
      return;
    }
    const { password: userPassword, ...userWithoutPassword } = user;
    const token = generateToken({ id: user.id, email: user.email });
    handleResponse(res, 200, 'Giriş başarılı', { 
      user: userWithoutPassword, 
      token 
    });
    
  } catch (error) {
    next(error);
  }
};

export const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      handleResponse(res, 400, 'Ad, e-posta ve şifre gereklidir');
      return;
    }
    const existingUser = await getUserByEmailService(email);
    
    if (existingUser) {
      handleResponse(res, 409, 'Bu e-posta adresi zaten kullanılıyor');
      return;
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await createUserService(name, email, hashedPassword);
    if (!user) {
      handleResponse(res, 400, 'Kullanıcı oluşturma başarısız');
      return;
    }
    const { password: userPassword, ...userWithoutPassword } = user;
    const token = generateToken({ id: user.id, email: user.email });
    handleResponse(res, 201, 'Kullanıcı başarıyla oluşturuldu', { 
      user: userWithoutPassword, 
      token 
    });
    
  } catch (error) {
    next(error);
  }
}; 