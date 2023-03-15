import { Role, User } from "../models/auth/user"
import { client } from "../config/database"
// All users
export const getUsers  = async () => {
    const sql = `SELECT * from users;`
    const result = await client.query(sql)
    return result.rows;
}
// Get user by token
export const findUserByToken = async (token: string) => {
    const sql = `SELECT * FROM users where token = $1;`
    const result = await client.query(sql, [token])
    if(result.rowCount == 0) {
        return null
    }
    const user: User = result.rows[0]
    return user;
}
// Edit user data
export const changeUserData = async (email: string, name: string, surname: string, birthday: string, phone: string, id: string) => {
    const sql = `UPDATE users SET email=$1, name=$2, surname=$3, birthday=$4, phone=$5 WHERE id=$6;`
    const result = await client.query(sql, [email, name, surname, birthday, phone, id])
    if(result.rowCount == 0) {
        return null
    }
    return result.rows[0]
}
// Edit user password and role
export const changeUserCredentials = async (password: string, role: Role, id: number) => {
    const sql = `UPDATE users SET password=$1, role=$2 WHERE id=$3;`
    const result = await client.query(sql, [password, role, id])
    return result.rows[0]
}
// Delete user
export const deleteUser = async (id: number) => {
    const sql = `DELETE FROM users WHERE id=$1 Returning *;`
    const result = await client.query(sql, [id])
    if(result.rowCount == 0) {
        return null
    }
    return result.rows[0]
}
// Delete user with verification
export const deleteUserWithVerification = async (id: number) => {
    const sql = `DELETE FROM verification WHERE id=$1 Returning *;`
    const result = await client.query(sql, [id])
    if(result.rowCount == 0) {
        return null
    }
    return result.rows[0]
}