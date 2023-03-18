import { Request, Response } from "express"
import { allProducts, getProductByCategoryId } from "../../services/products.service"

export default async (req: Request, res: Response) => {

    if (req.query.category_id) {
        const category_id: any = req.query.category_id
        const product = await getProductByCategoryId(category_id)
        if(product == null) {
            return res.status(401).json({
                message: "Id is null"
            })
        }
        const products = product.map(el => {
            return [
                {
                  id: el.id,
                  name: el.name,
                  price: el.price,
                  image: el.image,
                  category: {
                      id: el.category_id,
                      name: el.category_name,
                      icon: el.category_icon
                  }
                }
            ]
        })
        res.status(200).json({
            message: `Retrive products by category id=${category_id}`,
            products
        })
    }
    else {
        const getProducts = await allProducts()

        const products = getProducts.map(el => {
            return {
                id: el.id,
                name: el.name,
                price: el.price,
                image: el.image,
                category: {
                    id: el.category_id,
                    name: el.category_name,
                    icon: el.category_icon
                }
            }
        })
        res.status(200).json({
            message: "Retrive all products",
            products
        })
    }
}