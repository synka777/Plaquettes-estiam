const userSchema = require('../models/userModel')
const mongoose = require('mongoose');
const utils = require('../kernel/utils');
const { model } = require('mongoose');

/* Ce fichier sert à effectuer des opérations CRUD sur le modèle user */


/* CREATE, USAGE:
    Syntaxe body avec entrées multiples à ajouter en une seule requête:
    {
        "users": [
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
    Syntaxe simple pour n'ajouter qu'un utilisateur à la fois:
    {
        "name": "CGI",
        "logo": "https: //upload.wikimedia.org/wikipedia/commons/thumb/3/32/CGI_logo.svg/1200px-CGI_logo.svg.png"
    }
*/
module.exports.createUsers = async function(body){
    if(Object.keys(body).length==0) return {
        "status": "400 Bad request",
        "message": "Body required"
    };
    const data = [];
    // Ajout(s) avec body.users 
    if(body.users){
        for(let user of body.users){
            try {
                // Si un utilisateur existe déjà avec ce nom, erreur
                const model = mongoose.model('User', userSchema)
                const newUser = new model(user)

                if(await model.findOne(user).exec()) throw TypeError
                if(newUser.username==null||newUser.username==''||newUser.password==null||newUser.password==''){
                    data.push({
                        "status": "400 Bad request",
                        "message": "Empty property"
                    })
                }
                const response = await newUser.save()
                data.push({
                    "status": "201 Created",
                    "data": response
                })
            } catch(err) {
                if(err.username=='TypeError'){
                    data.push({
                        "status": "409 Conflict",
                        "message": "A user may already exist by that name"
                    })
                }else{
                    console.log(err);
                    data.push({
                        "status": "500 Internal server error",
                        "error": err.username
                    })
                }
            }
        }
        return data
    }
    if(!(Object.getOwnPropertyNames(body)).includes('username'&&'password')) {
        return {
            "status": "400 Bad request",
            "message": "Unknown property"
        }
    }
    //Ajout simple
    try{
        const model = mongoose.model('User', userSchema)
        const newUser = new model(body)

        // Si un utilisateur existe déjà avec ce nom, erreur
        if(await model.findOne(body).exec()) throw TypeError
        const result = await newUser.save()
        return {
            "status": "201 Created",
            "data": result
        };
    }catch(err){
        if(err.name=='TypeError'){
            data.push({
                "status": "409 Conflict",
                "message": "A user may already exist by that name"
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
    - Pas de body: Renvoie les liste de utilisateurs au complet sans condition d'affichage
    - Body avec plusieurs utilisateurs dans la même requête:
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
    - Body avec requête un seul utilisateur dans une seule requête:
    {
        "name": "CGI"
    }
*/
module.exports.readUsers = async function(body){
	const userModel = mongoose.model('User');
	const data = [];
	const skip = body.skip ? Number(body.skip) : 0;
	const limit = body.limit ? Number(body.limit) : 0;
    if(body.filters){
        // Recherche avec body et requêtes multiples
        for(let filter of body.filters){
            console.log('filter:', filter)
            try {
                await userModel.find(filter).exec().then(results => {
                    for(let result of results){
                        data.push(result);
                    }
                })
            } catch(err) {
                console.log(err);
                return {
                    "status": "500 Internal server error",
                    "error": err.username
                }
            }
        }
        return data
    }
    // On check si des propriétés incorrectes ont été fournies
    if(Object.keys(body).length!=0){
        if(!body.hasOwnProperty('username'||'skip'||'limit')) {
            return {
                "status": "400 Bad request",
                "message": "Unknown property"
            };
        }
    }
    // Requête unique ou sans body
    const filter = body ? body : undefined
    try {
        await userModel.find(filter).skip(skip).limit(limit).exec().then(users => {
            for(let user of users) data.push(user);
        })
        if(data!=''){
			return {
				"status": "200 OK",
				"data": data
			}
		}else{
			return {
				"status": "404 Not found",
				"message": "User not found"
			}
		}
    } catch(err) {
        console.log(err);
        if(err.name=='TypeError'){
            return {
                "status": "500 Internal server error",
                "message": "The given user was most likely not found"
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
module.exports.updateUser = async function(body){
    const userModel = mongoose.model('User')
    let response = {};
    if(Object.keys(body).length == 0) {
        return {
            "status": "400 Bad request",
            "message": "Body required"
        }
    }
    if(body.filter && body.replace && !(body.filter=='' || body.replace=='')){
        try {
            await userModel.find(body.filter).exec().then(user => {
                if(!user[0]._id) throw TypeError
                response = userModel.findByIdAndUpdate(user[0]._id, body.replace).then(response => {
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
    {
        "name": "Saint-Gobain"
    }
*/
module.exports.deleteUsers = async function(body){
    if(Object.keys(body).length == 0) return {
        "status": "400 Bad request",
        "message": "Body required"
    };
    const response = [];
    if(body.filters){
        for(let filter of body.filters){
            try {
                response.push(!(await searchAndDestroy(filter)) ? '200 OK' : undefined)
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
        return !(await searchAndDestroy(filter)) ? '200 OK' :{
            "status": "404 not found",
            "message": "Resource not found"
        };
    } catch(err) {
        if(err.name=='TypeError'){
            return {
                "status": "500 Internal server error",
                "error": err.name,
                "message": "The given user was most likely not found"
            }
        }
        return {
            "status": "500 Internal server error",
            "error": err.name
        }
    }   
}

async function searchAndDestroy(filter) {
    const userModel = mongoose.model('User')
    await userModel.find(filter).exec().then(user => {
        return userModel.findByIdAndDelete(user[0]._id);
    });
}