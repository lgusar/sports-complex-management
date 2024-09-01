import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Role } from '../role/role.enum';

@Entity()
export class User {
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
}
