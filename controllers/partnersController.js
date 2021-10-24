require('dotenv').config()
const db = require('../kernel/db');
const { deleteOne } = require('../models/partner');
const PartnerModel = require("../models/partner")


/* Ce fichier sert à effectuer des opérations CRUD sur le modèle partner */

module.exports.insertMultiplePartners = async function(){
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
    ];
    db.connect()
    for(let partner of newData){
        const newPartner = new PartnerModel();
        newPartner.name = partner.name;
        newPartner.logo = partner.logo;
        let np = await newPartner.save()/* .then((data) => done(null, console.log(data))) */
        response.push(np)
    }
    db.close()
    console.log("response array:", response)
    return response

}

