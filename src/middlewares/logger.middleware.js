const loggerMiddleware = (req, res, next) => {
    const timestamp = new Date().toISOString();
    const method = req.method;
    const url = req.url;
    const ip = req.ip || req.connection.remoteAddress;
  
    console.log(`[${timestamp}] ${method} ${url} - IP: ${ip}`);
    next(); // Lanjutkan ke middleware atau handler rute berikutnya
  };
  
  module.exports = loggerMiddleware;