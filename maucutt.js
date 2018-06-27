var http = require('http'),
    url = require('url'),
    path = require('path'),
    fs = require('fs');

http.createServer(function(req, response) {

     var uri = url.parse(req.url).pathname; 
     var path =  uri.substring(1,uri.length);
     process.stdout.write("path: " +  path +  "\n");
     var filename = "responses" + uri + ".json"; 

     if( path == "304") {
         process.stdout.write("304.\n");
         var timestamp = "{\"Date\":" +  new Date().getTime(); +  "\"}";
         response.writeHead(304, timestamp);
         response.end();
         return;

     }
     if( path == "403") {
         process.stdout.write("403.\n");
         var timestamp = "{\"Date\":" +  new Date().getTime(); +  "\"}";
         response.writeHead(403, timestamp);
         response.end();
         return;

     }
     if (path == "400" ) {
         process.stdout.write("400.\n");
         var timestamp = "{\"Date\":" +  new Date().getTime(); +  "\"}";
         response.writeHead(400, timestamp);
         response.end();
         return;

 
     }
     if (path == "404" ) {
         process.stdout.write("404\n");
         var timestamp = "{\"Date\":" +  new Date().getTime(); +  "\"}";
         response.writeHead(404, timestamp);
         response.end();
         return;

    }
  if (path == "405" ) {
         process.stdout.write("405.\n");
         var timestamp = "{\"Date\":" +  new Date().getTime(); +  "\"}";
         response.writeHead(405, timestamp);
         response.end();
         return;

    }

  if (path == "429" ) {
         process.stdout.write("429.\n");
         var timestamp = "{\"Date\":" +  new Date().getTime(); +  "\"}";
         response.writeHead(429, timestamp);
         response.end();
         return;

    }

  if (path == "500" ) {
         process.stdout.write("500.\n");
         var timestamp = "{\"Date\":" +  new Date().getTime(); +  "\"}";
         response.writeHead(500, timestamp);
         response.end();
         return;

    }

	if (path == "205" ) {
         process.stdout.write("205.\n");
         var timestamp = "{\"Date\":" +  new Date().getTime(); +  "\"}";
         response.writeHead(205, {"Content-Type": "application/json; charset=utf-8"}, {"Content-Length": "4"});
         response.write("{\n}\n");
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

