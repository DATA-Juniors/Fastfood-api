import { Request, Response } from "express"
import { getProductById } from "../../services/products.service"

export default async (req: Request, res: Response) => {
    const id = +req.params.id
    const product = await getProductById(id)
    if(product == null) {
        return res.status(401).json({
            message: "Id is null"
        })
    }
    res.status(200).json({
        message: `Retrive product by id=${id}`,
        products: {
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            category: {
                id: product.category_id,
                name: product.category_name,
                icon: product.category_icon
            }
        }
    })
}