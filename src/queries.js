const Pool = require('pg').Pool
let connString = process.env.DATABASE_URL;
const pool = new Pool({
    connectionString : connString
})


const getNewTracks = async (userId) => {
    const query = '\
    SELECT t.upload_date, t.file_name FROM tracks t \
    LEFT OUTER JOIN (select track_id, id from listened where $1 = user_id) l on t.id = l.track_id \
    where l.id IS NULL \
    ORDER BY t.id ASC';
    return (await pool.query(query, [userId])).rows;
}

const createTrack = async (track) => {
    const { uploadDate, fileName } = track
    
    return await pool.query('INSERT INTO tracks ("upload_date", "file_name") VALUES ($1, $2)', [uploadDate, fileName]);
}

//USER

const getUsers = async (filters) => {
    const params = [];
    let whereClause = "WHERE TRUE";
    if ("emailAddress" in filters ) {
        params.push(filters.emailAddress);
        whereClause += " AND email_address = $1"
    }
    return (await pool.query(`SELECT * FROM users ${whereClause} ORDER BY email_address ASC`, params)).rows;
}

const createUser = async (user) => {
    const { createdAt, updatedAt, emailAddress } = user
    
    return await pool.query('INSERT INTO users ("created_at", "updated_at", "email_address" ) VALUES ($1, $2, $3)', [createdAt, updatedAt, emailAddress]);
}

const createListen = async (listen) => {
    const { userId, trackId, createdAt } = listen
    
    return await pool.query('INSERT INTO listened ("user_id", "track_id", "created_at" ) VALUES ($1, $2, $3)', [userId, trackId, createdAt]);
}

module.exports = {
    getNewTracks,
    createTrack,
    getUsers,
    createUser,
    createListen,
}






