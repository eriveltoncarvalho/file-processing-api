import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
  PrimaryColumn
} from 'typeorm';

@Entity('billing')
@Index(['debtId'], { unique: true })
class Billing {
  @PrimaryColumn('uuid')
  debtId: string;

  @Column()
  name: string;

  @Column()
  governmentId: number;

  @Column()
  email: string;

  @Column()
  debtAmount: number;

  @Column('timestamp with time zone')
  debtDueDate: Date;

  @Column()
  sendEmail: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Billing;
