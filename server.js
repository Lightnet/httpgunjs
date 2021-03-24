/*
  Name: httpgunjs

  Created by: Lightnet

*/

var fs = require("fs");
//var path = require("path");
const http = require("http");
const Gun = require("gun");
//const SEA = require("gun/sea");
var { PORT = 3000, NODE_ENV } = process.env;
const dev = NODE_ENV === "development";
console.log("dev: " + dev);
//console.log(process.versions.node);

function htmlIndex(){
  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <title></title>
    <meta name="description" content="nodejs gun js database">
    <!--<link id="favicon" rel="icon" href="" type="image/x-icon">-->
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- import the webpage's stylesheet -->
    <link rel="stylesheet" href="/style.css">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.4.1/jquery.js"></script>
    <script src="https://redom.js.org/redom.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/gun/gun.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/gun/sea.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/gun/lib/mix.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/gun/lib/then.js"></script>
    <!-- RAD/LEX -->
    <script src="https://cdn.jsdelivr.net/npm/gun/lib/radix.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/gun/lib/radisk.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/gun/lib/store.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/gun/lib/rindexed.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/gun/lib/path.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/gun/lib/list.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/gun/lib/promise.js"></script>
  </head>
  <body>
    <script type="module" src="/client.js" defer></script>
    <footer>
    </footer>
  </body>
</html>
`;
}

const clientjs = fs.readFileSync('./client.js', 'utf8');
const stylecss = fs.readFileSync('./style.css', 'utf8');

//create server
const server = http.createServer(function(request, response) {
  //console.log("request starting...");
  console.log('request.url:',request.url)
  console.log('request.method:',request.method)
  if (Gun.serve(request, response)) {//get gun.js ex. <script src="/gun.js">
    return;
  } // filters gun requests!
  if(request.url == '/style.css'){
    response.writeHead(200, { "Content-Type": "text/css" });
    return response.end(stylecss);
  }
  if(request.url == '/client.js'){
    response.writeHead(200, { "Content-Type": "text/javascript" });
    return response.end(clientjs);
  }
  if(request.url == '/'){
    response.writeHead(200, { "Content-Type": "text/html" });
    return response.end(htmlIndex(), "utf-8");
  }

  /*
  //handle files as public folder
  var filePath = "." + request.url;
  if (filePath === "./") filePath = "./index.html";
  var extname = path.extname(filePath);
  var contentType = "text/html";
  switch (extname) {
    case ".js":
      contentType = "text/javascript";
      break;
    case ".css":
      contentType = "text/css";
      break;
    case ".json":
      contentType = "application/json";
      break;
    case ".png":
      contentType = "image/png";
      break;
    case ".jpg":
      contentType = "image/jpg";
      break;
    case ".wav":
      contentType = "audio/wav";
      break;
    default:
      contentType = "text/html";
  }
  fs.readFile(filePath, function(error, content) {
    if (error) {
      if (error.code === "ENOENT") {
        fs.readFile("./404.html", function(error, content) {
          response.writeHead(200, { "Content-Type": contentType });
          response.end(content, "utf-8");
        });
      } else {
        response.writeHead(500);
        response.end(
          "Sorry, check with the site admin for error: " + error.code + " ..\n"
        );
        response.end();
      }
    } else {
      response.writeHead(200, { "Content-Type": contentType });
      response.end(content, "utf-8");
    }
  });
  */
});

server.listen(PORT, err => {
    if (err) throw err;
    //console.log(app);
    console.log(`> Running on http://localhost:`+PORT);
});

var gun = Gun({
  file: "data",
  //web:app.server //server
  web: server
});
gun.on("hi", peer => {
  //peer connect
  //console.log('connect peer to',peer);
  console.log("peer connect!");
});
gun.on("bye", peer => {
  // peer disconnect
  //console.log('disconnected from', peer);
  console.log("disconnected from peer!");
});