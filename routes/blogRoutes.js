const express = require('express');
const controller = require('../controllers/blogControllers');

const router = express.Router();


router.get('/', controller.blog_index);
router.post('/', controller.blog_create_post);
router.get('/create', controller.blog_create_get);
router.get('/:id', controller.blog_details);
router.delete('/:id', controller.blog_delete);

module.exports = router;



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