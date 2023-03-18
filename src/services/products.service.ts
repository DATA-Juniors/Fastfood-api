import { client } from "../config/database"
import { ProductDto } from "../models/products/productDto"

// All Products
export const allProducts = async () => {
    const sql = `select products.id as id, products.name as name, products.price as price, products.image as image, products.category_id as category_id, category.name as category_name, category.icon as category_icon from products inner join category on products.category_id = category.id;`
    const result = await client.query(sql)
    return result.rows
}
// Get product by id
export const getProductById = async (id: number) => {
    const sql = `select products.id as id, products.name as name, products.price as price, products.image as image, products.category_id as category_id, category.name as category_name, category.icon as category_icon from products inner join category on products.category_id = category.id WHERE products.id = $1;`
    const result = await client.query(sql, [id])
    if(result.rowCount == 0) {
        return null
    }
    return result.rows[0]
}
// All products by category id
export const getProductByCategoryId = async (id: number) => {
    const sql = `select products.id as id, products.name as name, products.price as price, products.image as image, products.category_id as category_id, category.name as category_name, category.icon as category_icon from products inner join category on products.category_id = category.id WHERE category_id = $1;`
    const result = await client.query(sql, [id])
    if(result.rowCount == 0) {
        return null
    }
    return result.rows
}
// Create Product
export const addProduct = async (product: ProductDto, image: string) => {
    const sql = `INSERT INTO products (name, price, image, category_id) VALUES ($1, $2, $3, $4) Returning products.id;`
    const result = await client.query(sql, [product.name, product.price, image, product.category_id])
    const { id } = result.rows[0]
    return getProductById(id)
}
//Update Product
export const updateProduct = async (product: ProductDto, image: string, id: number) => {
    const sql = `UPDATE products SET name=$1, price=$2, image=$3, category_id=$4 WHERE id=$5 RETURNING products.id;`
    const result = await client.query(sql, [product.name, product.price, image, product.category_id, id])
    if(result.rowCount == 0) {
        return null
    }
    return getProductById(id)
}
// Delete Product
export const deleteProduct = async (id: number) => {
    const sql = `DELETE FROM products WHERE id=$1;`
    const result = await client.query(sql, [id])
    if(result.rowCount == 0) {
        return null
    }
    return result.rows[0]
}