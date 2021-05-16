import { I_Restaurant, I_RestaurantsRepository } from "../../../repositories/I_RestaurantsRepository";
import { getRepository, Repository } from "typeorm";
import { Restaurant } from "../entities/Restaurant";

class RestaurantsRepository implements I_RestaurantsRepository {
    private respository: Repository<Restaurant>

    constructor() {
        this.respository = getRepository(Restaurant)
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