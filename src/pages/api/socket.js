import { Server } from 'socket.io';

export default function SocketHandler(req, res) {
    
    if (res.socket.server.io) {
      console.log('Socket is already attached');
      return res.end();
    }
  
    const io = new Server(res.socket.server,{
        path: '/api/socket',
        addTrailingSlash: false,
        cors: {
            origin: "http://localhost:3000"
          }
    });
    res.socket.server.io = io;

    console.log('socket connected')
  
    io.on("connection", (socket) => {
      console.log(`User Connected :`, [socket.id]);

      socket.onAny((event, ...args) => {
        console.log('onAny-server: ',event, args);
      });
     
      // Triggered when a peer hits the join room button.
      socket.on("Join Room", (data) => {
        console.log('data: ',data);
        socket.join(data.poolID);
        console.log('joined ', data.userID, " to room ", data.poolID);
      })

      socket.on("Leave Room", (data) => {
        console.log('data: ',data);
        console.log('leaving room ', data.poolID);
        socket.leave(data.poolID);
        
        //socket.to().emit();
      })

      // Triggered when the person buys cells.
      socket.on('updateCells-server', (data) => {
        console.log("updateCells-server:", data.boardID, data.boughtCells)
        socket.to(data.boardID.toString()).emit('updateCells-client', data.boughtCells);
      });

  
    });


    
    return res.end();
  };