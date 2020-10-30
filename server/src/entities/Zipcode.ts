import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Zipcode extends BaseEntity implements BaseEntity {
  @PrimaryGeneratedColumn()
   zipcode: number
  @Column('float')
   lat: number
  @Column('float')
   lon: number
}