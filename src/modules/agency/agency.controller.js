const _ = require('lodash');

const AgencyModel = require('../../models/agency.model');
const commonService = require('../../service/common.service');


module.exports = {
  /**
   * @method add
   * @description "This method for agency add"
   * @api "POST /add"
   *
   */

  add: async (req, res) => {
    console.log(req.user);
  },
};
