const _ = require('lodash');

const AgencyModel = require('../../models/agency.model');
const commonService = require('../../service/common.service');

const { validateClient } = require('./client.validation');
const { errorMessage } = require('../../utils/helper');

module.exports = {

  /**
   * @method add
   * @description "This method for client add"
   * @api "POST /create/with-client"
   *
   */

  add: async (req, res) => {
    const { body } = req;
    let clientObj = {
      name: body['name'],
      email: body['email'],
      phone: parseInt(body['phone']),
      totalBill: parseInt(body['totalBill']),
    };
    const errorClient = validateClient(clientObj);
    console.log(errorClient);
    if (errorClient) return res.status(400).json({ success: false, message: `Client ${errorMessage(errorClient.error)}` });
  },
};
