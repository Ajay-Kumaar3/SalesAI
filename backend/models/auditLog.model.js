const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');

const AuditLog = sequelize.define('AuditLog', {
  AuditID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  action_type: {
    type: DataTypes.ENUM('INSERT', 'UPDATE', 'DELETE'),
    allow_null: false,
  },
  table_name: {
    type: DataTypes.STRING(50),
    allow_null: false,
  },
  record_id: {
    type: DataTypes.INTEGER,
    allow_null: false,
  },
  timestamp: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  old_value: {
    type: DataTypes.JSON,
  },
  new_value: {
    type: DataTypes.JSON,
  },
}, {
  tableName: 'Audit_Log',
  timestamps: false,
});

module.exports = AuditLog;
