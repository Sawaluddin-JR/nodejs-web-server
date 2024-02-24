//console.log("Halo kita akan belajar membuat web server");

const http = require("http");

const requestListener = (request, response) => {
  response.setHeader("Content-Type", "text/html");
  response.statusCode = 200;

  const method = request.method;

  if (method === "GET") {
    response.end("<h1>Hallo</h1>");
  }

  if (method === "POST") {
    let body = [];

    request.on("data", (chunk) => {
      body.push(chunk);
    });

    request.on("end", () => {
      body = Buffer.concat(body).toString();
      const { name } = JSON.parse(body);
      response.end(`<h1>Hai,${name}!</h1>`);
    });

    //response.end("<h1>Hai</h1>");
  }
};

const server = http.createServer(requestListener);

const host = "localhost";
const port = 5000;

server.listen(port, host, () => {
  console.log(`Server berjalan pada http://${host}:${port}`);
});
