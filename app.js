const express = require('express');

const app = express()

app.set('view engine', 'ejs');

app.listen(3000);

app.get('/', (req, res) =>{
    const blogs = [
        {title: 'lorem', snippet: 'lorem ipsum dolor sit amet'},
        {title: 'lorem2', snippet: 'lorem ipsum dolor sit amet'},
        {title: 'lorem3', snippet: 'lorem ipsum dolor sit amet'}
    ];
    res.render('index', {
        title: 'Home',
        blogs
    });
});

app.get('/about', (req, res) =>{
    res.render('about', {
        title: 'About'
    });
});

app.get('/blogs/create', (req, res) =>{
    res.render('create', {
        title: 'Create Blog'
    });
});

app.use((req, res) =>{
    res.render('404', {
        title: '404 Error'
    });
});