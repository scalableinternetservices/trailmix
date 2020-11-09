import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm'

@Entity()
export class Comment extends BaseEntity {
  @PrimaryColumn()
  id: number

  @Column('text')
  name: string

  @Column('text')
  text: string

  @Column('text')
  date: string
}
