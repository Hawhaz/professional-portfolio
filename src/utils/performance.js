/**
 * Utilidades para optimizar el rendimiento de la aplicación
 */

/**
 * Detecta si el dispositivo es móvil
 * @returns {boolean} - true si es móvil, false si no
 */
export const isMobileDevice = () => {
  if (typeof window === 'undefined') return false;
  
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
};

/**
 * Detecta si el dispositivo tiene una conexión lenta
 * @returns {boolean} - true si la conexión es lenta, false si no
 */
export const isSlowConnection = () => {
  if (typeof navigator === 'undefined' || !navigator.connection) return false;
  
  const connection = navigator.connection;
  
  if (connection.saveData) return true;
  
  if (connection.effectiveType) {
    return ['slow-2g', '2g', '3g'].includes(connection.effectiveType);
  }
  
  return false;
};

/**
 * Aplica optimizaciones basadas en el dispositivo y la conexión
 * @returns {Object} - Configuración de optimización
 */
export const getPerformanceConfig = () => {
  const isMobile = isMobileDevice();
  const isLowEnd = isSlowConnection();
  
  return {
    // Reducir la calidad de las animaciones en dispositivos móviles o conexiones lentas
    animations: {
      enabled: true,
      reduced: isMobile || isLowEnd,
      quality: isMobile ? 'low' : isLowEnd ? 'medium' : 'high',
    },
    
    // Configuración para Three.js
    three: {
      dpr: isMobile ? [0.5, 1] : isLowEnd ? [0.75, 1.5] : [1, 2],
      frameloop: isMobile || isLowEnd ? 'demand' : 'demand',
      shadows: !isMobile && !isLowEnd,
      antialias: !isMobile && !isLowEnd,
    },
    
    // Configuración para Framer Motion
    framerMotion: {
      reducedMotion: isMobile || isLowEnd ? 'user' : 'never',
    },
    
    // Configuración para imágenes
    images: {
      quality: isMobile ? 'low' : isLowEnd ? 'medium' : 'high',
      lazyLoadThreshold: isMobile || isLowEnd ? 0.1 : 0.25,
    },
  };
};

/**
 * Aplica debounce a una función
 * @param {Function} func - Función a la que aplicar debounce
 * @param {number} wait - Tiempo de espera en ms
 * @returns {Function} - Función con debounce aplicado
 */
export const debounce = (func, wait = 100) => {
  let timeout;
  
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

/**
 * Aplica throttle a una función
 * @param {Function} func - Función a la que aplicar throttle
 * @param {number} limit - Límite de tiempo en ms
 * @returns {Function} - Función con throttle aplicado
 */
export const throttle = (func, limit = 100) => {
  let inThrottle;
  
  return function executedFunction(...args) {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => {
        inThrottle = false;
      }, limit);
    }
  };
};

/**
 * Optimiza los event listeners para scroll
 * @param {Function} callback - Función a ejecutar en el scroll
 * @returns {Function} - Función optimizada
 */
export const optimizedScrollListener = (callback) => {
  return throttle(callback, 100);
};

/**
 * Optimiza los event listeners para resize
 * @param {Function} callback - Función a ejecutar en el resize
 * @returns {Function} - Función optimizada
 */
export const optimizedResizeListener = (callback) => {
  return debounce(callback, 200);
}; 