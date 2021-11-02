require('dotenv').config()
const db = require('../kernel/db');
const PartnerModel = require('../models/partner')
const utils = require('../kernel/utils');

/* Ce fichier sert à effectuer des opérations CRUD sur le modèle partner */

module.exports.insertMultiplePartners = async function(newPartners){
    const response = [];
    const newData = [
        {
            name:'Saint-Gobain',
            logo:'https://www.ch.weber/files/ch/styles/1920x1080/public/pictures/2018-07/Logo_SAINTGOBAIN_RVB.jpg?itok=vS-_4dT6'
        },
        {
            name:'CGI',
            logo:'https://upload.wikimedia.org/wikipedia/commons/thumb/3/32/CGI_logo.svg/1200px-CGI_logo.svg.png'
        }
    ] || newPartners;
    db.connect()
    for(let object of newData){
        const newPartner = utils.objectToPartner(object);
        const np = await newPartner.save()/* .then((data) => done(null, console.log(data))) */
        response.push(np)
    }
    db.close()
    return response

}

module.exports.readPartners = async function(objects){
    const response = [];
    
    console.log(typeof(objects))
    console.log(objects)
    if(objects===undefined/* ||objects==[]||objects==''||!objects */){
        console.log('After IF undefined')
        db.connect().then(
        await PartnerModel.find().exec().then(partners => {
            for(let partner of partners) response.push(partner)
        })
        ).finally(db.close())
    }else{
        console.log('FELL IN THE WELL OF ELSENESS')
        for(let object of objects){
            const partnerToFind = utils.objectToPartner(object);
            db.connect().then(
                await PartnerModel.find(partnerToFind).exec().then(partners => {
                    for(let partner of partners) response.push(partner)
                })
            ).finally(db.close())
            
        }
    }
    db.close()
    console.log(response)
    return response
}

module.exports.updatePartner = async function(obj){
    db.connect()
    const partner = (utils.objectToPartner([obj]))[0];
    if(!partner.id){ let error = 'please provide an ID' }
    const updatedPartner = await partner.findByIdAndUpdate()
    db.close()
    return updatedPartner
}

module.exports.deletePartners = async function(objects){
    const response = [];
    db.connect()
    for(let object of objects){
        const newPartner = utils.objectToPartner(object);
        let chunk = await newPartner.remove()
        response.push(chunk)
    }
    db.close()
    return response
}


