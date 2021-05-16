import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { Restaurant } from "./Restaurant"

@Entity('items')
class Item {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @ManyToOne(() => Restaurant)
    @JoinColumn({ name: 'restaurant_id' })
    restaurant: Restaurant

    @Column({ name: 'restaurant_id' })
    restaurant_id: string

    @Column()
    name: string

    @Column('decimal')
    price: number

    @Column('decimal')
    weight: number

    @Column("varchar",{array: true})
    ingredients?: string[]

    @Column()
    description?: string
}

export { Item }