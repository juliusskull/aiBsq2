'use strict';

var Autor = require('../model/autorModel.js');

exports.list_all_Autors = function(req, res) {
  console.log('res aqui');
 // res.json({ message: 'Autor successfully' });
  
  Autor.getAllAutor(function(err, Autor) {

    console.log('controller')
    if (err)
      res.send(err);
      console.log('res', Autor);
    res.send(Autor);
  });
  
};
exports.create_a_Autor = function(req, res) {
    var new_Autor = new Autor(req.body);
  
    
    Autor.createAutor(new_Autor, function(err, Autor) {      
      if (err)
        res.send(err);     
    });
     res.send('ok');

  };