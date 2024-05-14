import React, { useState } from 'react';
import { login } from '../utils/auth';

const LoginForm: React.FC = () => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [loginError, setLoginError] = useState<string>('');

    const handleLogin = () => {
        if (username === 'admin' && password === 'password') {
            // Lógica para manejar el inicio de sesión exitoso
            setLoginError('');
            alert('Inicio de sesión exitoso');
        } else {
            // Lógica para manejar el inicio de sesión fallido
            setLoginError('Credenciales incorrectas. Por favor, inténtalo de nuevo.');
        }
    }

    return (
        <div>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Usuario" />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Contraseña" />
            <button onClick={handleLogin}>Iniciar Sesión</button>
            {loginError && <p>{loginError}</p>}
        </div>
    );
}

export default LoginForm;

