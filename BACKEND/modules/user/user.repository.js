const db = require('../../config/db');


const findAll = async() =>{
        const query = 'SELECT * FROM users';
        const { rows } = await db.query(query);
        return rows;
}

module.exports = findAll



// class UserRepository {
//     async createUser(username, email, password) {
//         const query = 'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *';
//         const values = [username, email, password];
//         const { rows } = await db.query(query, values);
//         return rows[0];
//     }

//     async findUserByEmail(email) {
//         const query = 'SELECT * FROM users WHERE email = $1';
//         const values = [email];
//         const { rows } = await db.query(query, values);
//         return rows[0];
//     }
// }

// module.exports = new UserRepository();