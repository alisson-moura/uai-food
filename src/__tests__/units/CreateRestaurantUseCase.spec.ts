import { Fake_RestaurantsRepository } from "../../modules/restaurants/repositories/fake-repositories/Fake_RestaurantsRepository"
import { I_RestaurantsRepository } from "../../modules/restaurants/repositories/I_RestaurantsRepositories"
import { CreateRestaurantUseCase } from "../../modules/restaurants/useCases/CreateRestarauntUseCase"
import { AppError } from "../../providers/AppError"

let restaurantsRepository: I_RestaurantsRepository
let createRestaurant: CreateRestaurantUseCase
let fake_userId: string
let valid_restaurant = {
    city: "A valid city",
    number: "1572",
    name: "Valid name",
    street: 'A valid street',
    uf: "AA",
    cnpj: 'valid cnpj',
    type_food: 'italian',
    open_on_weekends: false,
    close_hour: "18:00",
    open_hour: "08:00",
}

describe('Teste unitário de criação de Restaurantes', () => {
    beforeEach(async () => {
        restaurantsRepository = new Fake_RestaurantsRepository()
        createRestaurant = new CreateRestaurantUseCase(restaurantsRepository)
        fake_userId = 'a_fake_user_uuid'
    })

    test('Deve ser possível criar um restaurante', async () => {
        const restaurant = await createRestaurant.execute({ ...valid_restaurant, owner_id: fake_userId })
        expect(restaurant).toHaveProperty('id')
        expect(restaurant.name).toBe('Valid name')
    })

    test('Não deve ser possivel criar um restaurante com um nome já existente', async () => {
        const restaurant = await createRestaurant.execute({ ...valid_restaurant, owner_id: fake_userId })
        await expect(createRestaurant.execute({ ...valid_restaurant, cnpj: 'other cnpj', owner_id: fake_userId }))
            .rejects.toEqual(new AppError('There is already a restaurant with this name', 409))
    })

    test('Não deve ser possivel criar um restaurante com um cnpj já existente', async () => {
        const restaurant = await createRestaurant.execute({ ...valid_restaurant, owner_id: fake_userId })
        await expect(createRestaurant.execute({ ...valid_restaurant, name: 'other name', owner_id: fake_userId }))
            .rejects.toEqual(new AppError('There is already a restaurant with this cnpj', 409))
    })
})