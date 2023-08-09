import { io } from 'socket.io-client';

// "undefined" means the URL will be computed from the `window.location` object
//const URL = process.env.NODE_ENV === 'production' ? undefined : 'http://localhost:3000';

export const socket = io('http://localhost:3000', { path: '/api/socket'}); //{ path: '/api/socket'}

socket.onAny((event, ...args) => {
    console.log('onAny-client: ',event, args);
    console.log('  -socket: ',socket.id);
  });