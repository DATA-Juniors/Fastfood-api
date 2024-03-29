import { Request, Response } from "express"
import { ProductDto } from "../../models/products/productDto"
import { updateProduct } from "../../services/products.service"
import productSchema from "../../validation/products/products.shema"

export default async (req: Request, res: Response) => {
    const id = +req.params.id
    const product: ProductDto = req.body
    const {error} = productSchema.validate(req.body)
    if(error) {
        return res.status(401).json({
            error: error.details[0].message
        })
    }
    if(!req.file) {
        return res.status(401).json({
            message: "Image not uploaded"
        })
    }
    const image = req.file.filename
    const updatedProduct = await updateProduct(product, image, id)
    if(updatedProduct == null) {
        return res.status(401).json({
            message: "User didn't register"
        })
    }
    res.status(200).json({
        message: "Product updated",
        product: {
            id: updatedProduct.id,
            name: updatedProduct.name,
            price: updatedProduct.price,
            image: updatedProduct.image,
            category: {
                id: updatedProduct.category_id,
                name: updatedProduct.category_name,
                icon: updatedProduct.category_icon
            }
          }
    })
}