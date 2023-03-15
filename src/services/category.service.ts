import { client } from "../config/database"
import { Category } from "../models/category/category.model"

// All categories
export const allCategories = async () => {
    const sql = `SELECT * FROM category;`
    const result = await client.query(sql)
    return result.rows;
}
// All categories by id
export const findCategoryById = async (id: number) => {
    const sql = `SELECT * FROM category where id=$1;`
    const result = await client.query(sql, [id])
    if(result.rowCount == 0) {
        return null
    }
    return result.rows[0];
}
// is exists
export const getCategoryByName = async (name: string) => {
    const sql = `SELECT * FROM category WHERE name=$1;`
    const result = await client.query(sql, [name])
    if(result.rowCount == 0){
        return null
    }
    return result.rows[0]
}
// Create category
export const addCategory = async (name: string, icon: string) => {
    const sql = `INSERT INTO category (name, icon) VALUES ($1, $2) RETURNING *;`
    const result = await client.query(sql, [name, icon])
    return result.rows[0]
}
// Update category
export const UpdateCategory = async (name: string, icon: string, id: number) => {
    const sql = `UPDATE category SET name=$1, icon=$2 WHERE id=$3;`
    const result = await client.query(sql, [name, icon, id])
    return result.rows[0]
}
// Delete category
export const deleteCategory = async (id: number) => {
    const sql = `DELETE from category where id=$1;`
    const result = await client.query(sql, [id])
    return result.rows[0]
}