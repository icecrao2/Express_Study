const express = require('express');
const router = express.Router();
const detail = require('./detail');

router.get('/one', (req, res) => {
  res.send("one");
});


router.get('/two', (req, res) => {
  res.send("two");
});

router.use('/detail', detail);

module.exports = router;