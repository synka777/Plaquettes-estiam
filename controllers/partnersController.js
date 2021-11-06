const PartnerModel = require('../models/partner')
const utils = require('../kernel/utils');

/* Ce fichier sert à effectuer des opérations CRUD sur le modèle partner */


/* TODO: retourner des codes de retours ou objets avec objet et code de retour quand 200 */
module.exports.insertMultiplePartners = async function(newPartners){
    const response = [];
    const newData = [newPartners] || [
        {
            name:'Saint-Gobain',
            logo:'https://www.ch.weber/files/ch/styles/1920x1080/public/pictures/2018-07/Logo_SAINTGOBAIN_RVB.jpg?itok=vS-_4dT6'
        },
        {
            name:'CGI',
            logo:'https://upload.wikimedia.org/wikipedia/commons/thumb/3/32/CGI_logo.svg/1200px-CGI_logo.svg.png'
        }
    ];
    try {
        for(let partner of newData){
            const newPartner = utils.objectToPartner(partner, true)
            console.log('trying to add:', newPartner)
            let np = await newPartner.save()
            response.push(np)
        }
    } catch(err) {
        console.log(err)
    }
    return response
}

module.exports.readPartners = async function(objects){
    const response = [];
    
    console.log(typeof(objects))
    console.log(objects)
    if(objects===undefined||Object.entries(objects).length==0){
        try {
            await PartnerModel.find().exec().then(partners => {
                for(let partner of partners) response.push(partner)
            })
        } catch(err) {
            console.log(err)
        }
    }else{
        console.log('FELL IN THE WELL OF ELSENESS')
        for(let object of [objects]){
            try {
                console.log('data:yes, in for loop')
                const partnerToFind = utils.objectToPartner(object);
                console.log('try to find:', partnerToFind)
                await PartnerModel.find(partnerToFind).exec().then(partners => {
                    for(let partner of partners) response.push(partner)
                })
            } catch(err) {
                console.log(err)
            }
        }
    }
    console.log(response)
    return response
}

module.exports.updatePartner = async function(obj){
    const partner = (utils.objectToPartner([obj]))[0];
    if(!partner.id){ let error = 'please provide an ID' }
    const updatedPartner = await partner.findByIdAndUpdate()
    return updatedPartner
}

module.exports.deletePartners = async function(objects){
    const response = [];
    for(let object of objects){
        const newPartner = utils.objectToPartner(object);
        let chunk = await newPartner.remove()
        response.push(chunk)
    }
    return response
}


