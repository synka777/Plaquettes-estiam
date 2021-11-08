const PartnerModel = require('../models/partner')
const utils = require('../kernel/utils');
const mongoose = require('mongoose');

/* Ce fichier sert à effectuer des opérations CRUD sur le modèle partner */


/* TODO: retourner des codes de retours ou objets avec objet et code de retour quand 200 */
module.exports.insertMultiplePartners = async function(newPartners){
    const response = [];
    console.log(newPartners)
    /* const newPartners = {
        "queries":[
            {
                "name":'Saint-Gobain',
                "logo":'https://www.ch.weber/files/ch/styles/1920x1080/public/pictures/2018-07/Logo_SAINTGOBAIN_RVB.jpg?itok=vS-_4dT6'
            },
            {
                "name":'CGI',
                "logo":'https://upload.wikimedia.org/wikipedia/commons/thumb/3/32/CGI_logo.svg/1200px-CGI_logo.svg.png'
            }
        ]
    }; */
    // Ajout(s) avec body.queries 
    if(newPartners.queries){
        try {
            for(let partner of newPartners.queries){
                const newPartner = utils.objectToPartner(partner, true)
                console.log('trying to add:', newPartner)
                let np = await newPartner.save()
                response.push(np)
            }
            return response
        } catch(err) {
            console.log(err)
        }
    }
    //Ajout simple
    try{
        const newPartner = utils.objectToPartner(newPartners, true)
        let np = await newPartner.save()
        return np
    }catch(err){
        console.log(err)
    }

}

module.exports.readPartners = async function(searchQueries){
    const response = [];
    if(searchQueries.filters){
        // Recherche avec body et requêtes multiples
        for(let filter of searchQueries.filters){
            try {
                const partnerToFind = utils.objectToPartner(filter);
                await PartnerModel.find(partnerToFind).exec().then(results => {
                    for(let result of results) response.push(result)
                })
            } catch(err) {
                console.log(err)
            }
        }
        return response
    }
    // Requête unique ou sans body
    const filter = searchQueries?searchQueries:undefined
    try {
        await PartnerModel.find(filter).exec().then(partners => {
            for(let partner of partners) response.push(partner)
        })
        return response
    } catch(err) {
        console.log(err)
    }
}

module.exports.updatePartner = async function(query){
    if(query.filter && query.replace){
        try {
            await PartnerModel.find(query.search).exec().then(partner => {
            if(!partner[0]._id) return;
            return PartnerModel.findByIdAndUpdate(partner[0]._id, query.replace)
            })
        } catch(err) {
            console.log(err)
        }  
    }  
}

module.exports.deletePartners = async function(searchQueries){
    if(!searchQueries) return '500';
    const response = [];
    if(searchQueries.filters){
        for(let filter of searchQueries.filters){
            console.log('filter:',filter)
            try {
                response.push(!(await searchAndDestroy(filter)) ? '200' : '500');
            } catch(err) { response.push('500') }
        }
        return response
    }
    const filter = searchQueries
    console.log(filter)
    try {
        return !(await searchAndDestroy(filter)) ? '200' : '500';
    } catch(err) {
        console.log(err)
    }   
}


async function searchAndDestroy(filter) {
    const partner = utils.objectToPartner(filter);
    console.log('To delete:', partner);
    console.log(typeof (partner));
    await PartnerModel.find(partner).exec().then(partner => {
        console.log('found:',partner)
        return PartnerModel.findByIdAndDelete(partner[0]._id);
    });
}

