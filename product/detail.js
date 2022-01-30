const express = require('express');
const router = express.Router();

router.get('/one', (req, res) => {
  res.send('detail one');
})

module.exports = router;