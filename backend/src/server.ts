import http from 'http';

import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import morgan from 'morgan';

import io from './io';

const PORT = 5000;
const app = express();

app.use(cors({ credentials: true, origin: 'http://localhost:7000' }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(morgan('common'));

app.use('/assets', express.static('assets'));
app.get('/', (req, res) => {
  res.send('Hello World!');
});
app.get('/*', (req, res) => res.redirect('/'));

const server = http.createServer(app);

io.attach(server, {
  cors: {
    credentials: true,
    origin: ['http://localhost:7000'],
  },
});

server.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));
