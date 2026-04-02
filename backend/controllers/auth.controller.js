const { User } = require('../models');
const crypto = require('crypto');

const hashPassword = (password) => {
  return crypto.createHash('sha256').update(password).digest('hex');
};

exports.register = async (req, res) => {
  try {
    const { Username, Password, Role } = req.body;
    
    const existingUser = await User.findOne({ where: { Username } });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already taken' });
    }

    const hashedPassword = hashPassword(Password);
    const user = await User.create({
      Username,
      Password: hashedPassword,
      Role: Role || 'user'
    });

    res.status(201).json({ 
      message: 'User registered successfully',
      user: { Username: user.Username, Role: user.Role }
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { Username, Password } = req.body;
    const user = await User.findOne({ where: { Username } });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const hashedInput = hashPassword(Password);
    if (hashedInput !== user.Password) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    res.json({
      message: 'Login successful',
      user: { Username: user.Username, Role: user.Role }
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
