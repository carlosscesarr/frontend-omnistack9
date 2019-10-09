import React, { useState } from 'react';
import api from './../../services/api';

export default function Login({ history }) {
  const [email, setEmail] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();

    const response = await api.post('/sessions', {email})
    
    const {_id} = response.data;
    localStorage.setItem('user', _id);
    history.push('/dashboard');
  }

  return (
    <>
      <p>
        Ofereça <strong>spots</strong> para programadores e encontre talentos para sua empresa
      </p>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">E-MAIL</label>
        <input value={email} type="email" id="email" onChange={e => setEmail(e.target.value)} placeholder="Seu melhor e-mail" />
        <button className="btn">Entrar</button>
      </form>
    </>
  );
}
