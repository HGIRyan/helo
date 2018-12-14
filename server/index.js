// Requirements
const express = require('express')
const bodyParser = require('body-parser')
const session = require('express-session')
const bcrypt = require('bcryptjs')
const massive = require('massive')
require('dotenv').config()
let { SERVER_PORT, CONNECTION_STRING, SECRET, DEV } = process.env;

// const controller = require('./controller')

const app = express()
app.use(bodyParser.json())

// SECRET Session
app.use(session({
    secret: SECRET,
    resave: false,
    saveUninitialized: false
}))


// Massive
massive(CONNECTION_STRING)
    .then(dbInstance => {
        app.set('db', dbInstance)
        // LISTEN
        app.listen(SERVER_PORT, () => { console.log(`I am On Port: ${SERVER_PORT}`) })
    }).catch(err => console.log('Error', err))



app.get('/api/post', (req, res) => {
    const dbInstance = req.app.get('db');
    dbInstance.get_post()
        .then(post => res.status(200).send(post))
        .catch(err => console.log('Error', err))
})

// AUTHORIZATION 
// REGISTER
app.post('/auth/register', async (req, res) => {
    try{
    let { username, password } = req.body;
    let db = req.app.get('db')
    let userFound = await db.check_user([username])
    console.log('GotHere', { username, password })
    if (userFound[0]) {
        return res.status(200).send({ loggedIn: false, message: 'UserName Already Exists' })
    }
    let salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync(password, salt)

    console.log('Finannla', { username, hash })
    let createdUser = await db.create_user([username, hash])
    req.session.user = { id: createdUser[0].user_id, username: createdUser[0].username }
    let sessionUser = req.session.user
    res.status(200).send({ loggedIn: true, message: 'Login Successful', sessionUser, userFound })
}catch(err){console.log(err)}
})

// LOGIN
app.post('/auth/login', async (req, res) => {
    let { username, password } = req.body;
    console.log('GotHere', { username, password })
    let db = req.app.get('db');
    let userFound = await db.check_user([username]);
    if (!userFound[0]) {
        return res.status(200).send({ loggedIn: false, message: 'UserName Doesnt Exist, Create New Account' });
    }
    let result = bcrypt.compareSync(password, userFound[0].hash_value)
    if (result) {
        let user = userFound[0]
        req.session.user = { id: user.user_id, username: user.username }
        let sessionUser = req.session.user
        console.log('Also Got Here')
        return res.status(200).send({ loggedIn: true, message: 'Login Successful', sessionUser, userFound })
    } else {
        return res.status(401).send({ message: 'Incorrect UserName/Password', loggedIn: false })
    }
})
// Timed Out
app.get('/api/user-data', (req, res) => {
    if (req.session.user) {
        res.status(200).send(req.session.user)
    } else {
        res.status(401).send('Please Log In To View Account Info')
    }
})


// LogOut
app.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('http://localhost:3500')
})