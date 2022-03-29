import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
import { comparePassword } from '../../../lib/auth';
import { client } from '../../../lib/db';

export default NextAuth({
  session: {
    jwt: true,
  },

  providers: [
    Providers.Credentials({
      async authorize(credentials) {
        const connection = await client();

        const usersCollection = connection.db().collection('users');

        const user = await usersCollection.findOne({
          email: credentials.email,
        });
        console.log(user);
        if (!user) throw new Error('No user found');

        const isValid = await comparePassword(
          credentials.password,
          user.hashedPassword
        );

        if (!isValid) throw new Error('Password incorrect');

        connection.close();

        return {
          email: user.email,
        };
      },
    }),
  ],
});
