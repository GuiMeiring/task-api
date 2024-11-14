import {server} from './server/Server';

// Iniciar servidor

let port =3000;

if (process.env.PORT) {
    port = Number(process.env.PORT);
  }

server.listen(port, '0.0.0.0', () => console.log('Express is listen on ' + port));
