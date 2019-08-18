const {findPlayerInDbAndCheckCookie} = require('../models/RequestModel');

var mongoose = require('mongoose');

// Connecting to the Database
mongoose.connect("mongodb://localhost/CotSdb");
let db = mongoose.connection;

// Check connection to db
db.once("open", function () {
    console.log("Connected to MongoDb for route Chess");
});

// Check for db errors
db.on("error", function (err) {

    console.log(err);
});

let rooms = [];
let connections = [];
let waitingWhites = 0
module.exports = (io) => {
    console.log("init socket.io")

    io.origins('http://213.91.132.194:3002')


    io.on('connection', (socket) => {
        console.log(socket.id + ' connected')
        connections.push(socket);

        socket.on('isWhite', (isWhite) => {
            if (isWhite) waitingWhites++
            else waitingWhites--
            socket.isWhite = isWhite;
            socket.isWaiting = true;
            let socketWithOtherColor = connections.find(c => c.isWhite !== isWhite && c.isWaiting)
            if (socketWithOtherColor) {
                createRoom([socket, socketWithOtherColor])
            }
        })

        socket.on('moveChess', (board) => {
            console.log('moving 2343')
            emitToBothOpponents(socket, 'moveOpponentChess', board)
        })

        socket.on('disconnect', (sc) => {

            let cur = connections.find(c => c.id === socket.id)
            if (socket.isWaiting) {
                if (cur.isWhite) waitingWhites--
                else waitingWhites++
            }
            else {
                let opponent = rooms.find(r => r.name === socket.tableName).sockets.find(s => s.id !== socket.id)
                opponent.emit('opponentLeft')
            }
            console.log('disconnected ' + socket.id)
            connections = connections.filter(c => c.id !== socket.id)
        })
    })
};

function createRoom(sockets) {
    let tableName = makeid(10)
    let roomData = {name: tableName, sockets: sockets}
    rooms.push(roomData)
    sockets[0].isWaiting = false;
    sockets[0].tableName = tableName;
    sockets[0].join(tableName).emit('opponent');
    sockets[1].isWaiting = false;
    sockets[1].tableName = tableName;
    sockets[1].join(tableName).emit('opponent');

    return roomData
}


function makeid(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

function emitToBothOpponents(oneOfTheSockets, eventName, data) {
    let roomData = rooms.find(r => r.sockets[0].id === oneOfTheSockets.id || r.sockets[1].id === oneOfTheSockets.id)
    roomData.sockets[0].emit(eventName, data);
    roomData.sockets[1].emit(eventName, data);
}