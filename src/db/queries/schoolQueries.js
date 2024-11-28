const CREATE_SCHOOL = `
  INSERT INTO schools (name, address, latitude, longitude)
  VALUES ($1, $2, $3, $4)
  RETURNING id
`;

const GET_ALL_SCHOOLS = `
  SELECT * FROM schools
`;

module.exports = {
  CREATE_SCHOOL,
  GET_ALL_SCHOOLS
};