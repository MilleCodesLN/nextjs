import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import {getDbConnection} from '@/lib/db';
import bcrypt from 'bcrypt';

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: {label: 'Email', type: 'email'},
        password: {label: 'Mot de passe', type: 'password'},
      },
      async authorize(credentials) {
        const conn = await getConnection();
        const [rows] = await conn.execute('SELECT * FROM users WHERE email = ?', [credentials.email]);
        const user = rows[0];
        if(user && bcrypt.compareSync(credentials.password, user.password))  {
          return {id: user.id, email: user.email};
        }
        return null;
      },
    }),
    ],
  session: {
    strategy: 'jwt'
  },
  pages: {
    signIn: '/login',
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export {handler as Get, handler as POST};
