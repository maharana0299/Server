const SocketServer = require('websocket').server
const http = require('http')

const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });

    // Send back a response and end the connection
    res.end('Hello User!\n');

})
var port = process.env.PORT || 3000;
server.listen(port, () => {

    console.log("Listening on port " + port + "...")
})

wsServer = new SocketServer({ httpServer: server })

const connections = []

wsServer.on('request', (req) => {
    const connection = req.accept()
    console.log('new connection')
    connections.push(connection)

    connection.on('message', (mes) => {
        console.log(mes.toString())
        connections.forEach(element => {
            if (element != connection)
                element.sendUTF(mes.utf8Data)
        })
    })

    connection.on('close', (resCode, des) => {
        console.log('connection closed')
        connections.splice(connections.indexOf(connection), 1)
    })

})