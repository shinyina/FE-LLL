const fs = require('fs')
const http = require('http')

export function runServer() {
    var server = http.createServer()
    server.on('request', (req, res) => {
        res.setHeader('Content-Type', 'text/html,utf-8')
        var url = './public/' + req.url
        if (req.url === '/')
            url = './public/index.html'
        let rs=fs.createReadStream(url)
        rs.pipe(res)
    })

    server.listen(1337, '127.0.0.1')

    console.log('Server run at http://127.0.0.1:1337');
}