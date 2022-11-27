
const router = require('express-promise-router')();
const passport = require("passport");


require('../../config/authentication/passport');

// common controller
const controller = require('./agency.controller');

const requireAuth = passport.authenticate('jwt', { session: false });

router.post('/create', requireAuth, controller.add);
router.post('/create/with-client', requireAuth, controller.addWithClient);

module.exports = router;