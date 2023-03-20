import { Request, Response } from "express";
import { addCategory, getCategoryByName } from "../../services/category.service";
import categorySchema from "../../validation/category/category.schema";

export default async (req: Request, res: Response) => {
    const name = req.body.name
    const category  = await getCategoryByName(name)
    const {error} = categorySchema.validate(req.body)
    if(error) {
        return res.status(401).json({
            error: error.details[0].message
        })
    }
    if (category) {
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
    const createCategory = await addCategory(name, icon)
    // console.log("Icon:" + icon)
    
    return res.status(200).json({
        message: "New category created",
        category: {
            id: createCategory.id,
            name: createCategory.name,
            icon: createCategory.icon
        }
    })
}