import { MongoClient } from "mongodb";


const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);
const database = client.db('AppDB');
const users = database.collection('users');
const products = database.collection('products');
export {users,products}