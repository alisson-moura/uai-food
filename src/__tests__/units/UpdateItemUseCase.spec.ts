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
import { UpdateItemUseCase } from "../../modules/restaurants/useCases/UpdateItemUseCase"

let restaurantsRepository: I_RestaurantsRepository
let itemsRepository: I_ItemsRepository
let formatMoney: I_FormatMoney
let updateItemUseCase: UpdateItemUseCase
let restaurant01: Restaurant
let restaurant02: Restaurant
let item01: Item
let item02: Item

describe('Teste unitário de atualização de um Item', () => {
    beforeEach(async () => {
        restaurantsRepository = new Fake_RestaurantsRepository()
        itemsRepository = new Fake_ItemsRepository()
        formatMoney = FormatMoney

        updateItemUseCase = new UpdateItemUseCase(itemsRepository, restaurantsRepository, formatMoney)

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
            owner_id: 'fake_user_uuid_01'
        })

        item01 = await itemsRepository.create({
            name: 'Item 01',
            price: 1590,
            restaurant_id: restaurant01.id,
            weight: 200,
            description: 'A nice food',
            ingredients: ['ingredient01', 'ingredient02']
        })

        item02 = await itemsRepository.create({
            name: 'Item 02',
            price: 1590,
            restaurant_id: restaurant01.id,
            weight: 200,
            description: 'A nice food',
            ingredients: ['ingredient01', 'ingredient02']
        })
    })

    test('Deve ser possivel atualizar um item válido', async () => {
        const updatedItem = await updateItemUseCase.execute({
            id: item01.id,
            user_id: restaurant01.owner_id,
            description: 'A nice restaurant 02',
            restaurant_id: restaurant01.id
        })

        expect(updatedItem.name).toBe('Item 01')
        expect(updatedItem.description).toBe('A nice restaurant 02')
        expect(updatedItem.weight).toBe(200)
        expect(updatedItem.price).toBe('R$ 15,90')
    })

    test('Não deve ser possivel atualizar um item de um restaurante com um usuário inválido', async () => {
        await expect(updateItemUseCase.execute({
            id: item01.id,
            user_id: 'invalid_user_uuid',
            description: 'A nice restaurant 02',
            restaurant_id: restaurant01.id
        })).rejects.toEqual(new AppError('This restaurant does not belong to this user.', 403))
    })

    test('Não deve ser possivel atualizar um item de um restaurante inexistente', async () => {
        await expect(updateItemUseCase.execute({
            id: item01.id,
            user_id: restaurant01.owner_id,
            description: 'A nice restaurant 02',
            restaurant_id: 'invalid_restaurant_uuid'
        })).rejects.toEqual(new AppError('This restaurant not found.', 404))
    })

    test('Não deve ser possivel atualizar um item que não pertence ao restaurante fornecido', async () => {
        await expect(updateItemUseCase.execute({
            id: item01.id,
            user_id: restaurant01.owner_id,
            description: 'A nice restaurant 02',
            restaurant_id: restaurant02.id
        })).rejects.toEqual(new AppError('This item does not belong to this restaurant.', 409))
    })

    test('Não deve ser possivel atualizar o nome de um item caso já exista outro com mesmo nome no restaurante ', async () => {
        await expect(updateItemUseCase.execute({
            id: item01.id,
            user_id: restaurant01.owner_id,
            description: 'A nice restaurant 02',
            restaurant_id: restaurant01.id,
            name: 'Item 02'
        })).rejects.toEqual(new AppError('In this restaurant there is already an item with this name.', 409))
    })

    test('Não deve ser possivel atualizar um item inexistente', async () => {
        await expect(updateItemUseCase.execute({
            id: 'invalid_item_id',
            user_id: restaurant01.owner_id,
            description: 'A nice restaurant 02',
            restaurant_id: restaurant01.id,
            name: 'Item 02'
        })).rejects.toEqual(new AppError('This item not found.', 404))
    })
})
