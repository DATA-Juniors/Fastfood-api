import { Request, Response } from "express"
import { UpdateCategory, findCategoryById, getCategoryByName } from "../../services/category.service"
import categorySchema from "../../validation/category/category.schema"

export default async (req: Request, res: Response) => {
    const name = req.body.name
    const id = +req.params.id
    const {error} = categorySchema.validate(req.body)
    if(error) {
        return res.status(401).json({
            error: error.details[0].message
        })
    }
    const categoryName = await getCategoryByName(name)
    if (categoryName) {
        return res.status(404).json({
            message: "Category already exists"
        })
    }
    if (!req.file) {
        return res.status(401).json({
            message: "Image not uploaded"
        })
    }
    
    const icon = req.file.filename
    const category = await findCategoryById(id)
    if(!category) {
        return res.status(403).json({
            message: `User with id=${id} is not`
        })
    }
    await UpdateCategory(name, icon, id)
    res.status(200).json({
        message: "Category successfully updated",
        category: {
            id: id,
            name: name,
            icon: icon
        }
    })
}