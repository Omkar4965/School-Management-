const express = require('express');
const SchoolController = require('../controllers/schoolController');

const router = express.Router();

router.post('/addSchool', SchoolController.addSchool);
router.get('/listSchools', SchoolController.listSchools);

module.exports = router;