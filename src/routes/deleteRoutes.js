const express = require("express");
const router = express.Router();
const deleteController = require('../controllers/deleteController');

router.get('/delete', deleteController.Delete);


module.exports = router;