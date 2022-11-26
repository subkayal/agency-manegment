const jsonwebtoken = require('jsonwebtoken');

module.exports = {
  /**
   * Error Message - Return the error message
   *
   * @return {String}
   */
  errorMessage: (msg) => {
    let msgArr = msg.message.split(' ');
    let restMsg = msgArr.slice(1);
    return msg.details[0].context['label'] + ' ' + restMsg.join(' ');
  },

  /**
   * Issue JWT - Generate JWT Authentication token
   *
   * @param {Object} user
   * @return {Object}
   */
  issueJWT: (user) => {
    const expiresIn = '1d';
    const payload = {
      sub: user._id,
      role: user.role,
      iat: Date.now(),
    };
    const signedToken = jsonwebtoken.sign(payload, process.env.jWT_SECRETS, { expiresIn: expiresIn, algorithm: 'HS384' });
    return {
      token: 'Bearer ' + signedToken,
    };
  },
};
