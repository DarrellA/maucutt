var http = require('http'),
    url = require('url'),
    path = require('path'),
    fs = require('fs');

http.createServer(function(req, response) {

     var uri = url.parse(req.url).pathname; 
     var path =  uri.substring(1,uri.length);
     var filename = "responses" + uri + ".json"; 

     if( path == "304") {
         process.stdout.write("304.\n");
         var timestamp = "{\"Date\":" +  new Date().getTime(); +  "\"}";
         response.writeHead(304, timestamp);
         response.end();
         return;

     }
     process.stdout.write("request:  " +  uri +  " maps to "  + filename +  "\n");
     fs.exists(filename, function(exists) {
        if(!exists) {
           response.writeHead(404, {"Content-Type": "text/plain"});
           response.write("404 Not Found\n");
           response.end();
           process.stdout.write("404.\n");
           return;

        }
           response.writeHead(200, "application/json" );
           var fileStream = fs.createReadStream(filename);
           fileStream.pipe(response); 

      });


}).listen(7012);

