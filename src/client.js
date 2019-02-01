import io from 'socket.io-client';

const socketIOUrl = 'http://localhost:4000/';
const socketServer = io.connect(socketIOUrl);

function getSocket() {
    if (socketServer) {
        return socketServer;
    }
    return null;
}

function send(chanel, _data) {
    const message = {
        type: 'table',
        uuid: '',
        data: _data
    };
    console.log(chanel, _data);
    socketServer.emit(chanel, message);
}

export default { getSocket, send };