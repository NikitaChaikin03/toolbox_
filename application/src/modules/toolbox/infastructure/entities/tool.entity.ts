import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { ToolboxEntity } from './toolbox.entity';

@Entity({ name: 'toolbox_tools' })
export class ToolEntity {
  @Column({ name: 'created_at', nullable: false, type: 'timestamp' })
  createdAt: Date;

  @Column('text', { nullable: false })
  description: string;

  @PrimaryGeneratedColumn()
  readonly id!: number;

  @Column('varchar', { nullable: false })
  name: string;

  @JoinColumn({ name: 'toolbox_id' })
  @ManyToOne(() => ToolboxEntity, (toolbox: ToolboxEntity) => toolbox.tools)
  toolbox?: ToolboxEntity;

  @Column('integer', { name: 'toolbox_id', nullable: false })
  toolboxId: number;

  @Column({ name: 'updated_at', nullable: false, type: 'timestamp' })
  updatedAt: Date;
}
