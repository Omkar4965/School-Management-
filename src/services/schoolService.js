const School = require('../models/school');
const { schoolSchema, locationSchema } = require('../validators/schoolValidator');

class SchoolService {
  static async validateSchoolData(data) {
    const { error, value } = schoolSchema.validate(data);
    if (error) throw error;
    return value;
  }

  static async validateLocationData(data) {
    const { error, value } = locationSchema.validate(data);
    if (error) throw error;
    return value;
  }

  static async addSchool(schoolData) {
    const validatedData = await this.validateSchoolData(schoolData);
    return await School.create(validatedData);
  }

  static async listSchools(latitude, longitude) {
    const validatedLocation = await this.validateLocationData({ latitude, longitude });
    const schools = await School.findAll();
    return School.getSortedByDistance(
      schools,
      validatedLocation.latitude,
      validatedLocation.longitude
    );
  }
}

module.exports = SchoolService;