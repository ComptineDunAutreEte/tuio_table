import io from 'socket.io-client';

const socketIOUrl = 'http://localhost:4000/';
// const socketIOUrl = 'http://eeriel.fr:4000/';

// const socketIOUrl = 'http://192.168.1.30:4000/';

// const socketIOUrl = 'https://server-app-tablet.herokuapp.com/';

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
    console.log('send ', chanel, _data);
    socketServer.emit(chanel, message);
}

send('login', 'login');

export default { getSocket, send };