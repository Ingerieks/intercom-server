const Pool = require('pg').Pool
let connString = process.env.DATABASE_URL;
const pool = new Pool({
    connectionString : connString
})

const getTracks = async () => {
    return (await pool.query('SELECT * FROM tracks ORDER BY id ASC')).rows;
}

const createTrack = async (track) => {
    const { uploadDate, fileName } = track
    
    return await pool.query('INSERT INTO tracks ("upload_date", "file_name") VALUES ($1, $2)', [uploadDate, fileName]);
}

//USER

const getUsers = async () => {
    return (await pool.query('SELECT * FROM users ORDER BY id ASC')).rows;
}

const createUser = async (user) => {
    const { createdAt, updatedAt, emailAddress } = user
    
    return await pool.query('INSERT INTO users ("created_at", "updated_at", "email_address" ) VALUES ($1, $2, $3)', [createdAt, updatedAt, emailAddress]);
}

module.exports = {
    getTracks,
    createTrack,
    getUsers,
    createUser,
}


