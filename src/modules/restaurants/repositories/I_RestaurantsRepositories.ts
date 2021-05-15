import { Restaurant } from "../infra/typeorm/entities/Restaurant";

interface I_Restaurant {
  cnpj: string
  city: string
  number: string
  street: string
  uf: string
  description?: string
  banner_url?: string
  type_food: string
  open_hours: string
  close_hours: string
  open_on_weekends: boolean
  owner_id?: string
  id?: string,
  name: string
}

interface I_RestaurantsRepository {
  create(data: I_Restaurant): Promise<Restaurant>
  findOne(param: string, value: string): Promise<Restaurant>
}

export { I_RestaurantsRepository, I_Restaurant }