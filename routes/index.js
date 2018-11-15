const express = require('express');
const router = express.Router();

/* GET default resource */
router.get('/', (req, res, next) => {
  res.status(200).json({resource: 'Soon we will send something nice!'});
});

module.exports = router;
