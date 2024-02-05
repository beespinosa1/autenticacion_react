// Signup.jsx
import React, { useState } from 'react';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      localStorage.setItem('token', user.accessToken);
      localStorage.setItem('user', JSON.stringify(user));
      setMessage('Sesión Iniciada Correctamente!');
      navigate('/');
    } catch (error) {
      console.error(error);
      setMessage('Inicio de sesión fallida. Intentalo de nuevo.');
    }
  };

  return (
    <div>
      <h1>Registrarse</h1>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit} className='signup-form'>
        <input
          type="email"
          placeholder="Tu Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Tu contraseña"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className='signup-button'>
          Registrarse
        </button>
      </form>
      <p>
        Necesitas Registrarte? <Link to="/login">Registrarse</Link>
      </p>
    </div>
  );
};

export default Signup;
