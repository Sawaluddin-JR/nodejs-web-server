//console.log("Halo kita akan belajar membuat web server");

const http = require("http");

const requestListener = (request, response) => {
  response.setHeader("Content-Type", "text/html");
  response.statusCode = 200;

  //const method = request.method;
  const { method, url } = request;

  if (url === "/") {
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

        //untuk mengubah JSON JavaScript ke JavaScript objek
        const { name } = JSON.parse(body);
        response.end(`<h1>Hai,${name}!</h1>`);
      });

      //response.end("<h1>Hai</h1>");
    }
  }

  if (url === "/about") {
  }

  //-------------------------------------------------

  if (url === "/") {
    if (method === "GET") {
      response.end("<h1>Ini adalah home page</h1>");
    } else {
      response.end(
        `<h1>Halaman tidak dapata diakses dengan${method} request</h1>`
      );
    }
  } else if (url === "/about") {
    if (method === "GET") {
      response.end("<h1>Halo !,ini adalah halaman about</h1>");
    } else if (method === "POST") {
      let body = [];

      request.on("data", (chunk) => {
        body.push(chunk);
      });

      request.on("end", () => {
        body = Buffer.concat(body).toString();
        const { name } = JSON.parse(body);
        response.end(`<h1>Halo ${name}!,ini adalah halaman about`);
      });
    } else {
      response.end(
        `<h1>Halaman tidak dapat diakses menggunakan ${method} request</h1>`
      );
    }
  } else {
    response.end("<h1>Halaman ini tidak ditemukan!</h1>");
  }
};

const server = http.createServer(requestListener);

const host = "localhost";
const port = 5000;

server.listen(port, host, () => {
  console.log(`Server berjalan pada http://${host}:${port}`);
});
