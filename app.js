const express = require("express")
const app = express()


const router = express.Router()
const partnersController = require("./controllers/partnersController")
const db = require('./kernel/db')

/* Ce fichier sert à appeler les contrôleurs de modèles et présenter la donnée en réponse 
aux requêtes entrantes */

router.get('/', (req, res) => {
    res.write('Root')
    res.write('/add-partners to insert partners in DB ')
    res.send()
})

router.get('/add-partners', (req, res) => {
    partnersController.insertMultiplePartners(req.body).then(resp => {
        res.write(JSON.stringify(resp))
        res.send()
    })
});

router.get('/get-partners', (req, res) => {
    console.log('Entered route /get-partners')
    partnersController.readPartners(req.body).then(resp => {
        res.write(String(resp))
        res.send()
    })
});

router.get('/update-partner', (req, res) => {
    partnersController.updatePartner(req).then(resp => {
        res.write(JSON.stringify(resp))
        res.send()
    })
});

router.get('/delete-partners', (req, res) => {
    partnersController.deletePartners(req).then(resp => {
        res.write(JSON.stringify(resp))
        res.send()
    })
});




app.use('/', router)
app.use('/add-partners', router)
app.use('/get-partners', router)
module.exports = app