const userRepo = require('./user.repository');

const getUsers = async() => {
    return userRepo.findAll();
}

module.exports = { getUsers }