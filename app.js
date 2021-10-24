const express = require("express")
const app = express()


const router = express.Router()
const partnersController = require("./controllers/partnersController")
const db = require('./kernel/db')



/*usersController.getUsers().then((users) => {
    usersModel.insertMultipleUsers(users)
})*/

router.get('/', (req, res) => {
    res.write('Bienvenue sur dans l\'api Express Demo\n')
    res.write('Pour obtenir la liste des utilisateurs : rendez-vous sur /users ')
    res.send()
})

router.get('/add-partners', (req, res) => {
    partnersController.insertMultiplePartners().then(resp => {
        console.log('after controller')
        console.log('resp:',resp)
    })
    res.write('e')
    res.send()
    
    }
    
    
);

/* router.get('/users', (req, res) => {
    usersModel.findAll().then((users) => {
        res.send(users)
    })   
}) */


app.use('/', router)
app.use('/add-partners', router)

module.exports = app