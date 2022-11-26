
const router = require('express-promise-router')();

// common controller
const controller = require('./auth.controller');


router.post('/login', controller.login);
router.post('/register', controller.register);

module.exports = router;