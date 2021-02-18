'user strict';
var admin = require('../db.js');

var Post = function(Post){
   /* this.id = Post.id;*/
	this.red_id = Post.red_id;
	this.autor_id = Post.autor_id;
    this.titulo = Post.titulo;
	this.contenido = Post.contenido;   
    /*this.fchalta = Post.fchalta;*/
};
var tabla = 'post';
Post.createPost = function (postData, result) {       
          // Get a key for a new Post.
    var newPostKey = admin.database().ref().child(tabla).push().key;
    var updates = {};
    updates['/'+tabla+'/' + newPostKey] = postData;   
    admin.database().ref().update(updates);
    return newPostKey    
};
Post.getAllPost = function (result) {
  
    admin.database().ref(tabla).once('value').then((snapshot) => {        
       
        result(null, snapshot.val());
      });  
};
module.exports= Post;