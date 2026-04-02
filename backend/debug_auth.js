const { User, sequelize } = require('./models');

const debug = async () => {
  try {
    console.log('--- Database Debug ---');
    console.log('Testing connection...');
    await sequelize.authenticate();
    console.log('Connection successful.');

    console.log('Syncing models...');
    await sequelize.sync();
    console.log('Sync successful.');

    console.log('Checking Users table...');
    const count = await User.count();
    console.log(`Users count: ${count}`);

    const allUsers = await User.findAll({ attributes: ['Username', 'Role'] });
    console.log('Current users:', allUsers.map(u => u.toJSON()));

    process.exit(0);
  } catch (err) {
    console.error('--- DEBUG ERROR ---');
    console.error('Message:', err.message);
    if (err.parent) console.error('Parent Error:', err.parent.message);
    if (err.original) console.error('Original Error:', err.original.message);
    process.exit(1);
  }
};

debug();
