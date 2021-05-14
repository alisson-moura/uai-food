import { AppError } from "../../../providers/AppError"
import { I_RestaurantsRepository, I_Restaurant } from "../repositories/I_RestaurantsRepositories"

class CreateRestaurantUseCase {
    private restaurantsRepository: I_RestaurantsRepository

    constructor(restaurantsRepository: I_RestaurantsRepository) {
        this.restaurantsRepository = restaurantsRepository
    }

    async execute({
        city,
        close_hour,
        cnpj,
        culinary,
        description,
        number,
        open_hour,
        open_onWeekends,
        street,
        uf,
        name
    }: I_Restaurant, owner_id: string) {
        let restaurantExists = await this.restaurantsRepository.findByName(name)
        if (restaurantExists)
            throw new AppError('There is already a restaurant with this name', 409)

        restaurantExists = await this.restaurantsRepository.findByCnpj(cnpj)
        if (restaurantExists)
            throw new AppError('There is already a restaurant with this cnpj', 409)

        const restaurant = await this.restaurantsRepository.create({
            owner_id,
            city,
            close_hour,
            cnpj,
            culinary,
            description,
            number,
            open_hour,
            open_onWeekends,
            street,
            uf,
            name
        })

        return restaurant
    }
}

export { CreateRestaurantUseCase }