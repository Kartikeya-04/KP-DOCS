const mongoose = require('mongoose');
const express = require('express');
const http = require('http');
const app = express();
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
require('dotenv').config();
var cors = require('cors');
app.use(cors());
app.use(bodyParser.json());
const server = http.createServer(app);

const { Server } = require('socket.io');
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

const { Documents, Users } = require('./Model');

main().catch((err) => console.log(err));
console.log('start');
async function main() {
  try {
    await mongoose.connect(process.env.URL);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('MongoDB connection error:', error);
  }
}

// const io = require('socket.io')(3001, {
//   cors: {
//     origin: 'http://localhost:3000',
//     methods: ['GET', 'POST'],
//   },
// });

const defaultValue = '';

io.on('connection', (socket) => {
  socket.on('get-document', async (documentId) => {
    const document = await findOrCreateDocument(documentId);
    socket.join(documentId);
    socket.emit('load-document', document.data);

    socket.on('send-changes', (delta) => {
      socket.broadcast.to(documentId).emit('receive-changes', delta);
    });

    socket.on('save-document', async (data) => {
      await Documents.findByIdAndUpdate(documentId, { data });
    });
    // socket.on('send-req', async (d) => {
    //   var dataAll = await Documents.find({});
    //   console.log(dataAll);
    //   socket.emit('all-content', dataAll);
    // });
  });
});

async function findOrCreateDocument(id) {
  if (id == null) return;

  const document = await Documents.findById(id);
  if (document) return document;
  return await Documents.create({ _id: id, data: defaultValue });
}
app.post('/post', async (req, res) => {
  var { username, password } = req.body;
  salt = await bcrypt.genSalt(10);
  hash = await bcrypt.hash(password, salt);
  const final = Users({
    username: username,
    password: hash,
  });
  const admitted = await final.save();
  console.log('user is saved');
  res.send(admitted);
});
server.listen(3001, () => {
  console.log(' end backend');
});
