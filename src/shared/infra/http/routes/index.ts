import { Router } from 'express';
import billingsRouter from '@modules/billing/infra/http/routes/billings.routes';

const routes = Router();

routes.use('/billing', billingsRouter);

export default routes;

