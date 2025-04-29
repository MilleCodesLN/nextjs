import {getDbConnection} from '@/lib/db';
import bcrypt from 'bcrypt';
export async function POST(req){
  const {email, password} = await req.json();
  const conn = await getDbConnection();
  const hashed = bcrypt.hashSync(password, 10);
  try {
    await conn.execute('INSERT INTO users (email, password) VALUES (?, ?)', [email, hashed]);
    return new Response('OK', {status: 200});
  } catch {
    return new Response('erreur', {status: 500});
  }
}
