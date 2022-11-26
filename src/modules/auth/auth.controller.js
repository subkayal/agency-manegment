const _ = require('lodash');
const jwt = require('jsonwebtoken');

const UserModel = require('../../models/user.model');
const commonService = require('../../service/common.service');

const { validateRegister, validateLogin } = require('./auth.validation');
const { errorMessage } = require('../../utils/helper');

module.exports = {
  /**
   * @method login
   * @description "This method for User login"
   * @api "POST /"
   *
   */

  login: async (req, res) => {
    try {
      const { body } = req;

      const { error } = validateLogin(body);
      if (error) return res.status(400).json({ success: false, message: errorMessage(error) });


      const query = { email: body['email'].toLowerCase(), is_active: true, is_deleted: false };
      const user_check = await commonService.findOneByFields(UserModel, query);

      if (_.isEmpty(user_check)) {
        return res.status(404).json({ success: false, body: {}, message: 'Invalid email-id and password. Please check your email-id and password' });
      }

      const isPasswordMatch = await user_check.comparePassword(user_check['password'], body['password']);
      if (!isPasswordMatch) {
        return res.status(401).json({ success: false, body: {}, message: 'Worng Password' });
      }
      const payload = { id: user_check._id };
      let token = jwt.sign(payload, process.env.jWT_SECRETS, { expiresIn: 86400});

      const res_data = {
        user: _.pick(user_check, ['_id', 'email']),
        token: token,
      };
      return res.status(200).json({ success: true, body: res_data, message: 'Login success' });
    } catch (err) {
      return res.json({ success: true, body: {}, message: err.message });
    }
  },

  /**
   * @method register
   * @description "This method for register user"
   * @api "POST /register"
   *
   */
  register: async (req, res) => {
    try {
      const { email } = req.body;
      const { error } = validateRegister(req.body);
      if (error) return res.status(400).json({ success: false, message: errorMessage(error) });

      const checkUser = await commonService.findOneByFields(UserModel, { email: email });
      if (!_.isEmpty(checkUser)) return res.status(403).json({ success: true, body: {}, message: 'User already exists' });

      await commonService.save(UserModel, req.body);
      return res.status(201).json({ success: true, body: {}, message: 'Register successfully' });
    } catch (err) {
      return res.status(500).json({ success: false, message: err.message });
    }
  },
};
