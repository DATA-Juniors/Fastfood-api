import { Request, Response } from "express";
import { deleteCategory, findCategoryById } from "../../services/category.service";

export default async (req: Request, res: Response) => {
    const id = +req.params.id
    const category = await findCategoryById(id)
    if(category == null) {
        return res.status(403).json({
            message: "Category is not in database"
        })
    }
    await deleteCategory(id)
    return res.status(200).json({
        message: "Category deleted",
        category: {
            name: category.name,
            icon: category.icon
        }
    })
}