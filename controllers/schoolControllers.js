const db = require("../config/db");
const calculateDistance = require("../utils/distance");

// ➕ Add School
exports.addSchool = (req, res) => {
    const {id, name, address, latitude, longitude } = req.body;

    if ( !id||!name || !address || latitude == null || longitude == null) {
        return res.status(400).json({ error: "All fields required" });
    }

    const sql = "INSERT INTO school (id, name, address, latitude, longitude) VALUES (?, ?, ?, ?, ?)";

    db.query(sql, [id, name, address, latitude, longitude], (err, result) => {
        if (err) return res.status(500).json(err);

        res.json({ message: "School added", id: result.insertId });
    });
};

// 📍 List Schools (sorted by distance)
exports.listSchools = (req, res) => {
    const userLat = parseFloat(req.query.lat);
    const userLon = parseFloat(req.query.lon);

    if (isNaN(userLat) || isNaN(userLon)) {
        return res.status(400).json({ error: "Invalid coordinates" });
    }

    db.query("SELECT * FROM school", (err, results) => {
        if (err) return res.status(500).json(err);

        const sorted = results.map(s => {
            const distance = calculateDistance(userLat, userLon, s.latitude, s.longitude);
            return { ...s, distance };
        }).sort((a, b) => a.distance - b.distance);

        res.json(sorted);
    });
};