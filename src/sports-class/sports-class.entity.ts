import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}
