import { I_FindRestaurants, I_RestaurantsRepository } from "../repositories/I_RestaurantsRepository"

class ListRestaurantsUseCase {
    private restaurantsRepository: I_RestaurantsRepository
    constructor(
        restaurantsRepository: I_RestaurantsRepository,
    ) {
        this.restaurantsRepository = restaurantsRepository
    }

    async execute({ city, food, item }: I_FindRestaurants) {
        const restaurants = await this.restaurantsRepository.find({ city, food, item })
        return restaurants
    }
}

export { ListRestaurantsUseCase }