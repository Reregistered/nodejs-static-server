(function () {

  /*
   * Include core dependencies.
   */
  var PORT = process.env.PORT || 8123;

  // Forward declaration of a global var abstracting the session store.
  var null_fn = function(){};
  /*
   * Setup connect, express, socket, and the connect-redis session store
   */
  var path = require('path')
    , express = require('express')
    , gzippo = require('gzippo')
    , app = express.createServer();

  app.configure(function () {
    app.use(express.bodyParser());

    var staticFolder  = process.env.FOLDER || '/static';
    /////////////////////////////////////////////////////
    // now add the static routes
    app.use(gzippo.staticGzip(__dirname + staticFolder));

    app.use(express.errorHandler({ dumpExceptions:true, showStack:true }));

    app.get('/*', function (req,res){
      res.sendfile(__dirname + '/static/index.html');
    });

  });

  /*
   * Fire up the webserver
   */
  console.log('Listening on port: ', PORT);
  app.listen();

})();
