class Restaurant {
  id: string
  owner_id: string
  name: string
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
}

export { Restaurant }