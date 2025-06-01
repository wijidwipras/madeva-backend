// src/middlewares/auth.middleware.js
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
  
    if (token == null) {
      console.log('[AuthMiddleware] Akses DITOLAK: Token tidak ada.');
      return res.status(401).json({
        status: 'fail',
        message: 'Akses ditolak. Token tidak disediakan.',
      });
    }
  
    // Verifikasi dummy token
    if (token.startsWith('dummy-auth-token-for-')) {
      req.user = { username: 'userdev' };
      next(); // Lanjutkan ke handler rute (controller)
    } else {
      console.log('[AuthMiddleware] Akses DITOLAK: Token tidak valid.');
      return res.status(403).json({
        status: 'fail',
        message: 'Token tidak valid atau kedaluwarsa.',
      });
    }
  };
  
  module.exports = authenticateToken;