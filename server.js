require('dotenv').config({ path: '.env.local' }); // to load environment variables (important to connect to db)
                                                  // next js normally automatically imports the env variables, but in this custom 
                                                  // server we have to teach him everything manually


const { createServer } = require('http');
const { parse } = require('url');                    //helps parse incoming requests
const next = require('next');
const { Server } = require('socket.io');
const {fetchUserRooms} = require('./src/lib/db/rooms')

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
      await handle(req, res, parsedUrl);                     // Let Next.js handle all normal requests
                                                             // we need to do it because we override the next js default server
                                                             //so we kinda 'reteach' it how to handle routes, apis etc
    } catch (err) {
      console.error('Error occurred handling', req.url, err);
      res.statusCode = 500;
      res.end('internal server error');
    }
  });

  // 2️⃣ Initialize Socket.IO server
  const io = new Server(httpServer, {
    cors: {
      origin: dev ? 'http://localhost:3000' : 'https://yourdomain.com',            // to be changed
      credentials: true,
    },
  });

  // 3️⃣ Authentication middleware
  io.use((socket, next) => {
    const token = socket.handshake.auth.token;
    if (!token) return next(new Error('Authentication error'));

    try {
      socket.userId = token.id;             // we need to add the token verification for better security
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
        socket.join(room.id)
        console.log(`user ${socket.userId} joined room ${room.id}`)
      })
    }
    catch(err){
      console.error('error joining rooms')
    }



    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.userId);
    });
  });

  // 5️⃣ Start the server
  httpServer.listen(port, () => {
    console.log(`> Ready on http://${hostname}:${port}`);
  });
});
