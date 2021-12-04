const mongoose = require('mongoose')

const prop = mongoose.Schema({

    firstname:{
        type: String,
        require: true
    },

    name:{
        type: String,
        require: true
    },

    age:{
        type: Number,
        require: true
    },

    phone:{
        type: String,
        require: true
    },

    email:{
        type: String,
        require: true
    },
    
    classe:{
        type: String,
        require: true
    },

    statut:{
        type: String,
        require: true
    },

    password:{
        type: String,
        require: true
    }

});

module.exports = mongoose.model('users', prop)