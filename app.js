const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');

const blogRoutes = require('./routes/blogRoutes.js');


const app = express();


//connect to mongodb 
const dburl = "mongodb+srv://user:pass@pet.hpbdy.mongodb.net/node-test?retryWrites=true&w=majority"
mongoose.connect(dburl, {useNewUrlParser: true, useUnifiedTopology: true})
//listen to request only when connected
.then((result) => app.listen(3000))
.catch((err) => console.log(err));

console.log(mongoose.connection.readyState);

//view engine
app.set('view engine', 'ejs');

//middleware 
app.use(morgan('dev'));
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));


app.get('/', (req, res) =>{
    // const blogs = [
    //     {title: 'lorem', snippet: 'lorem ipsum dolor sit amet'},
    //     {title: 'lorem2', snippet: 'lorem ipsum dolor sit amet'},
    //     {title: 'lorem3', snippet: 'lorem ipsum dolor sit amet'}
    // ];
    // res.render('index', {
    //     title: 'Home',
    //     blogs
    // });
    res.redirect('/blogs')
});

app.get('/about', (req, res) =>{
    res.render('about', {
        title: 'About'
    });
});

app.use('/blogs', blogRoutes);


app.use((req, res) =>{
    res.render('404', {
        title: '404 Error'
    });
});