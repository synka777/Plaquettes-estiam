const express = require('express')
const router = express.Router()
const userCtrl = require('../controlers/user')

router.post('/', userCtrl.createUser)
router.get('/:id', userCtrl.getOneUser)
router.get('/', userCtrl.getAllusers)
router.patch('/:id', userCtrl.updateUsers)
router.delete('/:id', userCtrl.deleteUser)



module.exports = router