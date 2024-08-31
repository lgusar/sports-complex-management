import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class SportsClass {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  weekSchedule: string;
  @Column()
  classDuration: string;
  @Column()
  description: string;
}
