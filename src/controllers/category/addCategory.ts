import { Request, Response } from "express";
import { addCategory, getCategoryByName } from "../../services/category.service";

export default async (req: Request, res: Response) => {
    const name = req.body.name
    const category  = await getCategoryByName(name)
    if (category) {
        return res.status(404).json({
            message: "Category already exists"
        })
    }
    // const icon = req.file as Express.Multer.File
    // const filename = icon.filename
    
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