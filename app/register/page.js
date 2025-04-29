'use client'
import {useState} from 'react';

export default function RegisterPage(){
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

const handleSubmit = async (e)=>{
  e.preventDefault();
  const res = await fetch('api/register', {
    method: 'POST',
    body: JSON.stringify({email, password}),
  });
  if(res.ok){
    alert('Compte crée, vous pouvez vous connecter.');
  } else {
    alert('Erreur lors de l'inscription.');
  }
};

return (
  
  
