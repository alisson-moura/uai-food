import { I_FindRestaurants, I_Restaurant, I_RestaurantsRepository } from "../../../repositories/I_RestaurantsRepository";
import { getRepository, Repository } from "typeorm";
import { Restaurant } from "../entities/Restaurant";
import { on } from "events";

class RestaurantsRepository implements I_RestaurantsRepository {
    private respository: Repository<Restaurant>

    constructor() {
        this.respository = getRepository(Restaurant)
    }

    async find({ city, food, item }: I_FindRestaurants): Promise<Restaurant[]> {
        let query = `SELECT distinct restaurants.* FROM restaurants
        left join items on (items.restaurant_id = restaurants.id)`

        if (city || food || item) {
            let q1 = city ? `restaurants.city = '${city}'` : ''
            let q2 = food ? `restaurants.type_food = '${food}'` : ''
            let q3 = item ? `items.name = '${item}'` : ''

            if (city) {
                query = `${query} 
                    WHERE ${q1}`
            }
            if (food) {
                if (!city) {
                    query = `${query}
                    WHERE ${q2}`
                } else {
                    query = `${query}
                    AND
                    ${q2}`
                }
            }
            if (item) {
                if (!food && !city) {
                    query = `${query}
                    WHERE  ${q3}`
                }
                else {
                    query = `${query} AND ${q3}`
                }
            }
        }

        const result = await this.respository.query(`${query}`)
        return result
    }

    async create({
        city,
        close_hours,
        cnpj,
        name,
        number,
        open_hours,
        open_on_weekends,
        street,
        type_food,
        uf,
        description,
        owner_id
    }: I_Restaurant): Promise<Restaurant> {
        const restaurant = this.respository.create({
            city,
            close_hours,
            cnpj,
            name,
            number,
            open_hours,
            open_on_weekends,
            street,
            type_food,
            uf,
            description,
            owner_id,
        })
        await this.respository.save(restaurant)
        return restaurant
    }

    async findOne(param: string, value: string): Promise<Restaurant> {
        const restaurant = await this.respository.findOne({
            where: {
                [param]: value
            }
        })
        return restaurant
    }
}

export default new RestaurantsRepository