import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from './../../services/api';

import './styles.css';

export default function Dashboard() {
  const [spots, setSpots] = useState([]);

  useEffect(() => {
    async function loadSpots() {
      const user_id = localStorage.getItem('user');
      const response = await api.get('/dashboard', {
        headers: { user_id }
      });
      setSpots(response.data);
      console.log(response.data);
    }

    loadSpots();
  }, []);

  return (
    <>
      <ul className="spot-list">
        {spots && spots.map(item => (
          <li key={`${item._id}`}>
            <header style={{ backgroundImage: `url(${item.thumbnail_url})` }} />
            <strong>{item.company}</strong>
            <span>{item.price ? `R$ ${item.price}` : 'GRATUITO'}</span>
          </li>
        ))}
      </ul>
      <Link to="/new"><button className="btn">Cadastrar novo spot</button></Link>
    </>
  );
}
