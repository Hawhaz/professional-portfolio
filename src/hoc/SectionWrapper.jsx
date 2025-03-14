import { motion } from 'framer-motion';
import { styles } from '../styles';
import { staggerContainer } from '../utils/motion';
import { useEffect, useState } from 'react';

const SectionWrapper = (Component, idName) => {
  function HOC() {
    const [isMobile, setIsMobile] = useState(false);
    const [hasError, setHasError] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    
    // Detectar si es un dispositivo móvil para ajustar las animaciones
    useEffect(() => {
      const mediaQuery = window.matchMedia('(max-width: 768px)');
      setIsMobile(mediaQuery.matches);
      
      const handleMediaQueryChange = (event) => {
        setIsMobile(event.matches);
      };
      
      mediaQuery.addEventListener('change', handleMediaQueryChange);
      
      // Simular tiempo de carga para evitar parpadeos
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 300);
      
      return () => {
        mediaQuery.removeEventListener('change', handleMediaQueryChange);
        clearTimeout(timer);
      };
    }, []);
    
    // Componente de error para cuando falla la carga de una sección
    if (hasError) {
      return (
        <div className="flex items-center justify-center min-h-[50vh] bg-night text-white p-4 text-center">
          <div>
            <h2 className="text-xl font-bold mb-2">Error al cargar la sección</h2>
            <p className="mb-4">Hubo un problema al cargar esta sección. Intenta recargar la página.</p>
            <button 
              onClick={() => window.location.reload()} 
              className="px-4 py-2 bg-gray-700 rounded hover:bg-gray-600 transition-colors"
            >
              Recargar página
            </button>
          </div>
        </div>
      );
    }
    
    // Componente de carga para cuando la sección está cargando
    if (isLoading) {
      return (
        <div className="flex items-center justify-center min-h-[50vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
        </div>
      );
    }
    
    return (
      <motion.section
        variants={staggerContainer()}
        initial="hidden"
        whileInView="show"
        viewport={{ 
          once: true, // Cambiar a true para que las animaciones solo se ejecuten una vez
          amount: isMobile ? 0.1 : 0.25, // Reducir el umbral en dispositivos móviles
        }}
        className={`${styles.padding} max-w-7xl mx-auto relative z-0`}>
        <span className="hash-span" id={idName}>
          &nbsp;
        </span>

        {/* Envolver el componente en un try-catch para manejar errores */}
        {(() => {
          try {
            return <Component />;
          } catch (error) {
            console.error(`Error al renderizar la sección ${idName}:`, error);
            setHasError(true);
            return null;
          }
        })()}
      </motion.section>
    );
  }

  return HOC;
};

export default SectionWrapper;
