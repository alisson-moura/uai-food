import crypto from 'crypto'
import { Restaurant } from '../../infra/typeorm/entities/Restaurant'
import { I_Restaurant, I_RestaurantsRepository } from '../I_RestaurantsRepositories'

class Fake_RestaurantsRepository implements I_RestaurantsRepository {
 

  private restaurants: Restaurant[] = []

  async create({
    city,
    close_hour,
    cnpj,
    culinary,
    name,
    number,
    open_hour,
    open_onWeekends,
    street,
    uf,
    description,
    owner_id
  }: I_Restaurant): Promise<Restaurant> {
    const restaurant = new Restaurant()
    Object.assign(restaurant, {
      city,
      close_hour,
      cnpj,
      culinary,
      name,
      number,
      open_hour,
      open_onWeekends,
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

  async findByName(name: string): Promise<Restaurant> {
    const restaurant = this.restaurants.find(restaurant => restaurant.name === name)
    return restaurant
  }

  async findByCnpj(cnpj: string): Promise<Restaurant> {
    const restaurant = this.restaurants.find(restaurant => restaurant.cnpj === cnpj)
    return restaurant
  }

}
export { Fake_RestaurantsRepository }