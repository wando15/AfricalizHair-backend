const express = require('express');
const router = express.Router();

router.use('/')
    .post(() => { })
    .get(() => { });

router.use('/{id}')
    .get(() => { })
    .put(() => { });

module.exports = router;