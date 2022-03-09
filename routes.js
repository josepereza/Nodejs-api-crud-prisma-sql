const express = require('express')
const { createUser, allUsers, findUser, updateUser, deleteUser } = require('./controller/userController.js')
const router = express.Router()

router.get('/users', allUsers)
router.get('/user/:id', findUser)
router.post('/user', createUser)
router.put('/user/:id', updateUser)
router.delete('/user/:id', deleteUser)

module.exports = router 