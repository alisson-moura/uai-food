import { getRepository, Repository } from "typeorm";
import { I_Item, I_ItemsRepository } from "../../../repositories/I_ItemsRepository";
import { Item } from "../entities/Item";

class ItemsRepository implements I_ItemsRepository {
    private repository: Repository<Item>

    constructor() {
        this.repository = getRepository(Item)
    }

    async create({
        name,
        price,
        restaurant_id,
        weight,
        description,
        ingredients
    }: I_Item): Promise<Item> {
        const item = this.repository.create({
            name,
            price,
            restaurant_id,
            weight,
            description,
            ingredients
        })
        await this.repository.save(item)
        return item
    }


    async findByNameAndRestaurant(name: string, restaurant_id: string): Promise<Item> {
        const item = await this.repository.findOne({
            where: {
                name,
                restaurant_id
            }
        })
        return item
    }

    async findById(id: string): Promise<I_Item> {
        const item = await this.repository.findOne({ where: { id } })
        return item
    }

    async update({
        name,
        price,
        restaurant_id,
        weight,
        description,
        ingredients
    }: I_Item): Promise<Item> {
        const item = this.repository.create({
            name,
            price,
            restaurant_id,
            weight,
            description,
            ingredients
        })
        await this.repository.save(item)
        return item
    }

}

export default new ItemsRepository()