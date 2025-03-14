import React, { Suspense, lazy } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

// Importar el componente Loader para mostrar durante la carga
import Loader from './components/Loader';

// Añadir un div para mostrar errores en la página
const errorLogDiv = document.createElement('div');
errorLogDiv.id = 'error-log';
errorLogDiv.style.position = 'fixed';
errorLogDiv.style.bottom = '10px';
errorLogDiv.style.right = '10px';
errorLogDiv.style.backgroundColor = 'rgba(255, 0, 0, 0.8)';
errorLogDiv.style.color = 'white';
errorLogDiv.style.padding = '10px';
errorLogDiv.style.borderRadius = '5px';
errorLogDiv.style.maxHeight = '200px';
errorLogDiv.style.overflowY = 'auto';
errorLogDiv.style.zIndex = '9999';
errorLogDiv.style.display = 'none'; // Ocultar por defecto

// Añadir un botón para cerrar el error log
const closeButton = document.createElement('button');
closeButton.textContent = 'X';
closeButton.style.position = 'absolute';
closeButton.style.top = '5px';
closeButton.style.right = '5px';
closeButton.style.background = 'transparent';
closeButton.style.border = 'none';
closeButton.style.color = 'white';
closeButton.style.fontSize = '16px';
closeButton.style.cursor = 'pointer';
closeButton.onclick = () => {
  const errorLog = document.getElementById('error-log');
  if (errorLog) {
    errorLog.style.display = 'none';
  }
};
errorLogDiv.appendChild(closeButton);

// Añadir un contenedor para los mensajes de error
const errorMessagesDiv = document.createElement('div');
errorMessagesDiv.id = 'error-messages';
errorMessagesDiv.style.marginTop = '15px';
errorLogDiv.appendChild(errorMessagesDiv);

document.body.appendChild(errorLogDiv);

// Función para mostrar el div de errores
const showErrorLog = () => {
  const errorLog = document.getElementById('error-log');
  if (errorLog) {
    errorLog.style.display = 'block';
  }
};

// Función para limpiar el log de errores
const clearErrorLog = () => {
  const errorMessages = document.getElementById('error-messages');
  if (errorMessages) {
    errorMessages.innerHTML = '';
  }
};

// Modificar los event listeners para mostrar el div solo cuando hay errores
window.addEventListener('error', (event) => {
  console.error('Error global capturado:', event.error);
  const errorMessages = document.getElementById('error-messages');
  if (errorMessages) {
    errorMessages.innerHTML += `<p>Error: ${event.error?.message || 'Desconocido'}</p>`;
    showErrorLog();
  }
});

window.addEventListener('unhandledrejection', (event) => {
  console.error('Promesa rechazada no manejada:', event.reason);
  const errorMessages = document.getElementById('error-messages');
  if (errorMessages) {
    errorMessages.innerHTML += `<p>Promesa rechazada: ${event.reason?.message || 'Desconocida'}</p>`;
    showErrorLog();
  }
});

// Función para manejar errores de carga
const handleError = (error) => {
  console.error('Error al cargar la aplicación:', error);
  // Mostrar un mensaje de error al usuario
  document.getElementById('root').innerHTML = `
    <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh; color: #f1f1f1; background-color: #141414; padding: 20px; text-align: center;">
      <h1>¡Ups! Algo salió mal</h1>
      <p>Hubo un problema al cargar la aplicación. Por favor, intenta recargar la página.</p>
      <p>Error: ${error?.message || 'Desconocido'}</p>
      <button onclick="window.location.reload()" style="margin-top: 20px; padding: 10px 20px; background-color: #555; color: white; border: none; border-radius: 4px; cursor: pointer;">
        Recargar página
      </button>
    </div>
  `;
  
  // Mostrar el error en el log
  const errorMessages = document.getElementById('error-messages');
  if (errorMessages) {
    errorMessages.innerHTML += `<p>Error de carga: ${error?.message || 'Desconocido'}</p>`;
    showErrorLog();
  }
};

// Cargar la aplicación de forma perezosa con un tiempo de espera
const App = lazy(() => 
  Promise.all([
    import('./App'),
    // Esperar al menos 500ms para evitar parpadeos
    new Promise(resolve => setTimeout(resolve, 500))
  ])
  .then(([moduleExports]) => moduleExports)
  .catch(error => {
    handleError(error);
    throw error;
  })
);

// Renderizar la aplicación con manejo de errores
try {
  ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <Suspense fallback={<Loader />}>
        <App />
      </Suspense>
    </React.StrictMode>
  );
} catch (error) {
  handleError(error);
}
