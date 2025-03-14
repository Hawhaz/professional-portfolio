import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { styles } from '../styles';
import { navLinks } from '../constants';
import { oscar, bwmap, worldmap } from '../assets';
import { useRef, useEffect, useState, lazy, Suspense } from 'react';

// Componente optimizado para la imagen del héroe
const HeroImage = ({ src, alt, className, priority = false }) => {
  const imgRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isIntersecting, setIsIntersecting] = useState(priority);
  const [hasError, setHasError] = useState(false);
  const [errorDetails, setErrorDetails] = useState(null);

  useEffect(() => {
    if (!priority && imgRef.current) {
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            setIsIntersecting(true);
            observer.disconnect();
          }
        },
        { rootMargin: '200px' }
      );

      observer.observe(imgRef.current);
      return () => observer.disconnect();
    }
    return undefined;
  }, [priority]);

  // Depurar la carga de la imagen
  useEffect(() => {
    console.log(`Intentando cargar imagen: ${src}`);
    // Verificar si la imagen existe
    const img = new Image();
    img.src = src;
    img.onload = () => {
      console.log(`Imagen cargada correctamente: ${src}`);
      setIsLoaded(true);
    };
    img.onerror = (e) => {
      console.error(`Error al cargar la imagen: ${src}`, e);
      setHasError(true);
      setErrorDetails(`Error al cargar: ${src}`);
    };
  }, [src]);

  // Fallback para cuando la imagen no se puede cargar
  if (hasError) {
    return (
      <div 
        className={`${className} flex items-center justify-center bg-gray-800`}
        style={{ minHeight: '300px' }}
      >
        <div className="text-white text-center p-4">
          <p className="text-xl font-bold mb-2">Imagen no disponible</p>
          <p>No se pudo cargar la imagen</p>
          <p className="text-sm mt-2 text-gray-300">{errorDetails}</p>
        </div>
      </div>
    );
  }

  return (
    <div ref={imgRef} className={className}>
      {(isIntersecting || priority) && (
        <img
          src={src}
          alt={alt}
          className={`${isLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-500 w-full h-full object-cover`}
          onLoad={() => setIsLoaded(true)}
          onError={(e) => {
            console.error(`Error al cargar la imagen en el elemento img: ${src}`, e);
            setHasError(true);
            setErrorDetails(`Error en elemento img: ${e.type}`);
          }}
          loading={priority ? 'eager' : 'lazy'}
        />
      )}
    </div>
  );
};

const Hero = () => {
  const imageRef = useRef(null);
  const sectionRef = useRef(null);
  const isInView = useInView(imageRef, { once: true, amount: 0.3 });
  const [isMobile, setIsMobile] = useState(false);
  const [profileImageLoaded, setProfileImageLoaded] = useState(false);
  const [profileImageError, setProfileImageError] = useState(false);
  const [scrollDirection, setScrollDirection] = useState('none');
  const [lastScrollY, setLastScrollY] = useState(0);
  
  // Configuración para la animación basada en scroll
  const { scrollY } = useScroll();
  const imageX = useTransform(scrollY, [0, 500], [0, 800]);
  const imageOpacity = useTransform(scrollY, [0, 300], [1, 0]);
  const imageRotate = useTransform(scrollY, [0, 500], [0, 0]);
  const imageScale = useTransform(scrollY, [0, 300], [1, 0.8]);
  
  // Detectar dirección de scroll
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY) {
        setScrollDirection('down');
      } else {
        setScrollDirection('up');
      }
      setLastScrollY(currentScrollY);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);
  
  // Detectar si es un dispositivo móvil para ajustar las animaciones
  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 768px)');
    setIsMobile(mediaQuery.matches);
    
    const handleMediaQueryChange = (event) => {
      setIsMobile(event.matches);
    };
    
    mediaQuery.addEventListener('change', handleMediaQueryChange);
    
    // Precargar la imagen de perfil
    console.log('Precargando imagen de perfil:', oscar);
    const img = new Image();
    img.src = oscar;
    img.onload = () => {
      console.log('Imagen de perfil cargada correctamente');
      setProfileImageLoaded(true);
    };
    img.onerror = (e) => {
      console.error('Error al cargar la imagen de perfil:', e);
      setProfileImageError(true);
    };
    
    return () => {
      mediaQuery.removeEventListener('change', handleMediaQueryChange);
    };
  }, []);
  
  // Mostrar información de depuración
  useEffect(() => {
    console.log('Estado de la imagen de perfil:', {
      profileImageLoaded,
      profileImageError,
      oscarPath: oscar
    });
  }, [profileImageLoaded, profileImageError]);
  
  return (
    <>
      {/* Contenedor principal con posición relativa para contener el fondo */}
      <section
        ref={sectionRef}
        className="relative flex sm:flex-row flex-col w-full h-screen mx-auto 
        sm:bg-hero bg-hero-mobile overflow-hidden hero-transition">
        
        {/* Background images - Posicionadas con z-index negativo para estar detrás de todo */}
        <div className="absolute inset-0 -z-10 w-full h-full hero-transition">
          <HeroImage
            src={bwmap}
            alt="world map"
            className="w-full h-full sm:block hidden object-cover hero-transition"
            priority={true}
          />
        </div>
        {/* Removed the worldmap background for mobile devices */}
        
        {/* Diseño específico para móviles - Mitad imagen, mitad texto */}
        {isMobile ? (
          <div className="flex flex-col h-screen w-full hero-transition">
            {/* Contenedor de la imagen y texto para móviles */}
            <div className="flex flex-row h-full w-full">
              {/* Mitad izquierda - Imagen cortada exactamente por la mitad */}
              <motion.div 
                className="w-1/2 h-full hero-mobile-image-container"
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <motion.img 
                  src={oscar} 
                  alt="Oscar profile" 
                  className="h-full object-cover object-left hero-mobile-image"
                  style={{ 
                    width: '200%', // Hacer la imagen el doble de ancha
                    maxWidth: 'none', // Evitar restricciones de ancho máximo
                    transform: 'translateY(-5%) translateX(-10%)' // Mover la imagen hacia arriba y a la derecha
                  }}
                  initial={{ scale: 1.1, x: -50 }}
                  animate={{ scale: 1, x: -30 }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  whileHover={{ scale: 1.05 }}
                />
              </motion.div>
              
              {/* Mitad derecha - Fondo con gradiente y texto */}
              <motion.div 
                className="w-1/2 h-full hero-mobile-text-container flex items-center justify-center p-4"
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <div className="flex flex-col">
                  <motion.h1 
                    className={`${styles.heroHeadText} text-eerieBlack font-poppins uppercase text-[28px]`}
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                  >
                    Hi, I'm{' '}
                    <motion.span 
                      className="text-battleGray text-[36px] font-mova font-extrabold uppercase"
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ 
                        duration: 0.5, 
                        delay: 0.5,
                        type: "spring",
                        stiffness: 100
                      }}
                    >
                      Oscar
                    </motion.span>
                  </motion.h1>
                  <motion.p 
                    className={`${styles.heroSubText} mt-2 text-eerieBlack text-[13px] leading-tight`}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.7 }}
                  >
                    UI/UX Designer crafting intuitive digital experiences with a focus on user-centered design and accessibility.
                  </motion.p>
                </div>
              </motion.div>
            </div>
          </div>
        ) : (
          // Diseño original para desktop
          <>
            <div
              className={`absolute inset-0 sm:top-[300px] top-[150px] 
              lg:top-[200px] xl:top-[300px] ${styles.paddingX} 
              max-w-7xl mx-auto flex flex-row items-start
              justify-between gap-3 hero-transition`}>
              <div className="flex flex-col justify-center items-center mt-5 ml-3">
                <div className="w-5 h-5 rounded-full bg-[#0a0a0a] sm:hidden" />
                <div className="w-1 sm:h-80 h-40 bw-gradient sm:hidden" />
              </div>

              <div>
                <h1
                  className={`${styles.heroHeadText} text-eerieBlack font-poppins uppercase`}>
                  Hi, I'm{' '}
                  <span
                    className="sm:text-battleGray sm:text-[90px] 
                    text-eerieBlack text-[50px] font-mova
                    font-extrabold uppercase">
                    Oscar
                  </span>
                </h1>
                <p className={`${styles.heroSubText} mt-2 text-eerieBlack`}>
                  UI/UX Designer crafting intuitive digital experiences <br className="sm:block hidden" />
                  with a focus on user-centered design and accessibility.
                </p>
              </div>
              <div
                className="w-screen flex flex-col items-start 
                justify-center sm:-ml-[3rem] xxs:mt-4"></div>

              <div></div>
            </div>

            <div
              className="absolute xs:bottom-10 bottom-32 w-full 
              flex justify-center items-center hero-transition">
              <a href="#about">
                <div
                  className="w-[35px] h-[64px] rounded-3xl border-4 
                border-french border-dim flex
                justify-center items-start p-2">
                  <motion.div
                    animate={{
                      y: [0, 24, 0],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      repeatType: 'loop',
                      ease: "easeInOut",
                    }}
                    className="w-3 h-3 rounded-full bg-taupe mb-1"
                  />
                </div>
              </a>
            </div>

            {/* Your image comes here. Feel free to remove image if you don't plan to have one.*/}
            <div ref={imageRef} className="absolute bottom-0 right-[-5%] z-10 h-full flex items-end overflow-hidden hero-transition">
              <motion.div
                style={{ 
                  x: imageX,
                  opacity: imageOpacity,
                  rotate: imageRotate,
                  scale: imageScale
                }}
                initial={{ x: 300, opacity: 0, rotate: 0 }}
                animate={{ x: 0, opacity: 1, rotate: 0 }}
                transition={{ duration: 1.5 }}
                className="h-full"
              >
                {profileImageLoaded && !profileImageError ? (
                  <img
                    src={oscar}
                    alt="Oscar profile"
                    className="h-full w-auto object-contain"
                  />
                ) : (
                  <div className="h-full w-[300px] bg-gray-300 flex items-center justify-center">
                    <p className="text-gray-600">Cargando imagen...</p>
                  </div>
                )}
              </motion.div>
            </div>
          </>
        )}
      </section>
    </>
  );
};

export default Hero;
