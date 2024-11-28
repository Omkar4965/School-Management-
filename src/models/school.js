const pool = require('../db/config');
const { calculateDistance } = require('../utils/distanceCalculator');
const queries = require('../db/queries/schoolQueries');

class School {
  static async create({ name, address, latitude, longitude }) {
    const client = await pool.connect();
    try {
      const result = await client.query(queries.CREATE_SCHOOL, [
        name,
        address,
        latitude,
        longitude
      ]);
      return result.rows[0].id;
    } finally {
      client.release();
    }
  }

  static async findAll() {
    const client = await pool.connect();
    try {
      const result = await client.query(queries.GET_ALL_SCHOOLS);
      return result.rows;
    } finally {
      client.release();
    }
  }

  static getSortedByDistance(schools, userLat, userLon) {
    return schools.map(school => ({
      ...school,
      distance: calculateDistance(
        parseFloat(userLat),
        parseFloat(userLon),
        school.latitude,
        school.longitude
      )
    })).sort((a, b) => a.distance - b.distance);
  }
}

module.exports = School;