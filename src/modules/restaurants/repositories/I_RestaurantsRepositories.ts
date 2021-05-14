import { Restaurant } from "../infra/typeorm/entities/Restaurant";

interface I_Restaurant {
  cnpj: string
  city: string
  number: string
  street: string
  uf: string
  description?: string
  banner_url?: string
  culinary: string
  open_hour: string
  close_hour: string
  open_onWeekends: boolean
  owner_id?: string
  id?: string,
  name: string
}

interface I_RestaurantsRepository {
  create(data: I_Restaurant): Promise<Restaurant>
  findByName(name: string): Promise<Restaurant>
  findByCnpj(cnpj: string): Promise<Restaurant>
}

export { I_RestaurantsRepository, I_Restaurant }