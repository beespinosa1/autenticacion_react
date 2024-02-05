// Login.jsx
import React, { useState } from 'react';
import { auth } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      localStorage.setItem('token', user.accessToken);
      localStorage.setItem('user', JSON.stringify(user));
      setMessage('Sesión Iniciada Correctamente!');
      navigate('/');
    } catch (error) {
      console.error(error);
      setMessage('Inicio de sesió fallido. Revisa tus credenciales e intentalo de nuevo.');
    }
  };

  return (
    <div>
      <h1>Login</h1>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit} className='login-form'>
        <input
          type="email"
          placeholder="Tu Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Tu Contraseña"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className='login-button'>
          Login
        </button>
      </form>
      <p>
        Necesitas Registrarte? <Link to="/signup">Crear una cuenta</Link>
      </p>
    </div>
  );
};

export default Login;
