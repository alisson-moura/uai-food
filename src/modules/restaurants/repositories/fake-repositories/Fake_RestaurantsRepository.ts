import crypto from 'crypto'
import ItemsRepository from 'modules/restaurants/infra/typeorm/repositories/ItemsRepository'
import { Restaurant } from '../../infra/typeorm/entities/Restaurant'
import { I_FindRestaurants, I_Restaurant, I_RestaurantsRepository } from '../I_RestaurantsRepository'
import { Fake_ItemsRepository } from './Fake_ItemsRepository'

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

  async find({ city, food, item }: I_FindRestaurants): Promise<Restaurant[]> {
    if (!city && !food && !item) {
      return this.restaurants
    }

    let restaurants = []
    if (city) {
      let result = this.restaurants.filter(restaurant => restaurant.city === city)
      restaurants.concat(result)
    }
    if (food) {
      let result = this.restaurants.filter(restaurant => restaurant.type_food === food)
      restaurants.concat(result)
    }
    if (item) {
      const itemsRepository = new Fake_ItemsRepository()
      const items = await itemsRepository.findByName(item)
      const result = this.restaurants.filter(restaurant => {
        return items.map(item => {
          if (item.restaurant_id === restaurant.id) return restaurant
          
          return
        })
      })
      restaurants.concat(result)
    }

    return restaurants
  }
}
export { Fake_RestaurantsRepository }