'user strict';
var admin = require('../db.js');

var Autor = function(Autor){
    this.nombre = Autor.nombre;
    this.id = Autor.id;
   /* this.fchalta = Autor.fchalta;*/
};
var tabla = 'autor';
Autor.createAutor = function (postData, result) {       
          // Get a key for a new Post.
    var newPostKey = admin.database().ref().child(tabla).push().key;
  
    // Write the new post's data simultaneously in the posts list and the user's post list.
    var updates = {};
    updates['/'+tabla+'/' + newPostKey] = postData;
    //updates['/autor-posts/' + uid + '/' + newPostKey] = postData;
  
    admin.database().ref().update(updates);
    return newPostKey    
};
Autor.getAllAutor = function (result) {
  
    admin.database().ref(tabla).once('value').then((snapshot) => {        
       
        result(null, snapshot.val());
      });  
};
module.exports= Autor;