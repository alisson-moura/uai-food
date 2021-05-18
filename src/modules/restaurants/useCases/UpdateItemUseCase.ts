import { AppError } from "../../../providers/AppError"
import { I_FormatMoney } from "providers/FormatMoney/I_FormatMoney"
import { Item } from "../infra/typeorm/entities/Item"
import { I_ItemsRepository } from "../repositories/I_ItemsRepository"
import { I_RestaurantsRepository } from "../repositories/I_RestaurantsRepository"

interface I_Request {
    name?: string
    price?: number
    weight?: number
    ingredients?: string[],
    description?: string,
    restaurant_id: string
    user_id: string,
    id: string
}

class UpdateItemUseCase {
    private itemsRepository: I_ItemsRepository
    private restaurantsRepository: I_RestaurantsRepository
    private formatMoney: I_FormatMoney

    constructor(
        itemsRepository: I_ItemsRepository,
        restaurantsRepository: I_RestaurantsRepository,
        formatMoney: I_FormatMoney
    ) {
        this.itemsRepository = itemsRepository
        this.restaurantsRepository = restaurantsRepository
        this.formatMoney = formatMoney
    }

    async execute({
        id,
        restaurant_id,
        user_id,
        description,
        ingredients,
        name,
        price,
        weight
    }: I_Request): Promise<Item> {
        const restaurant = await this.restaurantsRepository.findOne('id', restaurant_id)
        if (!restaurant) {
            throw new AppError('This restaurant not found.', 404)
        }

        if (restaurant.owner_id != user_id) {
            throw new AppError('This restaurant does not belong to this user.', 403)
        }

        const item = await this.itemsRepository.findById(id)
        if (!item) {
            throw new AppError('This item not found.', 404)
        }
        if (item.restaurant_id != restaurant.id) {
            throw new AppError('This item does not belong to this restaurant.', 409)
        }

        if (name != item.name) {
            const itemExists = await this.itemsRepository.findByNameAndRestaurant(name, restaurant_id)
            if (itemExists) {
                throw new AppError('In this restaurant there is already an item with this name.', 409)
            }
        }


        if (price) {
            price = this.formatMoney.formatter(price)
        }

        Object.assign(item, {
            name: name ? name : item.name,
            description: description ? description : item.description,
            ingredients: ingredients ? ingredients : item.ingredients,
            price: price ? price : item.price,
            weight: weight ? weight : item.weight
        })

        const updatedItem = await this.itemsRepository.update(item)

        return { ...updatedItem, price: this.formatMoney.presenter(updatedItem.price) } as unknown as Item
    }
}

export { UpdateItemUseCase }