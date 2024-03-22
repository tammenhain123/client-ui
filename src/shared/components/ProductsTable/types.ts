export interface IProduct {
  id: string
  name: string
  price: number
  description: string
  quantity: number
  image?: string
  createdAt: Date; 
}