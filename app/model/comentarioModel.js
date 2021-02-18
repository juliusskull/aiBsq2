'user strict';
var admin = require('../db.js');

var Comentario = function(Comentario){
    /*this.id = Comentario.id;	*/
	this.autor_id = Comentario.autor_id;
	this.comentario_id = Comentario.comentario_id;
	this.contenido = Comentario.contenido;   
    /*this.fchalta = Comentario.fchalta;*/
};
var tabla = 'comentario';
Comentario.createComentario = function (postData, result) {       
          // Get a key for a new Post.
    var newPostKey = admin.database().ref().child(tabla).push().key;
    var updates = {};
    updates['/'+tabla+'/' + newPostKey] = postData;   
    admin.database().ref().update(updates);
    return newPostKey    
};
Comentario.getAllComentario = function (result) {
  
    admin.database().ref(tabla).once('value').then((snapshot) => {        
       
        result(null, snapshot.val());
      });  
};
module.exports= Comentario;