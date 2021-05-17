import { User } from "../../../../../modules/accounts/infra/typeorm/entities/User"
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, JoinTable, OneToMany } from "typeorm"
import Joi from "joi"
import { Item } from "./Item"

@Entity('restaurants')
class Restaurant {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @ManyToOne(() => User)
  @JoinColumn({name: 'owner_id'})
  owner: User

  @Column()
  owner_id: string

  @Column()
  name: string

  @Column()
  cnpj: string

  @Column()
  city: string

  @Column()
  number: string

  @Column()
  street: string

  @Column()
  uf: string

  @Column()
  description?: string

  @Column()
  banner_url?: string

  @Column()
  type_food: string

  @Column()
  open_hours: string

  @Column()
  close_hours: string

  @Column('boolean')
  open_on_weekends: boolean

  @OneToMany(() => Item, item => item.restaurant)
  items: Item[]
}

export { Restaurant }