const express = require('express');

const taskController = require('../controllers/taskController');
const isAuthorized = require('../middlewares/isAuthorized');

const router = express.Router();

router.use(isAuthorized);

router.get('/all', taskController.getAll);

router.post('/create', taskController.createOne);

router.patch('/update/:id', taskController.updateOne);

router.delete('/delete/:id', taskController.deleteOne);

module.exports = router;
