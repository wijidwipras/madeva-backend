const DUMMY_USERNAME = "userdev";
const DUMMY_PASSWORD = "password123";

const login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({
      status: 'fail',
      message: 'Username dan password wajib diisi.',
    });
  }

  // Verifikasi dummy credentials
  if (username === DUMMY_USERNAME && password === DUMMY_PASSWORD) {
    const dummyToken = `dummy-auth-token-for-<span class="math-inline">\{username\}\-</span>{Date.now()}`;

    return res.status(200).json({
      status: 'success',
      message: 'Login berhasil.',
      data: {
        token: dummyToken,
        user: {
          username: DUMMY_USERNAME,
        }
      }
    });
  } else {
    return res.status(401).json({
      status: 'fail',
      message: 'Username atau password salah.',
    });
  }
};

module.exports = {
  login,
};