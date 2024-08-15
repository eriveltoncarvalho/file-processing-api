import { getRepository, In, Not, Raw, Repository } from 'typeorm';

import IBillingRepository from '@modules/billing/repositories/IBillingsRepository';
import ICreateBillingDTO from '@modules/billing/dtos/ICreateBillingDTO';

import Billing from '../entities/Billing';

class BillingsRepository implements IBillingRepository {
  private ormRepository: Repository<Billing>

  constructor() {
    this.ormRepository = getRepository(Billing)
  }

  public async find(ids: string[]): Promise<Billing[]> {
    const repository = getRepository(Billing);

    return await repository.find({
      where: {
        debtId: In (ids),
      }
    });
  }

  public async findAllSendEmail(): Promise<Billing[]> {
    const repository = getRepository(Billing);

    return await repository.createQueryBuilder("billing")
      .select("billing.debtId")
      .where("billing.sendEmail = false")
      .getMany();
  }

  public async updateSendEmail(ids: string[]): Promise<object> {
    const repository = getRepository(Billing);

    return await repository
      .createQueryBuilder()
      .update(Billing)
      .set({ sendEmail: true })
      .whereInIds(ids)
      .execute();
  }

  public async create({ billings }: ICreateBillingDTO): Promise<Billing[]> {
    const billing = this.ormRepository.create(billings);

    return await this.ormRepository.save(billing);
  }
}

export default BillingsRepository;
