const utils = require('../kernel/utils');
const mongoose = require('mongoose');
/* require("../models/titleAndImage") */
const titleAndImageSchema = require("../models/titleAndImage")
const PartnerModel = require("../models/titleAndImage")
const TechnologyModel = require("../models/titleAndImage")
const CertificationModel = require("../models/titleAndImage")

/* Ce fichier sert à effectuer des opérations CRUD sur le modèle document */
/* TODO: Vérifier si les codes de retour sont corrects */


/* CREATE, USAGE:
    Syntaxe body avec entrées multiples à ajouter en une seule requête:
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
module.exports.insertMultipleDocuments = async function(body, modelName){
    if(Object.keys(body).length==0) return {
        "status": "400 Bad request",
        "message": "Body required"
    };
    const data = [];
    // Ajout(s) avec body.entries 
    if(body.entries){
        for(let document of body.entries){
            try {
                const model = mongoose.model(modelName, titleAndImageSchema)
                const newDocument = new model(document)
                
                // Si un partenaire existe déjà avec ce nom, erreur
                if(await model.findOne(document).exec()) throw TypeError
                if(newDocument.name==null||newDocument.name==''){
                    data.push({
                        "status": "400 Bad request",
                        "message": "Empty property"
                    })
                }else{
                    const response = await newDocument.save()
                    data.push({
                        "status": "201 Created",
                        "data": response
                    })
                }
            } catch(err) {
                if(err.name=='TypeError'){
                    data.push({
                        "status": "409 Conflict",
                        "message": "A document may already exist by that name"
                    })
                }else{
                    console.log(err);
                    data.push({
                        "status": "500 Internal server error",
                        "error": err.name
                    })
                }
            }
        }
        return data
    }
    if(!(Object.getOwnPropertyNames(body)).includes('name'||'logo')) {
        return {
            "status": "400 Bad request",
            "message": "Unknown property"
        }
    }
    //Ajout simple
    try{
        const model = mongoose.model(modelName, titleAndImageSchema)
        const newDocument = new model(body)
        
        // Si un partenaire existe déjà avec ce nom, erreur
        if(await model.findOne(body).exec()) throw TypeError
        const result = await newDocument.save()
        return {
            "status": "200 OK",
            "data": result
        };
    }catch(err){
        if(err.name=='zubzub'){ // THIS ERROR MANAGEMENT IS FUCKING AWFUL
            data.push({
                "status": "409 Conflict",
                "message": "A document may already exist by that name"
            })
        }else{
            console.log(err);
            data.push({
                "status": "500 Internal server error",
                "error": err.name
            })
        }
        return data
    }
}

/* READ, USAGE:
    - Pas de body: Renvoie les liste de partenaires au complet sans condition d'affichage
    - Body avec plusieurs partenaires dans la même requête:
    {
        "filters": [
            {
                "name": "Lego"
            },
            {
                "name": "CGI"
            }
        ]
    }
    - Body avec requête un seul partenaire dans une seule requête:
    {"name": "CGI"}

    PROTIP1: La recherche partielle est possible, exemple avec une recherche simple:
    { "name": { "$regex": "a" } }

    PROTIP2: La recherche SIMPLE (sans la propriété 'filters') peut être limitée pour ne pas faire 
    de requêtes trop lourdes sur un type de document avec l'utilisation des propriétés "skip" et "limit".
    Exemple avec une page devant contenir les 10 premiers résultats:
    {"name": "CGI","skip": "0","limit": 10}
    Exemple 2, deuxième page des 10 résultats suivants:
    {"name": "CGI","skip": 10,"limit": 10}
*/
module.exports.readDocuments = async function(body, modelName){
    const documentModel = mongoose.model(modelName)
    const data = [];
    const skip = body.skip?Number(body.skip):0;
    const limit = body.limit?Number(body.limit):0;
    if(body.filters){
        // Recherche avec body et requêtes multiples
        for(let filter of body.filters){
            console.log('filter:', filter)
            try {
                const documentToFind = utils.objectToTitleAndImage(filter);
                await documentModel.find(documentToFind).exec().then(results => {
                    for(let result of results){
                        data.push(result);
                    }
                })
            } catch(err) {
                console.log(err);
                return {
                    "status": "500 Internal server error",
                    "error": err.name
                }
            }
        }
    }
    // On check si des propriétés incorrectes ont été fournies
    if(Object.keys(body).length!=0){
        if(!(Object.hasOwnProperty('name'||'logo'||'skip'||'limit'))) {
            return {
                "status": "400 Bad request",
                "message": "Unknown property"
            };
        }
    }
    // Requête unique ou sans body
    const filter = body ? body : undefined
    try {
        await documentModel.find(filter).skip(skip).limit(limit).exec().then(documents => {
            for(let document of documents) data.push(document);
        })
        if(data!=''){
            return {
                "status": "200 OK",
                "data": data
            }
        }else{
            return {
                "status": "404 Not found",
                "message": "Resource not found"
            }
        }
    } catch(err) {
        console.log(err);
        if(err.name=='TypeError'){
            return {
                "status": "500 Internal server error",
                "message": "The given document was most likely not found"
            }
        }
        return {
            "status": "500 Internal server error",
            "error": err.name
        }
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
module.exports.updateDocument = async function(body, modelName){
    const documentModel = mongoose.model(modelName)
    let response = {};
    if(Object.keys(body).length == 0) {
        return {
            "status": "400 Bad request",
            "message": "Body required"
        }
    }
    if(body.filter && body.replace && !(body.filter=='' || body.replace=='')){
        try {
            await documentModel.find(body.filter).exec().then(document => {
                if(!document[0]._id) throw TypeError
                response = documentModel.findByIdAndUpdate(document[0]._id, body.replace).then(response => {
                    response.name = body.replace
                    console.log('edited', response)
                    return {
                        "status": "200 OK",
                        "data": response
                    }
                })  
            })
            return response
        } catch(err) {
            console.log(err);
            if(err.name=='TypeError'){
                return {
                    "status": "404 Not found",
                    "message": "Resource not found"
                }
            }
            return {
                "status": "500 Internal server error",
                "error": err.name
            }
        }  
    }
    return {
        "status": "400 Bad request",
        "message": "Body required"
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
    {"name": "Saint-Gobain"}
*/
module.exports.deleteDocuments = async function(body, modelName){
    console.log(body)
    if(Object.keys(body).length == 0) return {
        "status": "400 Bad request",
        "message": "Body required"
    };
    const response = [];
    if(body.filters){
        for(let filter of body.filters){
            try {
                response.push(!(await searchAndDestroy(filter, modelName)) ? '200 OK' : undefined)
            } catch(err) { 
                response.push({
                    "status": "404 Not found",
                    "message": "Resource not found"
                }) 
            }
        }
        return response
    }
    const filter = body
    try {
        return !(await searchAndDestroy(filter, modelName)) ? '200 OK' :{
            "status": "404 not found",
            "message": "Resource not found"
        };
    } catch(err) {
        console.log(err);
        if(err.name=='TypeError'){
            return {
                "status": "500 Internal server error",
                "error": err.name,
                "message": "The given document was most likely not found"
            }
        }
        return {
            "status": "500 Internal server error",
            "error": err.name
        }
    }   
}

async function searchAndDestroy(filter, modelName) {
    const documentModel = mongoose.model(modelName)
    await documentModel.find(filter).exec().then(document => {
        return documentModel.findByIdAndDelete(document[0]._id);
    });
}

