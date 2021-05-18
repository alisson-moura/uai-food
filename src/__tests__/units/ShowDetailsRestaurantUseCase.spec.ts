import { Restaurant } from "modules/restaurants/infra/typeorm/entities/Restaurant"
import { ShowDetailsRestaurantUseCase } from "../../modules/restaurants/useCases/ShowDetailsRestaurant"
import { Fake_RestaurantsRepository } from "../../modules/restaurants/repositories/fake-repositories/Fake_RestaurantsRepository"
import { I_RestaurantsRepository } from "../../modules/restaurants/repositories/I_RestaurantsRepository"
import { AppError } from "../../providers/AppError"

let restaurantsRepository: I_RestaurantsRepository
let showDetailsRestaurantUseCase: ShowDetailsRestaurantUseCase
let restaurant01: Restaurant

describe('Teste unitário de exibição de detalhes de um Restaurante', () => {
    beforeEach(async () => {
        restaurantsRepository = new Fake_RestaurantsRepository()
        showDetailsRestaurantUseCase = new ShowDetailsRestaurantUseCase(restaurantsRepository)
        restaurant01 = await restaurantsRepository.create({
            city: "A valid city",
            number: "1572",
            name: "Restaurant 01",
            street: 'A valid street',
            uf: "AA",
            cnpj: 'valid cnpj 1',
            type_food: 'italian',
            open_on_weekends: false,
            close_hours: "18:00",
            open_hours: "08:00",
            owner_id: 'fake_user_uuid'
        })
    })

    test('Deve ser possível exibir os detalhes de um  restaurante válido', async () => {
        const restaurant = await showDetailsRestaurantUseCase.execute(restaurant01.id)
        expect(restaurant).toHaveProperty('id')
        expect(restaurant.owner_id).toBe(restaurant01.owner_id)
    })

    test('Não deve ser possível exibir os detalhes de um restaurante inexistente', async () => {
        await expect(showDetailsRestaurantUseCase.execute('invalid_id')).rejects.toEqual(new AppError('This restaurant not found.', 404))
    })
})