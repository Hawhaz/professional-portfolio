/**
 * Utilidades para optimizar la carga de imágenes
 */

/**
 * Precarga imágenes críticas para mejorar el rendimiento
 * @param {Array} imageSources - Array de URLs de imágenes a precargar
 */
export const preloadCriticalImages = (imageSources) => {
  if (!imageSources || !Array.isArray(imageSources)) return;
  
  imageSources.forEach(src => {
    const img = new Image();
    img.src = src;
  });
};

/**
 * Componente para cargar imágenes de forma perezosa con un efecto de desvanecimiento
 * @param {Object} props - Propiedades del componente
 * @param {string} props.src - URL de la imagen
 * @param {string} props.alt - Texto alternativo
 * @param {string} props.className - Clases CSS
 * @param {boolean} props.priority - Si la imagen debe cargarse con prioridad
 * @returns {Object} - Configuración para el componente de imagen
 */
export const getOptimizedImageProps = (props) => {
  const { src, alt, className, priority = false } = props;
  
  return {
    src,
    alt,
    className: `${className} transition-opacity duration-500`,
    loading: priority ? 'eager' : 'lazy',
    onLoad: (e) => {
      e.target.classList.add('opacity-100');
    },
    style: { opacity: 0 },
  };
};

/**
 * Convierte una imagen a formato WebP si el navegador lo soporta
 * @param {string} src - URL de la imagen original
 * @returns {string} - URL de la imagen en formato WebP o la original
 */
export const getWebPImage = (src) => {
  // Verificar si el navegador soporta WebP
  const supportsWebP = () => {
    const elem = document.createElement('canvas');
    if (elem.getContext && elem.getContext('2d')) {
      return elem.toDataURL('image/webp').indexOf('data:image/webp') === 0;
    }
    return false;
  };
  
  if (typeof window !== 'undefined' && supportsWebP() && src) {
    // Si la imagen ya es WebP, devolverla tal cual
    if (src.endsWith('.webp')) return src;
    
    // Intentar encontrar una versión WebP de la imagen
    const basePath = src.substring(0, src.lastIndexOf('.'));
    return `${basePath}.webp`;
  }
  
  return src;
};

/**
 * Optimiza el tamaño de una imagen según el dispositivo
 * @param {string} src - URL de la imagen original
 * @param {string} size - Tamaño deseado ('small', 'medium', 'large')
 * @returns {string} - URL de la imagen optimizada
 */
export const getResponsiveImage = (src, size = 'medium') => {
  if (!src) return '';
  
  // Si la URL ya incluye un tamaño, devolverla tal cual
  if (src.includes('-small.') || src.includes('-medium.') || src.includes('-large.')) {
    return src;
  }
  
  const basePath = src.substring(0, src.lastIndexOf('.'));
  const extension = src.substring(src.lastIndexOf('.'));
  
  return `${basePath}-${size}${extension}`;
}; 