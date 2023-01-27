import { PrimaryGeneratedColumn, Column, UpdateDateColumn } from 'typeorm';

export abstract class Project {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  name: string;

  @UpdateDateColumn()
  published: boolean;

  @Column({ type: 'uuid', nullable: true })
  ownerId: string;
}
