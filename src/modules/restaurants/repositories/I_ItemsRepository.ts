import { Item } from '../infra/typeorm/entities/Item'

interface I_Item {
    name: string
    price: number
    weight: number
    ingredients?: string[],
    restaurant_id: string
    user_id?: string,
    description?: string
    id?: string
}

interface I_ItemsRepository {
    create(data: I_Item): Promise<Item>
    findByNameAndRestaurant(name: string, restaurant_id: string): Promise<Item>
    findByName(name: string): Promise<Item[]>
    findById(id: string): Promise<I_Item>
    update(data: I_Item): Promise<Item>
}

export { I_ItemsRepository, I_Item }