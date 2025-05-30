'use client';
import {signIn} from 'next-auth/react';
import {useState} from 'react';

export default function LoginPage(){
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

const handleSubmit = async (e)=>{
  e.preventDefault();
  await signIn('credentials', {email, password, callbackUrl: '/dashboard'});
};

return (
  <form onSubmit={handleSubmit}>
  <input type="email" placeholder="Email" value={email} onChange{(e)=> setEmail(e.target.value)} />
  <input type="password" placeholder="Mot de passe" value={password} onChange{(e)=> setPassword(e.target.value)} />
  <button type="submit">Connexion</button>
  </form>
  );
}
