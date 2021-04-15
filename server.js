// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs

const express = require('express');

const axios = require('axios');
const cheerio = require('cheerio');
const scrapeIt = require("scrape-it");

const app = express();


var autorList = require('./app/controllers/autorController');
var postList = require('./app/controllers/postController');
var comentarioList = require('./app/controllers/comentarioController');
var reaccionList = require('./app/controllers/reaccionController');


bodyParser = require('body-parser');
var admin = require('./app/db.js');

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
//url ejemplo 'https://slides.com/carboleda'
var url ='https://www.quepasasalta.com.ar';
app.get('/exe-diario', (req, response) => {
  console.log('entro');
  const html= "<h1>hola</h1>";
  

   getConfig();
  response.writeHeader(200, {"Content-Type": "text/html"});  
  response.write(html);  
  response.end();  
 
});

app.get('/prueba', (req, response) => {
  console.log('entro');
  const html= "<h1>funcionando...</h1>";
  

   getConfig();
  response.writeHeader(200, {"Content-Type": "text/html"});  
  response.write(html);  
  response.end();  
 
});

app.post('/captura', (req, response) => {
  console.log('entro');
  const html= req.body;
  const tabla= "captura";
  var newPostKey = admin.database().ref().child(tabla).push().key;
  
  // Write the new post's data simultaneously in the posts list and the user's post list.
  var updates = {};
  updates['/'+tabla+'/' + newPostKey] = html;
  //updates['/autor-posts/' + uid + '/' + newPostKey] = postData;

  admin.database().ref().update(updates);

  response.writeHeader(200, {"Content-Type": "text/json"});  
  response.write(JSON.stringify(html));  
  response.end();  


});

    //compareUrl(url);
    //scrapeItExample(url);

   // cheerioComentario('https://www.quepasasalta.com.ar/policiales/policia-se-pego-un-tiro-en-la-cabeza-en-la-terminal/');

    async function cheerioExample(url) {
      const pageContent = await axios.get(url);
      const $ = cheerio.load(pageContent.data);
      const presentations = $('li.deck.public').map((_, el) => {
          el = $(el);
          /*
          const title = el.find('span.deck-title-value').text();
          const description = el.find('span.deck-description-value').text();
          const link = el.find('a.deck-link').attr('href');
          */
        
          return { title, description, link };
      }).get();
      console.log(presentations);
  }
  function removeUrl(url){  
    
    var ref = admin.database().ref("captura");
    var b = true;

    ref.on("value", function(snapshot) {
      snapshot.forEach(function(a){
        console.log('url='+a.val().url );
        console.log('key='+a.key );
        if(a.val().url == url){
          var ref2 = admin.database().ref("captura");
          var skey= String(a.key);
          ref2.child(a.key).remove();
          console.log("r=ok");
        }
        

      });
     
    });
    
/*
    var ref = db.ref("server/saving-data/fireblog/posts");

    // Get the data on a post that has been removed
    ref.on("child_removed", function(snapshot) {
      var deletedPost = snapshot.val();
      console.log("The blog post titled '" + deletedPost.title + "' has been deleted");
    });
    */
  }
  function getConfig(){
    
    
      var ref = admin.database().ref("config");
      var b = true;
  
      ref.on("value", function(snapshot) {
        console.log('cant='+snapshot.numChildren() );
        console.log( 'autor=>'+snapshot.val().autor);
        var idAutor= snapshot.val().autor; 
        var idComentario = snapshot.val().comentario; 
        var idPost = snapshot.val().post; 
        var idReaccion = snapshot.val().reaccion; 
        var c={
          autor:idAutor,
          comentario: idComentario,
          post: idPost,
          reaccion: idReaccion
        }

        cheerioExample2(url,c,idPost);
        
      });
      /*
      var usersRef = admin.database().ref("config");
      usersRef.set({
        "autor" : 2,
        "comentario" : 1,
        "post" : 1,
        "reaccion" : 1 
      });
      */
  }
  function cargarAutor(autor,_contenido,_idPost){
    
    var ref = admin.database().ref("autor");
    var b = true;

    ref.on("value", function(snapshot) {

      console.log('cant='+snapshot.numChildren() );
      var i=0;
      var cant = snapshot.numChildren();
     
      var id=0;
      var maxId=0;
      snapshot.forEach(function(data) {
        
        console.log("The " + data.key + " , " + data.val().nombre);
        i++;
        if(data.val().nombre== autor){
          id= data.val().id;
        }
        if(maxId<data.val().id){
          maxId = data.val().id;
        }
        if(i>=cant){
          if(id==0){
            // inserta
            var nuevo= {
              nombre: autor,
              id: maxId
            };
            console.log('-- no existe-- id:0');
            var newPostKey = admin.database().ref().child('autor').push().key;
  
            // Write the new post's data simultaneously in the posts list and the user's post list.
            var updates = {};
            updates['/'+'autor'+'/' + newPostKey] = nuevo;
            //updates['/autor-posts/' + uid + '/' + newPostKey] = postData;
          
            admin.database().ref().update(updates);
            console.log('cargo autor');
          }else{
            console.log('-- ya existe-- id:'+ id);
          }
          var ref2 = admin.database().ref("comentario");
          var newPostKey2 = admin.database().ref().child('comentario').push().key;

     

          var updates2 = {};
          var comentario={
            autor_id:id,
            comentario_id:0,
            contenido:_contenido,
            post_id:_idPost
          };
          updates2['/'+'comentario'+'/' + newPostKey2] = comentario;   
          
          admin.database().ref().update(updates2);
          console.log('cargo comentario');
          console.log('-------------------');
        }
        

      });
      
    });
   

  }
  async function cheerioExample2(url, _config,idPost) {
    const pageContent = await axios.get(url);
    const $ = cheerio.load(pageContent.data);
    //var links = [];
    links = $('a');
    //var idPost = _config.post;
    $(links).each(function(i, link){
          idPost++;
          var url2= url + $(link).attr('href');    
          cheerioComentario(url2,_config,idPost);
    
   
    }); 

}

async function cheerioComentario(url,config,_idPost) {
  try {
    
  
  const pageContent = await axios.get(url);
  if(pageContent==null)
    return false;
  const $ = cheerio.load(pageContent.data);
 
  //console.log('url:'+ url);
  links = $('.comment');
  if($(links).find( ".commentitem" ).find( ".author" ).text()!=''){
    var rr = $(links).find( ".commentitem" );
    const timeLinePostEls = rr.map((i,el)=>$(el)).get();

    comentarios= [];
    timeLinePostEls.forEach((element,index) => {
      console.log('-inicio-'+index);
      console.log('autor:'+$(element).find( ".author" ).text());
      console.log('body:'+$(element).find( ".body" ).text());
      var comentario={
        autor: $(element).find( ".author" ).text(),
        comentario: $(element).find( ".body" ).text()
      };
      comentarios.push(comentario);
      if(timeLinePostEls.length-1==index){
        var nuevo= {         
           autor_id: 'autor',
           url: url,
           red_id:1,
           titulo:url,
           comentarios: comentarios
     
         };
       removeUrl(url);
       var ref = admin.database().ref("captura");
       var newPostKey = admin.database().ref().child('captura').push().key;
       var updates = {};
       updates['/'+'captura'+'/' + newPostKey] = nuevo;  
       admin.database().ref().update(updates);
       console.log('------------------');
      }
     // cargarAutor($(element).find( ".author" ).text(),$(element).find( ".body" ).text(),_idPost);
  
    });
  }
 
} catch (error) {
    console.log('error link:'+error);
}
}
  async function scrapeItExample(url) {
    const scrapeResult = await scrapeIt(url, {
        presentations: {
            listItem: 'li.deck.public',
            data: {
                title: 'span.deck-title-value',
                description: 'span.deck-description-value',
                link: {
                    selector: 'a.deck-link',
                    attr: 'href'
                }
            }
        }
    });
    console.log(scrapeResult);
}