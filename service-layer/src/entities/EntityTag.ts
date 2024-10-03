import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    CreateDateColumn,
    UpdateDateColumn,
  } from 'typeorm';
  import { Tag } from './Tag';
  
  /**
   * @class EntityTag
   * @description Represents the association of tags with various entities.
   */
  @Entity('entity_tags')
  export class EntityTag {
    @PrimaryGeneratedColumn('uuid')
    id!: string;
  
    @Column({ type: 'varchar', length: 50 })
    entity_type!: string; // Type of the entity (e.g., 'task', 'project')
  
    @Column({ type: 'uuid' })
    entity_id!: string; // ID of the entity
  
    @ManyToOne(() => Tag, { eager: true })
    tag!: Tag; // Tag being associated with an entity
  
    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at!: Date;
  
    @UpdateDateColumn({
      type: 'timestamp',
      default: () => 'CURRENT_TIMESTAMP',
      onUpdate: 'CURRENT_TIMESTAMP',
    })
    updated_at!: Date;
  }