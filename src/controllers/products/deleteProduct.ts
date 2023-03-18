import { Request, Response } from "express"
import { deleteProduct, getProductById } from "../../services/products.service"

export default async (req: Request, res: Response) => {
    const id = +req.params.id
    const productId = await getProductById(id)
    if(productId == null) {
        return res.status(401).json({
            message: "User in null"
        })
    }
    await deleteProduct(id)
    res.status(200).json({
        message: "Product deleted",
        product: {
            id: productId.id,
            name: productId.name,
            price: productId.price,
            image: productId.image,
            category_id: productId.category_id
        }
    })
}