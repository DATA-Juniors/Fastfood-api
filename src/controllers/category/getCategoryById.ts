import { Request, Response } from "express"
import { findCategoryById } from "../../services/category.service"

export default async (req: Request, res: Response) => {
    const id = +req.params.id
    const category = await findCategoryById(id)
    if(category == null) {
        return res.status(400).json({
            message: `Category with id=${id} is not in database`
        })
    }
    res.status(200).json({
        message: `Retrive category with id=${id}`,
        categories: [{
            id: category.id,
            name: category.name,
            icon: category.icon
        }]
    })
}