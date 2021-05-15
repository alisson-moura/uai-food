import { AppError } from "../../../providers/AppError"
import { I_RestaurantsRepository, I_Restaurant } from "../repositories/I_RestaurantsRepositories"

class CreateRestaurantUseCase {
    private restaurantsRepository: I_RestaurantsRepository

    constructor(restaurantsRepository: I_RestaurantsRepository) {
        this.restaurantsRepository = restaurantsRepository
    }

    async execute({
        city,
        close_hours,
        cnpj,
        type_food,
        description,
        number,
        open_hours,
        open_on_weekends,
        street,
        uf,
        name,
        owner_id
    }: I_Restaurant) {
        let restaurantExists = await this.restaurantsRepository.findOne('name', name)
        if (restaurantExists)
            throw new AppError('There is already a restaurant with this name', 409)

        restaurantExists = await this.restaurantsRepository.findOne('cnpj', cnpj)
        if (restaurantExists)
            throw new AppError('There is already a restaurant with this cnpj', 409)

        const restaurant = await this.restaurantsRepository.create({
            owner_id,
            city,
            close_hours,
            cnpj,
            type_food,
            description,
            number,
            open_hours,
            open_on_weekends,
            street,
            uf,
            name
        })

        return restaurant
    }
}

export { CreateRestaurantUseCase }