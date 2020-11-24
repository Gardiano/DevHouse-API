
import express from 'express';
import routes from './routes';
import path from 'path';
// chamando DB
import mongoose from 'mongoose';
import cors from 'cors';

// mongoose connect 
const usuario = 'devhouse'
const pw = "devhouse";

class App {
  constructor() {
    // criando servidor;
    this.server = express();

    // conectando DB;
    mongoose.connect(
      `mongodb+srv://devhouse:${pw}@nodeexpress.hkt1q.mongodb.net/devhouse?retryWrites=true&w=majority`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );

    this.middlewares();
    this.routes();
  }

  // tratamento de requisições;
  middlewares() {
    this.server.use( cors() );

    // url virtual de imagem.
    this.server.use(
      '/files',
      express.static(path.resolve(__dirname, '..', 'uploads'))
    );
    
    // cfg json;
    this.server.use(express.json());
  }

  // endPoints;
  routes() {
    // cfg rotas;
    this.server.use(routes);
  }
}

export default new App().server;
