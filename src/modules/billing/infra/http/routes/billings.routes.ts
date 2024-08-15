import { Router } from 'express';
import BillingsController from '../controllers/BillingsController';

const billingsRouter = Router();
const billingsController = new BillingsController();

billingsRouter.post('/', billingsController.create);
billingsRouter.post('/send/email/', billingsController.sendEmailBilling);

export default billingsRouter;

