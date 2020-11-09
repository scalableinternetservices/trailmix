import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm'

@Entity()
export class Hike extends BaseEntity {
  @PrimaryColumn()
  id: number

  @Column('text')
  name: string

  @Column('text')
  summary: string

  @Column('float')
  stars: number

  @Column('text')
  difficulty: string

  @Column('text')
  location: string

  @Column('float')
  length: number
}
