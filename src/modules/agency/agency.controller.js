const _ = require('lodash');

const AgencyModel = require('../../models/agency.model');
const ClientModel = require('../../models/client.model');
const commonService = require('../../service/common.service');

const { validateAgency, validateClient } = require('./agency.validation');
const { errorMessage } = require('../../utils/helper');

module.exports = {
  /**
   * @method add
   * @description "This method for agency add"
   * @api "POST /add"
   *
   */

  add: async (req, res) => {
    const { body } = req;
    console.log(body);
  },

  /**
   * @method addWithClient
   * @description "This method for agency add with single client"
   * @api "POST /create/with-client"
   *
   */

  addWithClient: async (req, res) => {
    const { body } = req;
    const agencyObj = {
      name: body['name'],
      address1: body['address1'],
      address2: !_.has(body, 'address2') || body['address2'] !== '' ? '' : body['address2'],
      state: body['state'],
      city: body['city'],
      phone: parseInt(body['phone']),
    };
    let clientObj = {
      name: body['clientName'],
      email: body['clientemail'],
      phone: parseInt(body['clientphone']),
      totalBill: parseInt(body['totalBill']),
    };

    const { error } = validateAgency(agencyObj);
    if (error) return res.status(400).json({ success: false, message: `Agency ${errorMessage(error)}` });

    const clientValidate = clientValidation(clientObj);
    if (!clientValidate.success) return res.status(400).json({ success: false, message: clientValidate.message });
    try {
      const agencyCheck = await commonService.findOneByFields(AgencyModel, { name: agencyObj['name'], is_deleted: false });
      if (!_.isEmpty(agencyCheck)) return res.status(403).json({ success: false, message: 'Agency already exists' });
      const agencySave = await commonService.save(AgencyModel, agencyObj);
      if (agencySave) {
        clientObj['agencyId'] = agencySave._id;
        await commonService.save(ClientModel, clientObj);
        return res.status(201).json({ success: true, message: 'Agency Successfully added' });
      }
    } catch (err) {
      return res.status(500).json({ success: false, message: err.message });
    }
  },
};

function clientValidation(data) {
  const { error } = validateClient(data);
  if (error) return { success: false, message: `Client ${errorMessage(error)}` };
  return { success: true };
}
