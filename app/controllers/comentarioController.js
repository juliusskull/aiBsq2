'use strict';

var Comentario = require('../model/comentarioModel.js');

exports.list_all_Comentarios = function(req, res) {
  console.log('res aqui');
 // res.json({ message: 'Comentario successfully' });
  
  Comentario.getAllComentario(function(err, Comentario) {

    console.log('controller')
    if (err)
      res.send(err);
      console.log('res', Comentario);
    res.send(Comentario);
  });
  
};



exports.create_a_Comentario = function(req, res) {
  var new_Comentario = new Comentario(req.body);  
  Comentario.createComentario(new_Comentario, function(err, Comentario) {
    
    if (err)
      res.send(err);
    res.json(Comentario);
  });
  res.send('ok');
};







