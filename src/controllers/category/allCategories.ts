import { Request, Response } from "express";
import { allCategories } from "../../services/category.service";

export default async (req: Request, res: Response) => {
    let category = await allCategories()
    res.status(200).json({
        message: "Retrive all categories",
        category
        // categories: [{
        //     id: category.id,
        //     name: category.name,
        //     icon: category.icon
        // }]
    })
}