import React, { useEffect } from 'react';
import LoginForm from './components/LoginForm'; // Importar el componente LoginForm

const App = () => {
    useEffect(() => {
        // Lógica para ejecutar LoginForm al iniciar la aplicación
        // Por ejemplo, redirigir a la página de inicio de sesión
    }, []);

    return (
        <div>
            <LoginForm /> {/* Renderizar el componente LoginForm al iniciar la aplicación */}
        </div>
    );
}

export default App;

