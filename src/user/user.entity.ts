// user.entity.ts

import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, collation: 'utf8_general_ci' })
  UserId: string;

  @Column()
  password: string;
  // Add other necessary fields

  // ...
}
