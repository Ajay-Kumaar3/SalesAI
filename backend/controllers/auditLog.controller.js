const { AuditLog } = require('../models');

exports.findAll = async (req, res) => {
  try {
    const { table_name, action_type } = req.query;
    const filter = {};
    if (table_name) filter.table_name = table_name;
    if (action_type) filter.action_type = action_type;

    const logs = await AuditLog.findAll({
      where: filter,
      order: [['timestamp', 'DESC']]
    });
    res.json(logs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.findOne = async (req, res) => {
  try {
    const log = await AuditLog.findByPk(req.params.id);
    if (!log) return res.status(404).json({ message: 'Log not found' });
    res.json(log);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
