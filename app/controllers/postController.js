'use strict';

var Post = require('../model/postModel.js');

exports.list_all_Posts = function(req, res) {
  console.log('res aqui');
 // res.json({ message: 'Post successfully' });
  
  Post.getAllPost(function(err, Post) {

    console.log('controller')
    if (err)
      res.send(err);
      console.log('res', Post);
    res.send(Post);
  });
  
};



exports.create_a_Post = function(req, res) {
  var new_Post = new Post(req.body);


  Post.createPost(new_Post, function(err, Post) {
    
    if (err)
      res.send(err);
    res.json(Post);
  });
  res.send('ok');
};







