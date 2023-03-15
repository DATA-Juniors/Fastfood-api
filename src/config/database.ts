import { Client, ClientConfig } from 'pg'
import dotenv from "dotenv"
dotenv.config()
const config: ClientConfig = {
    connectionString: process.env.DATABASE_URL
}

export const client = new Client(config)

client.connect((err: Error) => {
    if(err != null) {
        console.error('Cannot connect to database')
    }
    else {
        console.log('Connected to database')
    }
})