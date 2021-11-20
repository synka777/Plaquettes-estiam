const jwt = require('jsonwebtoken')

const jwtKey = 'my_secret_key'
const jwtExpirySeconds = 300

// A supprimer lorsqu'un modèle utilisateur et opérations CRUD de user seront créés
const users = {
    user1: 'password1',
    user2: 'password2'
}

module.exports.signIn = (req, res) => {
    const { username, password } = req.body
    // Remplacer la 3e condition pour check en base si les identifiants matchent bien
    if (!username || !password || users[username] !== password) return res.status(401).end()

    // Créée un nouveau token avec le nom d'utilisateur dans le payload avec expiration après 300s
    // ajouter le role utilisateur dans le payload quand les roles seront créés
    const token = jwt.sign({ username }, jwtKey, {
        algorithm: 'HS256',
        expiresIn: jwtExpirySeconds
    })
    console.log('token:', token)
    // on renvoie le token en tant que cookie
    res.cookie('token', token, { maxAge: jwtExpirySeconds * 1000 })
    res.end()
}

// A appeler dans chaque endpoint avant d'accepter ou non l'accès au controller de ressources appelé
module.exports.welcome = (req, res) => {
    // On récupère le token des cookies associés à la requête
    const token = req.cookies.token

    // Si pas de cookie on retourne une erreur 401 et l'accès à la ressource est refusé
    if (!token) {
        return res.status(401).end()
    }

    let payload
    try {
        // On check la validité du token (temps et signatureet le stocke en payload.
        // S'il n'est pas valide une erreur de vérification de token sera levée
        payload = jwt.verify(token, jwtKey)
    } catch (e) {
        if (e instanceof jwt.JsonWebTokenError) {
            return res.status(401).end()
        }
        return res.status(400).end()
    }

    // A voir si utilité
    res.send(`Welcome ${payload.username}!`)
}

module.exports.refresh = (req, res) => {
    // Refacto à faire
    const token = req.cookies.token

    if (!token) {
        return res.status(401).end()
    }

    let payload
    try {
        payload = jwt.verify(token, jwtKey)
    } catch (e) {
        if (e instanceof jwt.JsonWebTokenError) {
            return res.status(401).end()
        }
        return res.status(400).end()
    }
    // Fin refacto

    // On check si un refresh de token n'a pas déjà été lancé.
    // Un nouveau token ne sera délivré que si l'ancien token va expirer dans les 30 secondes
    // qui suivent. Dans le cas contraire la demande esrt rejetée avec un statut bad request

    const nowUnixSeconds = Math.round(Number(new Date()) / 1000)
    if (payload.exp - nowUnixSeconds > 30) return res.status(400).end()

    const newToken = jwt.sign({ username: payload.username }, jwtKey, {
        algorithm: 'HS256',
        expiresIn: jwtExpirySeconds
    })

    res.cookie('token', newToken, { maxAge: jwtExpirySeconds * 1000 })
    res.end()
}