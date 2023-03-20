import { Request, Response } from "express"
import { ProductDto } from "../../models/products/productDto"
import { addProduct } from "../../services/products.service"
import productSchema from "../../validation/products/products.shema"

export default async (req: Request, res: Response) => {
  let productDto: ProductDto = req.body
  const {error} = productSchema.validate(req.body)
  if(error) {
      return res.status(401).json({
          error: error.details[0].message
      })
  }
  if(!req.file) {
    return res.status(401).json({
      message: "Image not uploaded",
    })
  }
  const image = req.file.filename
  const createProduct = await addProduct(productDto, image)
    res.status(200).json({
        message: "New product created",
        product: {
          id: createProduct.id,
          name: createProduct.name,
          price: createProduct.price,
          image: createProduct.image,
          category: {
            id: createProduct.category_id,
            name: createProduct.category_name,
            icon: createProduct.category_icon
          }
        }
    })
  }