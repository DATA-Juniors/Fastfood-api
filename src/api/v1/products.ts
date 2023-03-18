import { Router } from "express";
import authorization from "../../middleware/user"
import addProduct from "../../controllers/products/addProduct";
import allProducts from "../../controllers/products/allProducts";
import { upload } from "../../middleware/multer";
import getProductById from "../../controllers/products/getProductById";
import deleteProduct from "../../controllers/products/deleteProduct";
import updateProduct from "../../controllers/products/updateProduct";

const router = Router()
.get("/", authorization, allProducts)
.get("/:id", authorization, getProductById)
.post("/", authorization, upload.single("file"), addProduct)
.put("/:id", authorization, upload.single("file"), updateProduct)
.delete("/:id", authorization, deleteProduct)

export default router;