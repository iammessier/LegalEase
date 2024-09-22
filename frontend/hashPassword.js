const bcrypt = require('bcryptjs');

const plainPassword = 'password';
bcrypt.hash(plainPassword, 12, (err, hash) => {
  if (err) throw err;
  console.log('Hashed password:', hash);
});
