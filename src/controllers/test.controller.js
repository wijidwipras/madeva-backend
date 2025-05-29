const testCheck = (req, res) => {
    res.status(200).json({
      status: 'success',
      message: 'Backend API is running well!',
      timestamp: new Date().toISOString(),
    });
  };

  module.exports = {
    testCheck,
  };