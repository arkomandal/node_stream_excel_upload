const Router = require('express').Router;
const router = Router();
const controller = require('./main.controller');

router.post('/processExcel', controller.processExcel);
router.get('/sayhello', (req, res) => res.send("hello world"));

module.exports = router;