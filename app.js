const express = require('express')
const app = express()
const mongoose = require('mongoose');
const bodyparser = require('body-parser')
const RouteUsers = require('./router/user')


mongoose.connect('mongodb+srv://viny:test123@cluster0.ur6gj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',{
    
}).then( ()=>{
    console.log("connexion success")
}).catch( (error)=>{
    console.log(error)
});


app.use(bodyparser.json())
app.use('/admin/users/add/', RouteUsers)
app.use('/admin/users/list/', RouteUsers)
app.use('/admin/user/', RouteUsers)
app.use('/admin/users/update', RouteUsers)
app.use('/admin/users/delete', RouteUsers)



module.exports = app