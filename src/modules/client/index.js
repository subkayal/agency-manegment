
const router = require('express-promise-router')();
const passport = require("passport");


require('../../config/authentication/passport');

// common controller
const controller = require('./client.controller');

const requireAuth = passport.authenticate('jwt', { session: false });

router.post('/create', requireAuth, controller.add);
router.put('/update', requireAuth, controller.update);

module.exports = router;