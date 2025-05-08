const express = require('express')
const router = express.Router()

router.use('/admin/hosters', require('./admin/hosters'))

module.exports = router
