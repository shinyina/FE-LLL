const fs = require('fs')
const http = require('http')

 export function runServer() {
    var server = http.createServer()

    server.on("request", function (req, res) {
        res.setHeader("Content-Type", "text/html; charset=utf-8");
        let url = './public/' + req.url
        if (req.url === '/')
            url = './public/index.html'
        fs.readFile(url, (err, data) => {
                res.end(data)
        })
    });

    server.listen(1337, '127.0.0.1');

    console.log('Server running at http://127.0.0.1:1337/');
}