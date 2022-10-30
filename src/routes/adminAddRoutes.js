const express = require("express");
const router = express.Router();
const adminAddController = require('../controllers/adminAddController');


router.get('/adminAdd', adminAddController.adminAdd);
router.post('/adminAdd', adminAddController.adminAdd);

module.exports = router;