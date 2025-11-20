import { MongoClient } from "mongodb";


const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);
const database = client.db('AppDB');
const users = database.collection('users');
const Products = database.collection('products');
export {database,users,Products}