const user = require('../models/user')

exports.createUser = (req, res) =>{
const prod = new user({
    firstname: req.body.firstname,
    name: req.body.name,
    age: req.body.age,
    phone: req.body.phone,
    email: req.body.email,
    classe: req.body.classe,
    statut: req.body.statut,
    password: req.body.password
})

prod.save()
.then((user)=>{
    return res.status(201).json({ user })
})
.catch((error)=>{
    return res.status(400).json({ error })
})
  
}

exports.getOneUser = (req, res) =>{
    const id = req.params.id

    user.findOne({_id : id})
    .then((user)=>{
        return res.status(200).json({ user })
    })
    .catch((error)=>{
        return res.status(400).json({ error })
    })
}

exports.getAllusers = (req, res) =>{
    user.find()
    .then((users)=>{
        return res.status(200).json({ users })
    })
    .catch((error)=>{
        return res.status(400).json({ error })
    })

}

exports.updateUsers = (req, res) =>{ 
    const id = req.params.id
    
    user.findByIdAndUpdate(id, req.body)
    .then((user)=>{
        return res.status(201).json({ user })
    })
    .catch((error)=>{
        return res.status(400).json({ error })
    })
}

exports.deleteUser = (req, res) =>{
    const id = req.params.id

    user.findByIdAndDelete({ _id : id })
    .then((user)=>{
        return res.status(201).json({ user })
    })
    .catch((error)=>{
        return res.status(400).json({ error })
    })
}