import { Router } from "express";
import { upload } from "../../middleware/multer";
import authorization from "../../middleware/user"
import allCategory from "../../controllers/category/allCategories";
import getCategoryById from "../../controllers/category/getCategoryById";
import createCategory from "../../controllers/category/addCategory";
import updateCategory from "../../controllers/category/updateCategory";
import deleteCategory from "../../controllers/category/dropCategory";


const router = Router()
.get('/', authorization, allCategory)
.get('/:id', authorization, getCategoryById)
.post('/', upload.single('file'), authorization, createCategory)
.put('/:id', upload.single('file'),  updateCategory)
.delete('/:id', authorization, deleteCategory)


export default router;