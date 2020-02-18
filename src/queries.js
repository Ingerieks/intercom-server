const Pool = require('pg').Pool
let connString = process.env.DATABASE_URL;
const pool = new Pool({
    connectionString : connString
})

const getTracks = async () => {
    return await pool.query('SELECT * FROM tracks ORDER BY id ASC').rows;
}

const createTrack = async (track) => {
    const { uploadDate } = track

    return await pool.query('INSERT INTO tracks ("uploadDate") VALUES ($1)', [uploadDate]);
}


module.exports = {
    getTracks,
    createTrack,
}


