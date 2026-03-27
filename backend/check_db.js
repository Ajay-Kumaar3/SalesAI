const { Customer, Product, Order } = require('./models');

async function checkDb() {
  try {
    const customers = await Customer.findAll();
    console.log('Customers found:', customers.length);
    if (customers.length > 0) {
      console.log('Sample Customer ID:', customers[0].CustomerID);
    } else {
      console.log('No customers found in database.');
    }
  } catch (err) {
    console.error('Database check error:', err);
  } finally {
    process.exit();
  }
}

checkDb();
