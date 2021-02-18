// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs

const express = require('express');
const app = express();
var admin = require('./app/db.js');

var autorList = require('./app/controllers/autorController');
var postList = require('./app/controllers/postController');
var comentarioList = require('./app/controllers/comentarioController');
var reaccionList = require('./app/controllers/reaccionController');


bodyParser = require('body-parser');

port = process.env.PORT || 3005;
//app.use(cors());

app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});

app.listen(port);

console.log('API server started on: ' + port);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
/*
app.get('/autor', (req, res) => {

      list_all('autor',req, res);
  });

app.post('/autor', (req, res) => {

    var new_Autor = new Autor(req.body);
    write(new_Autor, 'autor');
    console.log('=>');
    res.send('ok');
});
*/
app.route('/autor')
.get(autorList.list_all_Autors)
.post(autorList.create_a_Autor);

app.route('/post')
    .get(postList.list_all_Posts)
    .post(postList.create_a_Post);
  
  app.route('/comentario')
    .get(comentarioList.list_all_Comentarios)
    .post(comentarioList.create_a_Comentario);

  app.route('/reaccion')
    .get(reaccionList.list_all_Reaccions)
    .post(reaccionList.create_a_Reaccion);
/*
list_all = function(tabla, req, res) {
        console.log('res aqui');      
       admin.database().ref(tabla).once('value').then((snapshot) => {        
        res.send(snapshot.val());
        
      });
    
        
      };

function writeUserData(userId, pnombre) {
    admin.database().ref('autor' ).set({
      id: userId,
      nombre: pnombre
    });
  }



function writeNewPost(uid, pnombre) {
    // A post entry.
    var postData = {
        id: uid,
        nombre: pnombre
    
    };
  
    // Get a key for a new Post.
    var newPostKey = admin.database().ref().child('posts').push().key;
  
    // Write the new post's data simultaneously in the posts list and the user's post list.
    var updates = {};
    updates['/autor/' + newPostKey] = postData;
    updates['/autor-posts/' + uid + '/' + newPostKey] = postData;
  
    return admin.database().ref().update(updates);
  }

  function write(postData, tabla) {
    // A post entry.
    
  
    // Get a key for a new Post.
    var newPostKey = admin.database().ref().child(tabla).push().key;
  
    // Write the new post's data simultaneously in the posts list and the user's post list.
    var updates = {};
    updates['/'+tabla+'/' + newPostKey] = postData;
    //updates['/autor-posts/' + uid + '/' + newPostKey] = postData;
  
    admin.database().ref().update(updates);
    return newPostKey
  }


  function read(tabla) {
    admin.database().ref(tabla).once('value').then((snapshot) => {
        //var username = (snapshot.val() && snapshot.val().username) || 'Anonymous';
        console.log(snapshot.val());
        // ...
      });
  }
*/

 