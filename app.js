const express = require("express")
const app = express()


const router = express.Router()

const usersModel = require("./models/users")
const usersController = require("./controllers/usersController")



/*usersController.getUsers().then((users) => {
    usersModel.insertMultipleUsers(users)
})*/

router.get('/', (req, res) => {
    res.write('Bienvenue sur dans l\'api Express Demo\n')
    res.write('Pour obtenir la liste des utilisateurs : rendez-vous sur /users ')
    res.send()
})


router.get('/users', (req, res) => {
    usersModel.findAll().then((users) => {
        res.send(users)
    })   
})



app.use('/', router)

module.exports = app