const _ = require('lodash');

const ClientModel = require('../../models/client.model');
const commonService = require('../../service/common.service');
const clientService = require('../../service/client.service');

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

    try {
      const clientCheck = await commonService.findOneByFields(ClientModel, {
        name: body['name'],
        agencyId: body['agencyId'],
        is_deleted: false,
      });
      if (!_.isEmpty(clientCheck)) return res.status(403).json({ success: false, message: 'Client already exists' });
      await commonService.save(ClientModel, body);
      return res.status(201).json({ success: true, message: 'Client Successfully added' });
    } catch (err) {
      return res.status(500).json({ success: false, message: err.message });
    }
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

    try {
      const clientCheck = await commonService.findOneByFields(ClientModel, {
        _id: { $nin: body['clientId'] },
        name: body['name'],
        agencyId: body['agencyId'],
        is_deleted: false,
      });
      if (!_.isEmpty(clientCheck)) return res.status(403).json({ success: false, message: 'Client already exists' });
      await commonService.updateById(ClientModel, body['clientId'], body);
      return res.status(200).json({ success: true, message: 'Client Successfully Updated' });
    } catch (err) {
      return res.status(500).json({ success: false, message: err.message });
    }
  },

  /**
   * @method list
   * @description "This method for client list"
   * @api "PUT /list"
   *
   */
  list: async (req, res) => {
    try {
      const clientList = await clientService.list();
      if (_.isEmpty(clientList)) return res.status(200).json({ success: true, message: 'Records not found' });
      return res.status(200).json({ success: true, message: 'Records fetch successfully', data: clientList });
    } catch (err) {
      return res.status(500).json({ success: false, message: err.message });
    }
  },
};
