import { Router } from 'express'
import authMiddleware from '../../../../infra/http/middlewares/authMiddleware'
import ItemsController from './controllers/ItemsController'
import RestaurantsController from './controllers/RestaurantsController'

const restaurantsRouter = Router()

restaurantsRouter.post('/', authMiddleware, RestaurantsController.create)
restaurantsRouter.post('/:restaurant_id', authMiddleware, ItemsController.create)
restaurantsRouter.put('/:restaurant_id/:item_id', authMiddleware, ItemsController.update)

restaurantsRouter.get('/', RestaurantsController.index)
restaurantsRouter.get('/:restaurant_id', RestaurantsController.show)

export { restaurantsRouter }