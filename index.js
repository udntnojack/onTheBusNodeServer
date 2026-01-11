const express = require('express');
const { WebSocketServer, WebSocket } = require('ws');

const app = express();
app.use(express.json());
const port = process.env.PORT || 8080;

const gameManager = require('./models/serverManager');
const player = require('./models/playerModel');


function onSocketPreError(e){
    console.log(e);
}

function onSocketPostError(e){
    console.log(e);
}


const s = app.listen(port, () => {
    console.log('Server started on port ' + port + '. Ctrl^c to quit.');
});

const wss = new WebSocketServer({ noServer: true});

s.on('upgrade', (req, socket, head) =>{
    socket.on('error', onSocketPreError);

    //preform auth


    wss.handleUpgrade(req, socket, head, (ws) => {
        socket.removeListener('error', onSocketPostError);
        wss.emit('connection', ws, req);
    })
});

wss.on('connection', (ws, req) =>{
    ws.on('error', onSocketPostError);
    
    ws.isAlive = true;

    ws.on('ping', () => {
        ws.isAlive = true;
    });

    ws.on('message', (data) => {
        let msg;
        console.log('message recieved');
        try {
            msg = JSON.parse(data.toString());
        } catch {
            ws.send(JSON.stringify({ error: 'Invalid JSON' }));
        return;
        }

        switch (msg.type) {
            case 'test':
                ws.send(JSON.stringify({type: 'sucess',
                    text: "connection established"
                }));
                break;
            case 'startGame':
                startGame(msg.roomCode);
                break;
            case 'ping':
                    ws.send(JSON.stringify({ type: 'pong' }));
                break; 
            case 'createRoom':
                roomCode = gameManager.createRoom();
                ws.send(JSON.stringify(
                    {
                    type: 'roomCreated',
                    text: "room created on code",
                    roomCode: roomCode
                }));
                //
                addPlayer(ws, roomCode, msg.playerName)
                break;
            case 'addPlayer':
                addPlayer(ws, msg.roomCode, msg.playerName)
                break;
            case 'getPlayers':
                broadcastPlayers(msg.roomCode);
                break;
            case 'resync':
                resync(ws, msg.roomCode);
                break;
            case 'leaveRoom':
                //handleLeaveRoom(ws, msg);
                break;
            default:
                ws.send(JSON.stringify({
                    error: 'Unknown message type',
                    type: msg.type
                }));
            }
    });

    ws.on('close', ()=>{
        console.log('connection closed');
    });
});

function startGame(){
    //gameManager.startGame(roomCode);
    gameManager.startGame(roomCode);
    const deck = gameManager.getDeck(roomCode);
    
    broadcastStart(roomCode, deck)

}

function addPlayer(ws, roomCode, playerName){
    gameManager.addPlayer(ws, roomCode, playerName);
    broadcastPlayers(roomCode);
}
function broadcastStart(roomCode, deck){
    players = gameManager.getPlayers(roomCode);

    if(players == null){
        return;
    }
    
    const playerMsg = players.map(p => ({
            name: p.name,
            roomCode: p.roomCode,
            hand: p.hand
    }))
    
    
    payload = {
        type: 'gameStart',
        text: 'starting game',
        playerMsg,
        deck
    }
    console.log("starting game")
    for (const player of players) {
        if (player.ws && player.ws.readyState === player.ws.OPEN) {
            player.ws.send(JSON.stringify(payload));
        }
    }
}


function broadcastPlayers(roomCode){
    players = gameManager.getPlayers(roomCode);

    if(players == null){
        return;
    }
    
    const playerMsg = players.map(p => ({
            name: p.name,
            roomCode: p.roomCode,
            hand: p.hand
    }))
    
    
    payload = {
        type: 'players',
        text: 'players added',
        playerMsg
    }
    console.log("broadcasting players")
    for (const player of players) {
        if (player.ws && player.ws.readyState === player.ws.OPEN) {
            player.ws.send(JSON.stringify(payload));
        }
    }
}

function resync(ws, roomCode){
    if(roomCode != ""){
        players = gameManager.getPlayers(roomCode);
        ws.send(JSON.stringify({
            type: 'players',
            text: 'players added',
            players}));

    }
}



function broadcast(data) {
    const json = JSON.stringify(data);

    wss.clients.forEach(client => {
        if (client.readyState === client.OPEN) {
            client.send(json);
        }
    });
}
