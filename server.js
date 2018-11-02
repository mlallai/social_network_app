const express = require('express');
const mongoose = require('mongoose');

const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');

const app = express();

//DB CONFIG

const db = require('./config/keys').mongoURI;

//CONNECT TO MONGO DB THROUGH MONGOOSE

mongoose
    .connect(db)
//PROMISE RETURN
    .then(() => console.log('MongoDB Connected !'))
    .catch(err => console.log(err))

// PAGE D'ACCUEIL
app.get('/', (req, res) => res.send('Hello Baby'));

//USE ROUTES
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);

// ON TOURNE SUR ENVIRONNEMENT DE PROD OU SUR PORT 5000 EN LOCAL
const port = process.env.PORT || 5000

// ON DIT OU LANCER LE SERVEUR
app.listen(port, () => console.log(`Server running on port ${port}`));