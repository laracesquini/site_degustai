import { MongoClient } from "mongodb";
//MongoClient é uma classe

const URI = "mongodb+srv://seuNomeUsuario:suaSenha@cluster0.zwelo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

const client = new MongoClient(URI)

//instância a base de dados
export const db = client.db("projetoDegustai");