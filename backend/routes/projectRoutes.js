const express = require('express');

const projectController = require('../controllers/projectController');
const isAuthorized = require('../middlewares/isAuthorized');

const router = express.Router();

router.use(isAuthorized);

router.get('/all', projectController.getAll);

router.post('/create', projectController.createOne);

router.patch('/update/:id', projectController.updateOne);

router.delete('/delete/:id', projectController.deleteOne);

module.exports = router;
