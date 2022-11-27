const Client = require('../models/client.model');

const clientService = {
  /**
   * @Method list
   * @Description Method for render reset password page
   *
   */
  list: async (req) => {
    try {
      const data = await Client.aggregate([
        { $match: { status: 'active', is_deleted: false } },
        {
          $lookup: {
            from: 'agencies',
            let: { agencyId: '$agencyId' },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $and: [
                      { $or: [{ $eq: ['$_id', '$$agencyId'] }] },
                      { $eq: ['$status', 'active'] },
                      { $eq: ['$is_deleted', false] },
                    ],
                  },
                },
              },
            ],
            as: 'agencydetails',
          },
        },
        { $unwind: { path: '$agencydetails', preserveNullAndEmptyArrays: false } },
        {
          $group: {
            _id: '$_id',
            agencyName: { $first: '$agencydetails.name' },
            clientName: { $first: '$name' },
            totalBill: { $first: '$totalBill' },
          },
        },
        {
          $project: {
            _id: 0,
          },
        },
        {
          $sort: { totalBill: -1 },
        },
      ]);
      if (!data) {
        return null;
      }
      return data;
    } catch (err) {
      return err;
    }
  },
};

module.exports = clientService;
