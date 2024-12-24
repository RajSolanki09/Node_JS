const { Router } = require('express');
const { saveImage, getImg } = require('../controller/saveImg');
const { isLoggedIn } = require('../middleware/isLogin');

const imgRouter = Router();
imgRouter.post('/images', saveImage);;
imgRouter.get('/allimg', getImg);
module.exports = imgRouter;
