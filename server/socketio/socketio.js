import Chat from '../models/chat.model';
import Discussion from '../models/discussion.model';

export default io => {
  io.on ('connection', socket => {
    console.log ('Client connected');

    socket.on ('joinRoom', roomId => {
      console.log (`Socket ${socket.id} join room`);
      socket.join (roomId);
    });

    socket.on ('messageToServer', message => {
      const roomId = Object.keys (socket.rooms)[1];

      const chat = new Chat (message);

      chat.populate ('createdBy', 'name').execPopulate ();
      chat.save ().then (doc => {
        Discussion.findById (roomId)
          .update ({$push: {chats: doc._id}})
          .then (() => {
            io.to (roomId).emit ('messageToClients', doc);
          });
      });
    });
  });
};
