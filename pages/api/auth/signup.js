import { hashPassword } from '../../../lib/auth';
import { client } from '../../../lib/db';

const handler = async (req, res) => {
  if (req.method !== 'POST') return;

  const { email, password } = req.body;

  if (
    !email ||
    !email.includes('@') ||
    !password ||
    password.trim().length < 7
  ) {
    res.status(422).json({ message: 'Values invalid' });
    return;
  }

  const connection = await client();

  const db = connection.db();

  const hashedPassword = hashPassword(password);

  const collection = await db.collection('users').insertOne({
    email,
    hashedPassword,
  });
  res.status(201).json({ message: 'User created' });
};

export default handler;
