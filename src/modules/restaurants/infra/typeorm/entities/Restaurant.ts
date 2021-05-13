class Restaurant {
  id: string
  owner_id: string
  name: string
  cnpj: string
  city: string
  number: string
  street: string
  uf: string
  description: string
  banner_url: string
  culinary: string
  open_hour: Date
  close_hour: Date
  open_onWeekends: boolean
  created_at: Date
}

export { Restaurant }