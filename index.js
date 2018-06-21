const http = require("http");


//Create HTTP server and listen on port 8000 for requests
http.createServer(function (request, response) {

   // Set the response HTTP header with HTTP status and Content type
   response.writeHead(200, {'Content-Type': 'text/plain'});

   // sending the empty response back and ending the connection
   response.end();

}).listen(9000);


// Print URL for accessing server
console.log('Server running at http://127.0.0.1:9000/')
