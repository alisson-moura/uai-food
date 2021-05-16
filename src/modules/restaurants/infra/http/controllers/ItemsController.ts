import { Request, Response } from 'express'
import Joi from 'joi'
import { AddItemUseCase } from '../../../useCases/AddItemUseCase'
import RestaurantsRepository from '../../typeorm/repositories/RestaurantsRepository'
import ItemsRepository from '../../typeorm/repositories/ItemsRepository'
import FormatMoney from '../../../../../providers/FormatMoney/FormatMoney'

class ItemsController {

    async create(request: Request, response: Response): Promise<Response> {
        const { userId } = request
        const { restaurant_id } = request.params

        const { error, value } = Joi.object({
            name: Joi.string().required().min(2).max(30),
            description: Joi.string().min(2).max(30).optional(),
            price: Joi.number().required().min(0.50).max(500),
            weight: Joi.number().required().min(0.50),
            ingredients: Joi.array().optional()
        }).validate(request.body)
        if (error)
            return response.status(400).json({ message: error.message })

        const addItemUseCase = new AddItemUseCase(ItemsRepository, RestaurantsRepository, FormatMoney)
        const item = await addItemUseCase.execute({
            ...request.body,
            user_id: userId,
            restaurant_id
        })

        return response.status(201).json(item)
    }
}

export default new ItemsController()