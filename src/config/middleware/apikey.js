module.exports = {
    requireApiKey: (req, res, next) => {
      const apiKey = req.header('x-api-key');
      if (!apiKey) {
        return res.status(401).json({ success: false, message: 'x-api-key is required in header' });
      }
      if (apiKey !== process.env.API_KEY) {
        return res.status(401).json({ success: false, message: 'Invalid api-key'});
      }
      return next();
    },
  };