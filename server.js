require('dotenv').config({ path: '.env.local' }); 
                                                  
const { createServer } = require('http');
const { parse } = require('url');                   
const next = require('next');
const { Server } = require('socket.io');
const {fetchUserRooms} = require('./src/lib/db/rooms')
const postgres = require('postgres')
const sql = postgres(process.env.POSTGRES_URL, { ssl: 'require' });

const dev = process.env.NODE_ENV !== 'production';
const hostname = 'localhost';
const port = 3000;

const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  // 1️⃣ Create HTTP server
  const httpServer = createServer(async (req, res) => {
    try {
      const parsedUrl = parse(req.url, true);
      await handle(req, res, parsedUrl);                    
    } catch (err) {
      console.error('Error occurred handling', req.url, err);
      res.statusCode = 500;
      res.end('internal server error');
    }
  });

  // 2️⃣ Initialize Socket.IO server
  const io = new Server(httpServer, {
    cors: {
      origin: dev ? 'http://localhost:3000' : 'https://yourdomain.com',           
      credentials: true,
    },
  });

  // 3️⃣ Authentication middleware
  io.use((socket, next) => {
    const token = socket.handshake.auth.token;
    if (!token) return next(new Error('Authentication error'));

    try {
      socket.userId = token.id;             
      next();
      
    } catch (err) {
      next(new Error('Authentication error'));
    }
  });

  // 4️⃣ Handle connections
  io.on('connection', async (socket) => {
    console.log('User connected:', socket.userId);

    try{
      const userRooms = await (fetchUserRooms(socket.userId))
      userRooms.forEach((room)=> {
        socket.join(String(room.id))
        console.log(`user ${socket.userId} joined room ${room.id}`)
      })
    }
    catch(err){
      console.error('error joining rooms')
    }


    socket.on('addNote', async(data) => {                      //add note handler

        try {
          const { content, userID, roomID } = data
            
            // Validate data
            if (!content || !userID || !roomID) {
                socket.emit('noteAdded', {
                    success: false,
                    message: 'Missing required fields'
                })
                return
            }


            //inserting note into database
            const res = await sql`
            INSERT INTO notes(content, room_id, user_id) 
            VALUES (${content}, ${roomID}, ${userID})            
            RETURNING 
                notes.*,
                (SELECT first_name FROM users WHERE id = ${userID}) as first_name,
                (SELECT last_name FROM users WHERE id = ${userID}) as last_name,
                ${userID} as author_id  `

            const newNote = res[0]
            
            const noteData = {
                id: newNote.id,
                content: newNote.content,
                room_id: newNote.room_id,
                user_id: newNote.user_id,
                author_id: newNote.author_id,
                first_name: newNote.first_name,
                last_name: newNote.last_name,
            }

            // ✅ 1. Personal confirmation to creator (includes note data for immediate UI update)
            socket.emit('noteAdded', {
              success: true, 
              message: 'Note added successfully',
              note: noteData  // Include the note so creator can add it immediately
            })

            // ⭐️ 2. Broadcast to rest of the room (excluding the sender)
            socket.broadcast.to(String(roomID)).emit('newNote', noteData)
        }


        catch(err){
          console.error('Error adding note:', err)
          socket.emit('noteAdded', {
            success: false,
            message: 'Failed to add note. Please try again.'
        })
        }
    })



    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.userId);
    });
  });

  // 5️⃣ Start the server
  httpServer.listen(port, () => {
    console.log(`> Ready on http://${hostname}:${port}`);
  });
});