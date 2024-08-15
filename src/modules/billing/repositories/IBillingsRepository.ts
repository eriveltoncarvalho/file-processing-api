import Billing from '../infra/typeorm/entities/Billing';
import ICreateBillingDTO from '../dtos/ICreateBillingDTO';

export default interface IBillingsRepository {
  create(data: ICreateBillingDTO): Promise<Billing[]>;
  updateSendEmail(ids: string[]): Promise<object>;
  find(ids: string[]): Promise<Billing[]>;
  findAllSendEmail(): Promise<Billing[]>;

}
