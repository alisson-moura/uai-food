import { Restaurant } from "modules/restaurants/infra/typeorm/entities/Restaurant"
import { Fake_RestaurantsRepository } from "../../modules/restaurants/repositories/fake-repositories/Fake_RestaurantsRepository"
import { I_RestaurantsRepository } from "../../modules/restaurants/repositories/I_RestaurantsRepository"
import { ListRestaurantsUseCase } from "../../modules/restaurants/useCases/ListRestaurantsUseCase"

let restaurantsRepository: I_RestaurantsRepository
let listRestaurantsUseCase: ListRestaurantsUseCase
let restaurant01: Restaurant
let restaurant02: Restaurant

describe('Teste unitário de listagem de Restaurantes', () => {
    beforeEach(async () => {
        restaurantsRepository = new Fake_RestaurantsRepository()
        listRestaurantsUseCase = new ListRestaurantsUseCase(restaurantsRepository)
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

        restaurant01 = await restaurantsRepository.create({
            city: "A valid city",
            number: "1572",
            name: "Restaurant 02",
            street: 'A valid street',
            uf: "AA",
            cnpj: 'valid cnpj 2',
            type_food: 'italian',
            open_on_weekends: false,
            close_hours: "18:00",
            open_hours: "08:00",
            owner_id: 'fake_user_uuid'
        })
    })

    test('Deve ser possível listar os restaurantes disponiveis', async () => {
        const restaurants = await listRestaurantsUseCase.execute({})
        expect(restaurants.length).toBe(2)
    })
})