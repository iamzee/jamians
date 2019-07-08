import EventDiscussion from '../models/eventDiscussion';
import EventDiscussionComment from '../models/eventDiscussionComment';

export default io => {
  io.of ('/events').on ('connection', nsSocket => {
    console.log ('SOCKET CONNECTED');

    nsSocket.on ('loadDiscussion', async eventId => {
      console.log (eventId);

      const discussions = await EventDiscussion.find ({
        event: eventId,
      })
        .sort ('-createdAt')
        .populate ('createdBy', 'name');

      nsSocket.emit ('discussions', discussions);
    });

    nsSocket.on ('discussionToServer', discussion => {
      io.of ('/events').emit ('discussionToClients', discussion);
    });

    nsSocket.on ('joinDiscussion', async discussion => {
      nsSocket.join (discussion._id.toString ());
      console.log ('COMEONE JOINED ROOM', discussion._id);

      try {
        const matchedDiscussion = await EventDiscussion.findOne ({
          _id: discussion._id,
          event: discussion.event,
        });

        if (!matchedDiscussion) {
          // return res.status (400).send ();
          console.log ('DISCUSSION NOT FOUND');
        }

        const comments = await EventDiscussionComment.find ({
          discussion: discussion._id,
        })
          .populate ('createdBy', 'name')
          .populate ('event', 'createdBy');
        nsSocket.emit ('comments', comments);
      } catch (e) {
        // res.status (400).send (e);
        console.log (e);
      }
    });

    nsSocket.on ('commentToServer', comment => {
      const roomTitle = Object.keys (nsSocket.rooms)[1];
      console.log ('ROOOM TITLE', roomTitle);

      io.of ('/events').emit ('commentToClients', comment);
    });
  });
};
