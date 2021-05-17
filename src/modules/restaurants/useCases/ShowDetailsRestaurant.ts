import { AppError } from "../../../providers/AppError"
import { I_FindRestaurants, I_RestaurantsRepository } from "../repositories/I_RestaurantsRepository"

class ShowDetailsRestaurantUseCase {
    private restaurantsRepository: I_RestaurantsRepository
    constructor(
        restaurantsRepository: I_RestaurantsRepository,
    ) {
        this.restaurantsRepository = restaurantsRepository
    }

    async execute(id: string) {
        const restaurants = await this.restaurantsRepository.findOne('id', id)

        if(!restaurants) {
            throw new AppError('This restaurant not found.', 404)
        }

        return restaurants
    }
}

export { ShowDetailsRestaurantUseCase }