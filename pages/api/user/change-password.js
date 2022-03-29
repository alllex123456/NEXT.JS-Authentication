import { getSession } from 'next-auth/client';
import { comparePassword, hashPassword } from '../../../lib/auth';
import { client } from '../../../lib/db';

async function handler(req, res) {
  if (req.method !== 'PATCH') return;

  const session = await getSession({ req: req });

  if (!session) {
    res.status(401).json({ message: 'You are not authenticated!' });
    return;
  }

  const userEmail = session.user.email;
  const oldPassword = req.body.oldPassword;
  const newPassword = req.body.newPassword;

  const connection = await client();
  const usersCollection = connection.db().collection('users');
  const user = await usersCollection.findOne({ email: userEmail });

  if (!user) {
    res.status(404).json({ message: 'User not found' });
    connection.close();
    return;
  }
  const currentPassword = user.hashedPassword;

  const isValid = await comparePassword(oldPassword, currentPassword);

  if (!isValid) {
    res.status(403).json({
      message: 'You are authenticated, but your password is incorrect',
    });
    connection.close();
    return;
  }

  const hashedPassword = await hashPassword(newPassword);

  await usersCollection.updateOne(
    { email: userEmail },
    { $set: { hashedPassword: hashedPassword } }
  );

  connection.close();
  res.status(200).json({ message: 'Password updated!' });
}

export default handler;
