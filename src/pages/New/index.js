import React, { useState, useMemo } from 'react';
import api from './../../services/api';
import camera from './../../assets/camera.svg';
import './styles.css';

export default function New({history}) {
  const [company, setCompany] = useState('');
  const [techs, setTechs] = useState('');
  const [price, setPrice] = useState('');
  const [thumbnail, setThumbnail] = useState(null);

  const preview = useMemo(
    () => {
      return thumbnail ? URL.createObjectURL(thumbnail) : null;
    },
    [thumbnail]
  )
  async function handleSubmit(e) {
    e.preventDefault();
    const data = new FormData();
    const user_id = localStorage.getItem('user');

    data.append('thumbnail', thumbnail);
    data.append('company', company);
    data.append('price', price);
    data.append('techs', techs);

    const response = await api.post('/spots', data, {
      headers: { user_id }
    });
    console.log(response);
    history.push('/dashboard')
  }

  return (
    <form onSubmit={handleSubmit}>
      <label
        id="thumbnail"
        style={{ backgroundImage: `url(${preview})` }}
        className={thumbnail ? 'hasThumbnail' : ''}>
        <input type="file" onChange={e => setThumbnail(e.target.files[0])} />
        <img src={camera} />
      </label>
      <label htmlFor="company">EMPRESA *</label>
      <input id="company" type="text" value={company} placeholder="Sua empresa incrível"
        onChange={e => setCompany(e.target.value)}
      />

      <label htmlFor="techs">TECNOLOGIAS * <span>(separadas por vírgula)</span></label>
      <input value={techs} id="techs" type="text" placeholder="Quais tecnologias usam?"
        onChange={e => setTechs(e.target.value)}
      />

      <label htmlFor="price">VALOR DA DIÁRIA * <span>(em branco para GRATUITO)</span></label>
      <input id="price" value={price} type="text" placeholder="Quais tecnologias usam?"
        onChange={e => setPrice(e.target.value)}
      />
      <button type="submit" className="btn">Cadastrar</button>
    </form>
  );
}
