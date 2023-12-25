const express = require('express');
const path = require('path');
const app = express();
const mongoose = require('mongoose');
const session = require('express-session');
const MongDBStore = require('connect-mongodb-session')(session);
const User = require('./models/user');


const mongodb_uri = "mongodb://127.0.0.1:27017/Books";

const { mongoConnect } = require('./connection/db');
const store = new MongDBStore({
    uri: mongodb_uri,
    collection: 'sessions',
})



app.use(session({
    secret: 'thisismysecret',
    resave: false,
    saveUninitialized: false,
    store: store,
}))


app.use((req, res, next) => {
    res.locals.isAuthenticated = req.session.isLoggedIn || false;
    next();
});

const notesRoutes = require('./routes/notes');
const adminRoutes = require('./routes/admin');
const authRoutes = require('./routes/auth');

app.use(express.urlencoded({ extended: false }));

app.set('view engine', 'ejs');
app.set('views','views');
app.use(express.static(path.join(__dirname, 'public')));
app.use(notesRoutes);
app.use(authRoutes);
app.use('/admin', adminRoutes);

app.use('/', (req,res,next) => {
    res.render('404', {
        pageTitle: '404',
        path: ''
    })
})

// mongoConnect(() => {
//     app.listen(3000);    
// });

mongoose.connect(mongodb_uri)
.then(() => {
    app.listen(3000);
}).catch(err => console.log(err))