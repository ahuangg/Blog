const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Blog = require('./models/blog.js');

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

// mongoose test routes
// app.get('/add-blog', (req, res) =>{
//     const blog = new Blog({
//         title: "test Blog 2",
//         snippet: "about new blog",
//         body: "more about new blog"
//     });

//     blog.save().then((results) =>{
//         res.send(results)
//     }).catch((err) =>{
//         console.log(err)
//     });
// });

// app.get('/all-blogs', (req, res) =>{
//     Blog.find().then((result) => {
//         res.send(result);
//     }).catch((err) =>{
//         console.log(err);
//     });
// });

// app.get('/single-blog', (req, res) => {
//     Blog.findById('62d83c5e1a42d029ebdc2aee').then((result) =>{
//         res.send(result);
//     }).catch((err) =>{
//         console.log(err);
//     });
// });




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

app.get('/blogs', (req, res) =>{
    Blog.find().sort({createdAt: -1}).then((result) =>{
        res.render('index', {
            title: 'All Blogs',
            blogs: result
        })
    }).catch((err) =>{
        console.log(err);
    });
});

app.post('/blogs', (req, res) =>{
    const blog = new Blog(req.body);

    blog.save().then((result) =>{
        res.redirect('/blogs')
    }).catch((err) =>{
        console.log(err);
    });
});

app.get('/blogs/create', (req, res) =>{
    res.render('create', {
        title: 'Create Blog'
    });
});

app.get('/blogs/:id', (req, res) =>{
    const id = req.params.id;
    console.log(id);
    Blog.findById(id).then((result) =>{
        res.render('details', {
            title: result.title,
            blog: result
        })
    }).catch((err) =>{
        console.log(err);
    });
});

app.delete('/blogs/:id', (req, res) =>{
    const id = req.params.id;
    Blog.findByIdAndDelete(id).then((result) =>{
        res.json({ redirect: '/blogs' });
    }).catch((err) =>{
        console.log(err);
    });
    
});


app.use((req, res) =>{
    res.render('404', {
        title: '404 Error'
    });
});