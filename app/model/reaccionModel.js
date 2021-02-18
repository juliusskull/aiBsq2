'user strict';
var admin = require('../db.js');

var Reaccion = function(Reaccion){
    /*this.id = Reaccion.id;	*/
	this.post_id = Reaccion.post_id;
	this.comentario_id = Reaccion.comentario_id;
	this.tipo_reaccion = Reaccion.tipo_reaccion;   
    /*this.fchalta = Reaccion.fchalta;*/
};
var tabla = 'reaccion';
Reaccion.createReaccion = function (postData, result) {       
          // Get a key for a new Post.
    var newPostKey = admin.database().ref().child(tabla).push().key;
  
    // Write the new post's data simultaneously in the posts list and the user's post list.
    var updates = {};
    updates['/'+tabla+'/' + newPostKey] = postData;
    //updates['/autor-posts/' + uid + '/' + newPostKey] = postData;
  
    admin.database().ref().update(updates);
    return newPostKey    
};
Reaccion.getAllReaccion = function (result) {
  
    admin.database().ref(tabla).once('value').then((snapshot) => {        
       
        result(null, snapshot.val());
      });  
};
module.exports= Reaccion;