import { injectable ,inject, autoInjectable } from 'tsyringe';
import IBillingsRepository from '../repositories/IBillingsRepository';

import * as fs from 'fs';
import parse, * as csv from 'csv-parser';
import path from 'path';
import AppError from '@shared/errors/AppError';

const { readdir } = fs.promises;

interface IBilling {
  name: string;
  governmentId: number;
  email: string;
  debtAmount: number;
  debtDueDate: Date;
  debtId: string;
}

@injectable()
class CreateBillingService {
  constructor(
    @inject('BillingsRepository')
    private billingsRepository: IBillingsRepository,
  ) {
  }

  public async execute(): Promise<any> {
    let accountants = {
      totalRecords: 0,
      totalAdded: 0
    };

    let currentFile = '';

    async function getRecords(): Promise<IBilling[]> {
      const records: IBilling[] = [];

      const files = (await readdir(path.resolve(__dirname,'../../../../tmp/files/billing')))
          .filter(item => (!!~item.indexOf('.csv')));

      if (files[0] != undefined) {
        currentFile = files[0];
        return new Promise(resolve => {
          fs.createReadStream(path.resolve(__dirname,`../../../../tmp/files/billing/${files[0]}`))
          .pipe(parse())
          .on('data', (data: IBilling) => records.push(data))
          .on('end', () => {
            resolve(records);

            currentFile = currentFile.replace('.csv', '') + new Date().getTime()+'.csv';
            fs.copyFileSync(path.resolve(__dirname,`../../../../tmp/files/billing/${files[0]}`),
                            path.resolve(__dirname,`../../../../tmp/files/send/${currentFile}`));
            fs.unlinkSync(path.resolve(__dirname,`../../../../tmp/files/billing/${files[0]}`));
          });
        });
      } else {
        return [];
      }
    }

    const validateRecords = async(currentRecords: IBilling[]): Promise<IBilling[]> => {
      const recordsIds: string[] = [];
      let size = currentRecords.length > 10000 ? 10000 : currentRecords.length;

      for (let countRecords=0; countRecords < currentRecords.length;) {
        const records = (await this.billingsRepository.find(currentRecords.map(obj => obj.debtId).slice(countRecords, countRecords + size))).map(item => item.debtId);
        countRecords += size;
        recordsIds.push(...records);
      }

      const idsParaRemoverSet = new Set(recordsIds);
      return currentRecords.filter(obj => !idsParaRemoverSet.has(obj.debtId));
    }

    try {
      for (let countFile = 1; countFile > 0;) {
        const registers = await getRecords();
        countFile = registers.length;

        if (countFile > 0) {
          let newRecords: IBilling[] = [];
          accountants.totalRecords = registers.length;
          newRecords = await validateRecords(registers);

          if (newRecords.length > 0) {
            let size = newRecords.length > 10000 ? 10000 : newRecords.length;
            for (let countRegisters= 0; countRegisters < newRecords.length;) {
              console.log('slice::: ', countRegisters,' - ', countRegisters + size)
              const result = await this.billingsRepository.create({billings: newRecords.slice(countRegisters, countRegisters + size)});
              countRegisters += size;
              accountants.totalAdded += result.filter(obj => obj['created_at'] != undefined).length;
            }
          } else {
            accountants.totalRecords = 0;
            accountants.totalAdded = 0;
            return accountants;
          }
        }
      }

      console.log('return:: ', accountants);
      return accountants;
    } catch (err) {
      if (currentFile) {
        fs.writeFileSync(path.resolve(__dirname,`../../../../tmp/files/error/file_error_${currentFile}`), JSON.stringify(err));
        fs.copyFileSync(path.resolve(__dirname,`../../../../tmp/files/send/${currentFile}`),
                        path.resolve(__dirname,`../../../../tmp/files/fileWithError/${currentFile}`));
        fs.unlinkSync(path.resolve(__dirname,`../../../../tmp/files/send/${currentFile}`));

        console.log('return:: ', accountants);
        return accountants;
      }
    }
  }

  public async sendEmailBilling(): Promise<any> {
    try {
      let accountants = {
        totalEmailsSend: 0,
      };

      const ids = (await this.billingsRepository.findAllSendEmail()).map(item => item.debtId);
      let size = ids.length > 10000 ? 10000 : ids.length;

      for (let countRegisters= 0; countRegisters < ids.length;) {

        //local for implementation the service of send email

        const updateResult = await this.billingsRepository.updateSendEmail(ids.slice(countRegisters, countRegisters + size));
        countRegisters += size;
        accountants.totalEmailsSend += JSON.parse(JSON.stringify(updateResult)).affected;
      }

      console.log('return:: ', accountants);
      return accountants;

    } catch (err) {
       new AppError('Error sending email: ' + err , 504);
    }
  }
}

export default CreateBillingService;
