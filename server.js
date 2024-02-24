//console.log("Halo kita akan belajar membuat web server");

const http = require("http");

const requestListener = (request, response) => {
  response.setHeader("Content-Type", "text/html");
  response.statusCode = 200;
};

const server = http.createServer(requestListener);

const host = "localhost";
const port = 5000;

server.listen(port, host, () => {
  console.log(`Server berjalan pada http://${host}:${port}`);
});
