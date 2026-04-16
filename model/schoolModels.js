const db = require("../config/db");

// ➕ Add School
const addSchool = (data, callback) => {
    const sql = `
        INSERT INTO school (id,name, address, latitude, longitude)
        VALUES (?,?, ?, ?, ?)
    `;

    db.query(
        sql,
        [data.id, data.name, data.address, data.latitude, data.longitude],
        (err, result) => {
            if (err) {
                console.log("DB Error (addSchool):", err);
                return callback(err, null);
            }
            callback(null, result);
        }
    );
};

// 📥 Get All Schools
const getAllSchools = (callback) => {
    const sql = "SELECT * FROM school";

    db.query(sql, (err, results) => {
        if (err) {
            console.log("DB Error (getAllSchools):", err);
            return callback(err, null);
        }
        callback(null, results);
    });
};

module.exports = {
    addSchool,
    getAllSchools
};