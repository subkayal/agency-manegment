/**
 * Created on 19-07-2022
 * Copyright (c) 2022 - Applaunch
 * @project Promo
 * @methodfor App End
 * @description This is the Service layer for interact with MongoDB
 */

 const commonService = {
    /**
     * @Method save
     * @Description Method for render reset password page
     *
     */
    save: async (model, data) => {
      try {
        const save = await model.create(data);
        if (!save) {
          return null;
        }
        return save;
      } catch (err) {
        return err;
      }
    },
  
    /**
     * @Method updateById
     * @Description Method for render reset password page
     *
     */
    updateById: async (model, id, data) => {
      try {
        const update = await model.findByIdAndUpdate(id, data, { new: true });
        if (!update) {
          return null;
        }
        return update;
      } catch (err) {
        return err;
      }
    },
  
    /**
     * @Method updateByFields
     * @Description Method for render reset password page
     *
     */
    updateByFields: async (model, query, data) => {
      try {
        const update = await model.findOneAndUpdate(query, data, { new: true });
        if (!update) {
          return null;
        }
        return update;
      } catch (err) {
        return err;
      }
    },
  
    /**
     * @Method findAllByFields
     * @Description Method for render reset password page
     *
     */
    findAllByFields: async (model, query) => {
      try {
        const getAll = await model.find(query).exec();
        if (!getAll) {
          return null;
        }
        return getAll;
      } catch (err) {
        return err;
      }
    },
  
    /**
     * @Method findAllByFieldsWithSelect
     * @Description Method for get all data with selected fields
     *
     */
    findAllByFieldsWithSelect: async (model, query, select) => {
      try {
        const getAll = await model.find(query).select(select).exec();
        if (!getAll) {
          return null;
        }
        return getAll;
      } catch (err) {
        return err;
      }
    },
  
    /**
     * @Method findAll
     * @Description Method for list all data
     *
     */
    list: async (model) => {
      try {
        const getAll = await model.find().lean();
        if (!getAll) {
          return null;
        }
        return getAll;
      } catch (err) {
        return err;
      }
    },
  
    /**
     * @Method findOneByFields
     * @Description Method for render reset password page
     *
     */
    findOneByFields: async (model, query) => {
      try {
        const find = await model.findOne(query).exec();
        if (!find) {
          return null;
        }
        return find;
      } catch (err) {
        return err;
      }
    },
  
    /**
     * @Method findOneById
     * @Description Method for render reset password page
     *
     */
    findOneById: async (model, id) => {
      try {
        const find = await model.findById(id).exec();
        if (!find) {
          return null;
        }
        return find;
      } catch (err) {
        return err;
      }
    },
  
    /**
     * @Method delete
     * @Description Method for render reset password page
     *
     */
    delete: async (model, id) => {
      try {
        const dataDelete = await model.remove({ _id: id }).exec();
        if (!dataDelete) {
          return null;
        }
        return dataDelete;
      } catch (err) {
        return err;
      }
    },
  
    /**
     * @Method count
     * @Description Method for render reset password page
     *
     */
    count: async (model, query) => {
      try {
        const count = await model.countDocuments(query);
        if (!count) {
          return null;
        }
        return count;
      } catch (err) {
        return err;
      }
    },
  };
  
  module.exports = commonService;
  