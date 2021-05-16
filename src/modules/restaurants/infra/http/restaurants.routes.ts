import { Router } from 'express'
import authMiddleware from '../../../../infra/http/middlewares/authMiddleware'
import ItemsController from './controllers/ItemsController'
import RestaurantsController from './controllers/RestaurantsController'

const restaurantsRouter = Router()

restaurantsRouter.post('/', authMiddleware, RestaurantsController.create)
restaurantsRouter.post('/:restaurant_id', authMiddleware, ItemsController.create)

export { restaurantsRouter }