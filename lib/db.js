import { MongoClient } from 'mongodb';

export async function client() {
  return await MongoClient.connect(
    'mongodb+srv://alex:andaluzia231178@cluster0.vndt4.mongodb.net/authentication?retryWrites=true&w=majority'
  );
}
