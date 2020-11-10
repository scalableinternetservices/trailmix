import { BaseEntity, Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm'
import { Hike } from './Hike'
import { User } from './User'

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

  @ManyToOne(() => User, user => user.comment)
  user: User

  @ManyToOne(() => Hike, hike => hike.comment)
  hike: Hike

  @Column('integer')
  likes: number
}
