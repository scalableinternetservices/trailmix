import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'
import { User as GraphqlUser, UserType } from '../graphql/schema.types'
import { Comment } from './Comment'
import { Hike } from './Hike'

@Entity()
export class User extends BaseEntity implements GraphqlUser {
  __typename?: 'User' | undefined
  @PrimaryGeneratedColumn()
  id: number

  @CreateDateColumn()
  timeCreated: Date

  @UpdateDateColumn()
  timeUpdated: Date

  @Column({
    length: 100,
  })
  email: string

  @Column({
    type: 'enum',
    enum: UserType,
    default: UserType.User,
  })
  userType: UserType

  @Column({
    length: 100,
    nullable: true,
  })
  name: string

  @OneToMany(() => Comment, comment => comment.user, { lazy: true })
  comment: Comment[]

  @ManyToMany(() => Hike, hike => hike.id, { eager: true })
  @JoinTable()
  favorites: Hike[]
}
