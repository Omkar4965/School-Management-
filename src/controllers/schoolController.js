const SchoolService = require('../services/schoolService');
const ErrorHandler = require('../utils/errorHandler');

class SchoolController {
  static async addSchool(req, res) {
    try {
      const schoolId = await SchoolService.addSchool(req.body);
      res.status(201).json({ 
        message: 'School added successfully',
        schoolId 
      });
    } catch (error) {
      if (error.isJoi) {
        return ErrorHandler.handleValidationError(res, error);
      }
      ErrorHandler.handleServerError(res, error);
    }
  }

  static async listSchools(req, res) {
    try {
      const { latitude, longitude } = req.query;
      const schools = await SchoolService.listSchools(latitude, longitude);
      res.json(schools);
    } catch (error) {
      if (error.isJoi) {
        return ErrorHandler.handleValidationError(res, error);
      }
      ErrorHandler.handleServerError(res, error);
    }
  }
}

module.exports = SchoolController;