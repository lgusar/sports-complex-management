import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Role } from '../role/role.enum';
import { User } from '../user/user.entity';

@Entity()
export class LoginDetail {
  @PrimaryGeneratedColumn()
  id?: number;
  @Column('text', { nullable: false })
  email: string;
  @Column('text', { nullable: false })
  passwordHash: string;
  @Column('text', { nullable: false })
  salt: string;
  @Column('text', { nullable: false })
  role: Role;
  @OneToOne(() => User, {
    onDelete: 'CASCADE',
    eager: true,
  })
  @JoinColumn()
  user: User;
}
