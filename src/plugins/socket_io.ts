import VueSocketIO from 'vue-socket.io'
import SocketIO from 'socket.io-client'

const socket = new VueSocketIO({
  debug: true,
  connection: SocketIO('http://209.145.62.202:3000'),
});

export default socket;
