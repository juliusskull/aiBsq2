'use strict';

var Reaccion = require('../model/reaccionModel.js');

exports.list_all_Reaccions = function(req, res) {
  console.log('res aqui');
 // res.json({ message: 'Reaccion successfully' });
  
  Reaccion.getAllReaccion(function(err, Reaccion) {

    console.log('controller')
    if (err)
      res.send(err);
      console.log('res', Reaccion);
    res.send(Reaccion);
  });
  
};



exports.create_a_Reaccion = function(req, res) {
  var new_Reaccion = new Reaccion(req.body);

  Reaccion.createReaccion(new_Reaccion, function(err, Reaccion) {
    
    if (err)
      res.send(err);
    res.json(Reaccion);
  });
  res.send('ok');
};




