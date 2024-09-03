import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../user/user.entity';

@Entity()
export class SportsClass {
  @PrimaryGeneratedColumn()
  id: number;
  @Column('text', { nullable: false })
  name: string;
  @Column('text', { nullable: true })
  weekSchedule: string;
  @Column('text', { nullable: true })
  classDuration: string;
  @Column('text', { nullable: true })
  description: string;
  @ManyToMany(() => User, { eager: true })
  @JoinTable()
  users: User[];
}
