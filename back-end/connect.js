import dotenv from "dotenv";
dotenv.config();
import { MongoClient } from "mongodb";
//MongoClient é uma classe

const URI = process.env.MONGO_URI

const client = new MongoClient(URI)

//instância a base de dados
export const db = client.db("projetoDegustai");