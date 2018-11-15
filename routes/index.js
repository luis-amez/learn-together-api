var express = require('express');
var router = express.Router();

/* GET default resource */
router.get('/', function(req, res, next) {
  res.status(200).json({resource: 'Soon we will send something nice!'});
});

module.exports = router;
