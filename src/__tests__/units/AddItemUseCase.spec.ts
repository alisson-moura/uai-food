import { Fake_ItemsRepository } from "../../modules/restaurants/repositories/fake-repositories/Fake_ItemsRepository"
import { I_ItemsRepository } from "../../modules/restaurants/repositories/I_ItemsRepository"
import { Fake_RestaurantsRepository } from "../../modules/restaurants/repositories/fake-repositories/Fake_RestaurantsRepository"
import { I_RestaurantsRepository } from "../../modules/restaurants/repositories/I_RestaurantsRepository"
import { CreateRestaurantUseCase } from "../../modules/restaurants/useCases/CreateRestarauntUseCase"
import { AppError } from "../../providers/AppError"
import { Restaurant } from "../../modules/restaurants/infra/typeorm/entities/Restaurant"
import { Item } from "../../modules/restaurants/infra/typeorm/entities/Item"
import { AddItemUseCase } from "../../modules/restaurants/useCases/AddItemUseCase"
import { expression } from "joi"
import FormatMoney from "../../providers/FormatMoney/FormatMoney"
import { I_FormatMoney } from "providers/FormatMoney/I_FormatMoney"

let restaurantsRepository: I_RestaurantsRepository
let itemsRepository: I_ItemsRepository
let formatMoney: I_FormatMoney
let addItemUse: AddItemUseCase
let restaurant01: Restaurant
let restaurant02: Restaurant


describe('Teste unitário de adição de Items a um restaurante', () => {
    beforeEach(async () => {
        restaurantsRepository = new Fake_RestaurantsRepository()
        itemsRepository = new Fake_ItemsRepository()
        formatMoney = FormatMoney

        addItemUse = new AddItemUseCase(itemsRepository, restaurantsRepository, formatMoney)

        restaurant01 = await restaurantsRepository.create({
            city: "A valid city",
            number: "1572",
            name: "Restaurant 01",
            street: 'A valid street',
            uf: "AA",
            cnpj: 'valid cnpj',
            type_food: 'italian',
            open_on_weekends: false,
            close_hours: "18:00",
            open_hours: "08:00",
            owner_id: 'fake_user_uuid_01'
        })

        restaurant02 = await restaurantsRepository.create({
            city: "A valid city",
            number: "1572",
            name: "Restaurant 02",
            street: 'A valid street',
            uf: "AA",
            cnpj: 'valid cnpj',
            type_food: 'italian',
            open_on_weekends: false,
            close_hours: "18:00",
            open_hours: "08:00",
            owner_id: "fake_user_uuid_02"
        })

    })

    test('Deve ser possivel criar um item para um restaurant válido', async () => {
        const item = await addItemUse.execute({
            name: "Valid item",
            price: 15.90,
            restaurant_id: restaurant01.id,
            weight: 250,
            ingredients: ['ingrediente01', 'ingrediente02', 'ingrediente03'],
            user_id: 'fake_user_uuid_01'
        })

        const itemInRepository = await itemsRepository.findByNameAndRestaurant(item.name, item.restaurant_id)
        
        expect(item).toHaveProperty('id')
        expect(item.name).toBe('Valid item')
        expect(item.price).toBe('R$ 15,90')
        expect(itemInRepository.price).toBe(1590)
    })

    test('Não deve ser possivel criar um item para um restaurante que não pertence ao usuário solicitante',
        async () => {
            await expect(addItemUse.execute({
                name: "Valid item",
                price: 15.90,
                restaurant_id: restaurant01.id,
                weight: 250,
                ingredients: ['ingrediente01', 'ingrediente02', 'ingrediente03'],
                user_id: 'fake_user_uuid_02'
            })).rejects.toEqual(new AppError('This restaurant does not belong to this user.', 403))
        })

    test("Não deve ser possivel criar um item para um restaurante inválido/inexistente", async () => {
        await expect(addItemUse.execute({
            name: "Valid item",
            price: 15.90,
            restaurant_id: 'invalid_restaurant_uuid',
            weight: 250,
            ingredients: ['ingrediente01', 'ingrediente02', 'ingrediente03'],
            user_id: 'fake_user_uuid_02'
        })).rejects.toEqual(new AppError('This restaurant not found.', 404))
    })

    test('Não deve ser possivel criar dois items com o mesmo nome para o mesmo restaurante', async () => {
        await addItemUse.execute({
            name: "Valid item",
            price: 15.90,
            restaurant_id: restaurant01.id,
            weight: 250,
            ingredients: ['ingrediente01', 'ingrediente02', 'ingrediente03'],
            user_id: 'fake_user_uuid_01'
        })
        expect(addItemUse.execute({
            name: "Valid item",
            price: 15.90,
            restaurant_id: restaurant01.id,
            weight: 250,
            ingredients: ['ingrediente01', 'ingrediente02', 'ingrediente03'],
            user_id: 'fake_user_uuid_01'
        })).rejects.toEqual(new AppError('In this restaurant there is already an item with this name.', 409))
    })
})