const { User, sequelize } = require('./models');
const crypto = require('crypto');

const hashPassword = (password) => {
  return crypto.createHash('sha256').update(password).digest('hex');
};

const seedAdmin = async () => {
  try {
    console.log('Syncing database...');
    await sequelize.sync();
    
    console.log('Seeding admin...');
    const hashedPassword = hashPassword('admin123');
    await User.findOrCreate({
      where: { Username: 'admin' },
      defaults: {
        Password: hashedPassword,
        Role: 'admin'
      }
    });
    console.log('Admin user seeded successfully (Username: admin, Password: admin123)');
    process.exit(0);
  } catch (err) {
    console.error('Failed to seed admin:', err);
    process.exit(1);
  }
};

seedAdmin();
