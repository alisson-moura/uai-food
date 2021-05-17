import { Request, Response } from 'express'
import Joi from 'joi'
import { I_FindRestaurants } from '../../../repositories/I_RestaurantsRepository'
import { ListRestaurantsUseCase } from '../../../useCases/ListRestaurantsUseCase'
import { CreateRestaurantUseCase } from '../../../useCases/CreateRestarauntUseCase'
import RestaurantsRepository from '../../typeorm/repositories/RestaurantsRepository'
class RestaurantsController {

    async create(request: Request, response: Response): Promise<Response> {
        const { userId } = request

        const { error, value } = Joi.object({
            name: Joi.string().required().min(2).max(30),
            cnpj: Joi.string().required().min(14).max(14),
            city: Joi.string().required().min(2).max(30),
            street: Joi.string().required().min(2).max(30),
            number: Joi.string().required().max(6),
            uf: Joi.string().required().max(2),
            description: Joi.string().min(2).max(30).optional(),
            type_food: Joi.string().required().min(2).max(30),
            open_hours: Joi.string().required().min(5),
            close_hours: Joi.string().required().min(5),
            open_on_weekends: Joi.boolean().required(),
        }).validate(request.body)
        if (error)
            return response.status(400).json({ message: error.message })

        const createRestaurantUseCase = new CreateRestaurantUseCase(RestaurantsRepository)
        const restaurant = await createRestaurantUseCase.execute({
            ...request.body,
            owner_id: userId
        })

        return response.status(201).json(restaurant)
    }

    async index(request: Request, response: Response): Promise<Response> {
        const { city, food, item } = request.query

        const listRestaurantsUseCase = new ListRestaurantsUseCase(RestaurantsRepository)
        const restaurants = await listRestaurantsUseCase.execute({ city, food, item } as I_FindRestaurants)
        return response.json(restaurants)
    }
}

export default new RestaurantsController()