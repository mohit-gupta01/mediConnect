const { updateUser, deleteUser, getSingleUser, getAllUser } = require('../controllers/userController');
const express = require('express');
const { authenticate, restrict } = require('../auth/verifyToken');
const router = express.Router();

router.get('/:id', authenticate, restrict(['patient']), getSingleUser);
router.get('/', authenticate, restrict(['admin']), getAllUser);
router.put('/:id', authenticate, restrict(['patient']), updateUser);
router.delete('/:id', authenticate, restrict(['patient']), deleteUser);

module.exports = router;