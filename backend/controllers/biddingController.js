export default (server) => {
    const io = require('socket.io').listen(server)
    io.on('connection', function(socket){
        socket.on('join auction room', data => {
            socket.join(data.room);
        })
        socket.on('leave auction room', data => {
            socket.leave(data.room)
        })
    })
}