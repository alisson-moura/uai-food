import crypto from 'crypto'
import { Item } from '../../infra/typeorm/entities/Item'
import { I_Item, I_ItemsRepository } from '../I_ItemsRepository'

class Fake_ItemsRepository implements I_ItemsRepository {
  private items: Item[] = []

  async create({
    name,
    price,
    restaurant_id,
    weight,
    ingredients,
    description
  }: I_Item): Promise<Item> {
    const item = new Item()
    Object.assign(item, {
      name,
      price,
      restaurant_id,
      description,
      weight,
      ingredients,
      id: crypto.randomBytes(16).toString("hex"),
    })
    this.items.push(item)
    return item
  }

  async findByNameAndRestaurant(name: string, restaurant_id: string): Promise<Item> {
    const item = this.items.find(item => {
      if (item.name === name && item.restaurant_id === restaurant_id)
        return item
    })
    return item
  }

}
export { Fake_ItemsRepository }