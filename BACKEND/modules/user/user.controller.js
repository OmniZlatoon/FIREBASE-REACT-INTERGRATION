const userService = require('../user/user.services');

exports.getUsers = async (req, res) => {
  const users = await userService.getUsers();
  res.status(200).json(users);
};

