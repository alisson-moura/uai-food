import { I_FormatMoney } from "providers/FormatMoney/I_FormatMoney";
import { AppError } from "../../../providers/AppError";
import { Item } from "../infra/typeorm/entities/Item";
import { I_Item, I_ItemsRepository } from "../repositories/I_ItemsRepository";
import { I_RestaurantsRepository } from "../repositories/I_RestaurantsRepository";


class AddItemUseCase {
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
        name, price, weight, ingredients, restaurant_id, user_id,description
    }: I_Item): Promise<Item> {
        const itemExist = await this.itemsRepository.findByNameAndRestaurant(name, restaurant_id)
        if (itemExist) {
            throw new AppError('In this restaurant there is already an item with this name.', 409)
        }

        const restaurant = await this.restaurantsRepository.findOne('id', restaurant_id)
        if (!restaurant) {
            throw new AppError('This restaurant not found.', 404)
        }
        if (restaurant.owner_id != user_id) {
            throw new AppError('This restaurant does not belong to this user.', 403)
        }

        const item = await this.itemsRepository.create({
            name,
            price: this.formatMoney.formatter(price),
            restaurant_id,
            weight,
            ingredients,
            description
        })
       
        return { ...item, price: this.formatMoney.presenter(item.price) } as unknown as Item
    }

}
export { AddItemUseCase }