
// importando rotas do express;
import { Router } from 'express';

import multer from 'multer';
import uploadConfig from './config/upload';

// controller da aplicação
import SessionController from './controllers/SessionController';
import HousesController from './controllers/HousesController';
import DashboardController from './controllers/DashboardController';
import ReservaController from './controllers/ReservaController';

// criando rotas;
const routes = new Router();
const upload = multer(uploadConfig);

// Users;
routes.get('/sessions', SessionController.index);

routes.post('/sessions', SessionController.store);

routes.put('/sessions', SessionController.update);

routes.delete('/sessions', SessionController.destroy);

// Houses;
routes.get('/houses', HousesController.index);

routes.post('/houses', upload.single('thumbnail'), HousesController.store);

routes.put('/houses/:house_id', upload.single('thumbnail'), HousesController.update);

routes.delete('/houses', HousesController.destroy);

// Dashboard;
routes.get('/dashboard', DashboardController.show);

// reservas
routes.get('/reservas', ReservaController.index);

routes.post('/houses/:house_id/reserva', ReservaController.store);

routes.delete('/reservas/cancelar', ReservaController.destroy);


export default routes;
