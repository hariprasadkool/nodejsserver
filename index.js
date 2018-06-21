// Node’s inbuilt  module
const http = require("http");
const url = require('url');
const { parse } = require('querystring');

// Pages
const welcomepage = require('./welcomepage.js');

// Create HTTP server and listen on port 8000 for requests
http.createServer(function (request, response) {
    if(request.method === 'OPTIONS'){
        console.log('!OPTIONS');
        const headers = {};
        // IE8 does not allow domains to be specified, just the *
        // headers["Access-Control-Allow-Origin"] = req.headers.origin;
        headers["Access-Control-Allow-Origin"] = "*";
        headers["Access-Control-Allow-Methods"] = "POST, GET, PUT, DELETE, OPTIONS";
        headers["Access-Control-Allow-Credentials"] = false;
        headers["Access-Control-Max-Age"] = '86400'; // 24 hours
        headers["Access-Control-Allow-Headers"] = "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept";
        response.writeHead(200, headers);
        response.end();
    }
    if (request.method === 'POST') {
        let body = '';
        request.on('data', chunk => {
            body += chunk.toString(); // convert Buffer to string
        });
        request.on('end', () => {
            const parsedBody = parse(body);
            console.log(parsedBody);
            
            // Set the response HTTP header with HTTP status and Content type
            response.writeHead(200, {
                'Content-Type': 'text/plain'
            });
            response.write(JSON.stringify(parsedBody));
            response.write(request.url);
            response.write(welcomepage.greeting());
            response.end();
        });
    }

}).listen(9000);


// Print URL for accessing server
console.log('Server running at http://127.0.0.1:9000/')


/*

    To run server in command line (provide the file name to run with node)
    node index.js

    To run server in vs code (provide the file name to run in launch.json)
    CLICK DEBUG BUTTON

*/