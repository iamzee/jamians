import Chat from '../models/chat.model';

export default io => {
  io.on ('connection', socket => {
    socket.on ('joinRoom', roomId => {
      socket.join (roomId);
    });

    socket.on ('messageToServer', async message => {
      const roomId = Object.keys (socket.rooms)[1];

      const chat = new Chat ({...message, discussion: roomId});

      await chat.populate ('createdBy', 'name').execPopulate ();

      await chat.save ();

      io.to (roomId).emit ('messageToClients', chat);
    });
  });
};
