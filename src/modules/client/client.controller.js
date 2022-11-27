const _ = require('lodash');

const ClientModel = require('../../models/client.model');
const commonService = require('../../service/common.service');

const { validateClient, validateClientUpdate } = require('./client.validation');
const { errorMessage } = require('../../utils/helper');

module.exports = {
  /**
   * @method add
   * @description "This method for client add"
   * @api "POST /create"
   *
   */

  add: async (req, res) => {
    const { body } = req;
    const { error } = validateClient(body);
    if (error) return res.status(400).json({ success: false, message: `Client ${errorMessage(error)}` });

    const clientCheck = await commonService.findOneByFields(ClientModel, {
      name: body['name'],
      agencyId: body['agencyId'],
      is_deleted: false,
    });
    if (!_.isEmpty(clientCheck)) return res.status(403).json({ success: false, message: 'Client already exists' });
    await commonService.save(ClientModel, body);
    return res.status(201).json({ success: true, message: 'Client Successfully added' });
  },

  /**
   * @method update
   * @description "This method for client update"
   * @api "PUT /update"
   *
   */

  update: async (req, res) => {
    const { body } = req;
    const { error } = validateClientUpdate(body);
    if (error) return res.status(400).json({ success: false, message: `Client ${errorMessage(error)}` });

    const clientCheck = await commonService.findOneByFields(ClientModel, {
      _id: { $nin: body['clientId'] },
      name: body['name'],
      agencyId: body['agencyId'],
      is_deleted: false,
    });
    if (!_.isEmpty(clientCheck)) return res.status(403).json({ success: false, message: 'Client already exists' });
    await commonService.updateById(ClientModel, body['clientId'], body);
    return res.status(200).json({ success: true, message: 'Client Successfully Updated' });
  },
};
