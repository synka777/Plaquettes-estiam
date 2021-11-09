const PartnerModel = require('../models/partner')
const utils = require('../kernel/utils');
const mongoose = require('mongoose');
const { ObjectId } = require('bson');

/* Ce fichier sert à effectuer des opérations CRUD sur le modèle partner */
/* TODO: Vérifier si les codes de retour sont corrects */


/* CREATE, USAGE:
    Syntax body avec entrées multiples à ajouter en une seule requête:
    {
        "entries": [
            {
                "name": "Saint-Gobain",
                "logo": "https: //www.ch.weber/files/ch/styles/1920x1080/public/pictures/2018-07/Logo_SAINTGOBAIN_RVB.jpg?itok=vS-_4dT6"
            },
            {
                "name": "CGI",
                "logo": "https: //upload.wikimedia.org/wikipedia/commons/thumb/3/32/CGI_logo.svg/1200px-CGI_logo.svg.png"
            }
        ]
    } 
    Syntaxe simple pour n'ajouter qu'un partenaire à la fois:
    {
        "name": "CGI",
        "logo": "https: //upload.wikimedia.org/wikipedia/commons/thumb/3/32/CGI_logo.svg/1200px-CGI_logo.svg.png"
    }
*/
module.exports.insertMultiplePartners = async function(body){
    console.log()
    if(!body) return '400 Bad request: Body required';
    const response = [];
    
    // Ajout(s) avec body.entries 
    if(body.entries){
        try {
            for(let partner of body.entries){
                const newPartner = utils.objectToPartner(partner, true)
                response.push('201 Created:', (await newPartner.save()))
            }
            return response
        } catch(err) {
            console.log(err)
            return '500 Internal Server Error'
        }
    }
    //Ajout simple
    if(!(Object.getOwnPropertyNames(body)).includes('name'||'logo')) {
        return '400 Bad request: Unkown property'
    }
    
    try{
        const newPartner = utils.objectToPartner(body, true)
        const result =  await newPartner.save()
        // check if 
        return '201 Created: ', result;
    }catch(err){
        console.log(err)
        return '500 Internal Server Error'
    }

}

/* READ, USAGE:
    - Pas de body: Renvoie les liste de partenaires au complet sans condition d'affichage
    - Body avec plusieurs partenaires dans la même requête:


*/
module.exports.readPartners = async function(body){
    const response = [];
    if(body.filters){
        // Recherche avec body et requêtes multiples
        for(let filter of body.filters){
            try {
                const partnerToFind = utils.objectToPartner(filter);
                await PartnerModel.find(partnerToFind).exec().then(results => {
                    for(let result of results) response.push(result);
                })
            } catch(err) {
                console.log(err)
                return '500 Internal Server Error'
            }
        }
        return response
    }
    if(Object.keys(body).length!=0){
        if(!(Object.getOwnPropertyNames(body)).includes('name'||'logo')) {
            return '400 Bad request: Unkown property'
        }
    }
    // Requête unique ou sans body
    const filter = body ? body : undefined
    try {
        await PartnerModel.find(filter).exec().then(partners => {
            for(let partner of partners) response.push(partner)
        })
        return response
    } catch(err) {
        console.log(err)
        return '500 Internal Server Error'
    }
}

/* UPDATE, USAGE:
    Une seule opération d'update possible par requête, syntaxe:
    {
        "filter": {
            "name": "CGI"
        },
        "replace": {
            "name": "CEGEHI"
        }
    }
*/
module.exports.updatePartner = async function(body){
    if(!body) return '400 Bad request: Body required';
    if(body.filter && body.replace){
        try {
            await PartnerModel.find(body.filter).exec().then(partner => {
            if(!partner[0]._id) return;
            return PartnerModel.findByIdAndUpdate(partner[0]._id, body.replace);
            })
        } catch(err) {
            console.log(err)
            return '500 Internal server error'
        }  
    }  
}

/* DELETE, USAGE:
    Syntaxe body avec plusieurs entrées à supprimer:
    {
        "filters": [
            {
                "name": "Saint-Gobain"
            },
            {
                "name": "CGI"
            }
        ]
    }
    Syntaxe simple pour suppression d'une seule entrée par requête:
    {
        "name": "Saint-Gobain"
    }
*/
module.exports.deletePartners = async function(body){
    if(!body) return '400 Bad request: Body required';
    const response = [];
    if(body.filters){
        for(let filter of body.filters){
            try {
                response.push(!(await searchAndDestroy(filter)) ? '200 OK' : '500 Internal Server Error');
            } catch(err) { response.push('500: Internal server error') }
        }
        return response
    }
    const filter = body
    try {
        return !(await searchAndDestroy(filter)) ? '200 OK' : '500 Internal server error';
    } catch(err) {
        console.log(err)
        return '500 Internal Server Error'
    }   
}

async function searchAndDestroy(filter) {
    const partner = utils.objectToPartner(filter);
    await PartnerModel.find(partner).exec().then(partner => {
        return PartnerModel.findByIdAndDelete(partner[0]._id);
    });
}

