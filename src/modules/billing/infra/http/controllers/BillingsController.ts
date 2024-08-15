import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateBillingService from '@modules/billing/services/CreateBillingService';

export default class BillingsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const createBillingService = container.resolve(CreateBillingService);
    const billing = await createBillingService.execute();

    return response.json(billing);
  }

  public async sendEmailBilling(request: Request, response: Response): Promise<Response> {
    const createBillingService = container.resolve(CreateBillingService);
    const billing = await createBillingService.sendEmailBilling();

    return response.json(billing);
  }
}
