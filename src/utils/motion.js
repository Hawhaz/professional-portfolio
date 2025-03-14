// Detectar si es un dispositivo móvil para ajustar las animaciones
const isMobile = typeof window !== 'undefined' && window.matchMedia('(max-width: 768px)').matches;

// Ajustar los valores de duración y retraso para dispositivos móviles
const adjustForMobile = (value) => isMobile ? value * 0.7 : value;

export const textVariant = (delay) => {
  return {
    hidden: {
      y: -50,
      opacity: 0,
    },
    show: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        duration: adjustForMobile(1.25),
        delay: delay ? adjustForMobile(delay) : 0,
        stiffness: isMobile ? 50 : 100, // Reducir la rigidez en móviles
        damping: isMobile ? 10 : 20, // Ajustar el amortiguamiento en móviles
      },
    },
  };
};

export const fadeIn = (direction, type, delay, duration) => {
  // Reducir la distancia de animación en dispositivos móviles
  const distance = isMobile ? 50 : 100;
  
  return {
    hidden: {
      x: direction === 'left' ? distance : direction === 'right' ? -distance : 0,
      y: direction === 'up' ? distance : direction === 'down' ? -distance : 0,
      opacity: 0,
    },
    show: {
      x: 0,
      y: 0,
      opacity: 1,
      transition: {
        type: type,
        delay: delay ? adjustForMobile(delay) : 0,
        duration: duration ? adjustForMobile(duration) : 0.5,
        ease: 'easeOut',
      },
    },
  };
};

export const zoomIn = (delay, duration) => {
  return {
    hidden: {
      scale: 0,
      opacity: 0,
    },
    show: {
      scale: 1,
      opacity: 1,
      transition: {
        type: 'tween',
        delay: delay ? adjustForMobile(delay) : 0,
        duration: duration ? adjustForMobile(duration) : 0.5,
        ease: 'easeOut',
      },
    },
  };
};

export const slideIn = (direction, type, delay, duration) => {
  // Reducir la distancia de animación en dispositivos móviles
  const suffix = isMobile ? '50%' : '100%';
  
  return {
    hidden: {
      x: direction === 'left' ? `-${suffix}` : direction === 'right' ? suffix : 0,
      y: direction === 'up' ? suffix : direction === 'down' ? suffix : 0,
    },
    show: {
      x: 0,
      y: 0,
      transition: {
        type: type,
        delay: delay ? adjustForMobile(delay) : 0,
        duration: duration ? adjustForMobile(duration) : 0.5,
        ease: 'easeOut',
      },
    },
  };
};

export const staggerContainer = (staggerChildren, delayChildren) => {
  return {
    hidden: {},
    show: {
      transition: {
        staggerChildren: staggerChildren ? adjustForMobile(staggerChildren) : 0.1,
        delayChildren: delayChildren ? adjustForMobile(delayChildren) : 0,
      },
    },
  };
};
