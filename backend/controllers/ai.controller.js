const { AuditLog } = require('../models');
const { generateBusinessInsights } = require('../services/gemini.service');

exports.getInsights = async (req, res) => {
  try {
    const logs = await AuditLog.findAll({
      limit: 20,
      order: [['timestamp', 'DESC']]
    });

    if (logs.length === 0) {
      return res.status(200).json({ insights: "No audit logs found to analyze." });
    }

    const insights = await generateBusinessInsights(logs);
    res.json({ insights });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
