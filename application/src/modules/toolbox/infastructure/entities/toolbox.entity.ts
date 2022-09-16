import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { ToolEntity } from './tool.entity';

@Entity({ name: 'toolboxes' })
export class ToolboxEntity {
  @Column({ name: 'created_at', nullable: false, type: 'timestamp' })
  createdAt: Date;

  @PrimaryGeneratedColumn()
  readonly id!: number;

  @Column('varchar', { nullable: false })
  name: string;

  @OneToMany(() => ToolEntity, (tool: ToolEntity) => tool.toolbox, { cascade: true })
  tools?: ToolEntity[];

  @Column({ name: 'updated_at', nullable: false, type: 'timestamp' })
  updatedAt: Date;
}
