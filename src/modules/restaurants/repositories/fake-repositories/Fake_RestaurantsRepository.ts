import crypto from 'crypto'
import { Restaurant } from '../../infra/typeorm/entities/Restaurant'
import { I_Restaurant, I_RestaurantsRepository } from '../I_RestaurantsRepositories'

class Fake_RestaurantsRepository implements I_RestaurantsRepository {


  private restaurants: Restaurant[] = []

  async create({
    city,
    close_hours,
    cnpj,
    type_food,
    name,
    number,
    open_hours,
    open_on_weekends,
    street,
    uf,
    description,
    owner_id
  }: I_Restaurant): Promise<Restaurant> {
    const restaurant = new Restaurant()
    Object.assign(restaurant, {
      city,
      close_hours,
      cnpj,
      type_food,
      name,
      number,
      open_hours,
      open_on_weekends,
      street,
      uf,
      description,
      owner_id,
      id: crypto.randomBytes(16).toString("hex"),
      created_at: new Date
    })
    this.restaurants.push(restaurant)
    return restaurant
  }

  async findOne(param: string, value: string): Promise<Restaurant> {
    const restaurant = this.restaurants.find(restaurant => (restaurant[param] === value))
    return restaurant
  }
}
export { Fake_RestaurantsRepository }