import { container } from 'tsyringe';

import IBillingsRepository from '@modules/billing/repositories/IBillingsRepository';
import BillingsRepository from '@modules/billing/infra/typeorm/repositories/BillingsRepository';


container.registerSingleton<IBillingsRepository> (
  'BillingsRepository',
  BillingsRepository
)

