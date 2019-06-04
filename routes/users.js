var express = require('express');
var router = express.Router();
const users = require('../controllers/users');

router.post('/login', users.login);
router.post('/signup', users.signup);
router.get('/userlist/:user_id', users.userlist);
router.post('/logout', users.logout);

module.exports = router;
