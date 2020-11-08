import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm'

@Entity()
export class zip_code extends BaseEntity {
  // @PrimaryGeneratedColumn()
  // id: number

  @PrimaryColumn()
  zipcode: number

  @Column('float')
  lat: number

  @Column('float')
  lon: number
}
