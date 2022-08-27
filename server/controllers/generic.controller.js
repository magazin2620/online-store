const boom = require('@hapi/boom');

const genericCrud = (model) => ({
  async get({ params: { id } }, res) {
    try {
      const item = await model.findOne({ where: { id } });
      return res.status(200).send(item);
    } catch (err) {
      return res.status(400).send(boom.boomify(err));
    }
  },
  async getAll(req, res) {
    try {
      let { categoryId } = req.query;
      let items;
      if (categoryId) {
        items = await model.findAll({ where: { categoryId } });
      }
      if (!categoryId) {
        items = await model.findAll();
      }
      return res.status(200).send(items);
    } catch (err) {
      return res.status(400).send(boom.boomify(err));
    }
  },
  async create({ body }, res) {
    try {
      const newItem = await model.create(body);
      return res.status(200).send(newItem);
    } catch (err) {
      return res.status(400).send(boom.boomify(err));
    }
  },
  async update({ params: { id }, body }, res) {
    try {
      const item = await model.update(id, body);
      return res.status(200).send(item);
    } catch (err) {
      return res.status(400).send(boom.boomify(err));
    }
  },
  async delete({ params: { id } }, res) {
    try {
      await model.destroy(id);
      return res.status(200).send({ status: 'OK', message: 'Deleted' });
    } catch (err) {
      return res.status(400).send(boom.boomify(err));
    }
  },
});

module.exports = genericCrud;
