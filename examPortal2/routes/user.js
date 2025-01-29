const {Router} = require('express');
const router = Router();
const userController = require('../controller/user');

router.post('/createAdmin', userController.createAdmin);
router.post('/createTeacher', userController.createTeacher);
router.post('/createStudent', userController.createStudent);
router.get('/getUsers', userController.getUsers);

module.exports = router;