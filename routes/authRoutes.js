const {Router} = require('express');
const authController = require('../controllers/authController');

const router = Router();

router.get('/signup', authController.signup_get);
router.post('/signup_post', authController.signup_post);
router.get('/login', authController.login_get);
router.post('/login_post', authController.login_post);

module.exports = router;