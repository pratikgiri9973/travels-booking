
const express = require('express')
const { createUser, updateUser, deleteUser, getSingleUser, getAllUser, destroyUser } = require('../controllers/userController')
const { verifyUser, verifyAdmin } = require('../utils/VerifyToken')

const router = express.Router()

router

  .get('/', verifyAdmin, getAllUser)
  .get('/single-tour/:id', verifyUser, getSingleUser)
  .put('/:id', verifyUser, updateUser)
  .delete('/destroy', destroyUser)
  .delete('/:id', verifyUser, deleteUser)


module.exports = router