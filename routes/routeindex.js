const { render } = require('ejs');
const express = require('express');
const router = express.Router();
let Post = require('../model/post')
//const Task = require('../model/task');


router.get('/', async function(req,res){
  let allPosts = await Post.find()
  if( allPosts.length>0){
    res.render('index', {allPosts});
  }
  else{
    res.render('noposts');
  }
  
});


router.get('/newPost', async (req,res) =>{
  res.render('newPost');
});

router.post('/newPost', async (req, res)=>{
  console.log(req.body)
  let newPost = new Post(req.body);
  console.log(newPost)
  await newPost.save()
  res.redirect('/')
})

router.get('/edit/:id', async (req,res)=>{
  let id = req.params.id
  let post = await Post.findOne({_id:id})
  res.render('edit', {post});
})

router.post('/edit/:id', async (req,res)=>{
  let id = req.params.id
  // let post = await Post.findOne({_id:id})
  // post.title=req.body.title
  // post.author=req.body.author
  // post.post_data=req.body.post_data
  await Post.updateOne({_id:id}, req.body)
  res.redirect('/');
})

router.get('/delete/:id', async (req,res)=>{
  let id = req.params.id
  let post = await Post.findOne({_id:id})
  res.render('delete', {post});
})

router.post('/delete/:id', async (req,res)=>{
  let id = req.params.id
  // let post = await Post.findOne({_id:id})
  // post.title=req.body.title
  // post.author=req.body.author
  // post.post_data=req.body.post_data
  await Post.deleteOne({_id:id})
  res.redirect('/');
})





module.exports = router;