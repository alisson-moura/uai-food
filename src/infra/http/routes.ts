import { Router } from 'express'
import { accountsRouter } from '../../modules/accounts/infra/http/accounts.routes'

const routes = Router()

routes.use('/accounts', accountsRouter)

export { routes }