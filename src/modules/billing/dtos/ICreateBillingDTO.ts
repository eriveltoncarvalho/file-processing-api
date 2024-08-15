export default interface ICreateBillingDTO {
  billings: IBilling[]
}

interface IBilling {
  name: string;
  governmentId: number;
  email: string;
  debtAmount: number;
  debtDueDate: Date;
  debtId: string;
}
