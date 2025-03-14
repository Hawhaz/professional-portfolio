import React, { useEffect, useState, useRef, useCallback, memo } from 'react';
import { Link } from 'react-router-dom';
import { motion, useAnimation } from 'framer-motion';
import { styles } from '../styles';
import { navLinks } from '../constants';
import { close, menu } from '../assets';

// Componente optimizado para los enlaces de navegación
const NavLink = memo(({ nav, active, onClick }) => (
  <li
    className={`${
      active === nav.title ? 'text-french' : 'text-eerieBlack'
    } hover:text-taupe text-[21px] font-medium font-mova 
      uppercase tracking-[3px] cursor-pointer nav-links`}
    onClick={() => onClick(nav.title)}>
    <a href={`#${nav.id}`}>{nav.title}</a>
  </li>
));

// Componente optimizado para los enlaces de navegación móvil
const MobileNavLink = memo(({ nav, active, onClick }) => (
  <li
    className={`${
      active === nav.title ? 'text-french' : 'text-eerieBlack'
    } text-[16px] font-medium font-mova 
      uppercase tracking-[1px] cursor-pointer py-2 border-b border-gray-200`}>
    <a 
      href={`#${nav.id}`} 
      className="mobile-nav-link"
      onClick={(e) => {
        e.preventDefault(); // Prevent default anchor behavior
        onClick(nav.title);
        
        // Find the section element and scroll to it
        const element = document.getElementById(nav.id);
        if (element) {
          // Close mobile menu first
          setTimeout(() => {
            element.scrollIntoView({ behavior: 'smooth' });
          }, 100); // Small delay to ensure menu closes first
        }
      }}>
      <span className="normal-case">{nav.title}</span>
    </a>
  </li>
));

const Navbar = () => {
  const [active, setActive] = useState('');
  const [toggle, setToggle] = useState(false);
  const [animating, setAnimating] = useState(false);
  const [position, setPosition] = useState(0); // 0 = original, 1 = moved
  const controls = useAnimation();
  const [isMobile, setIsMobile] = useState(false);
  
  // Detectar si es un dispositivo móvil para ajustar las animaciones
  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 768px)');
    setIsMobile(mediaQuery.matches);
    
    const handleMediaQueryChange = (event) => {
      setIsMobile(event.matches);
    };
    
    mediaQuery.addEventListener('change', handleMediaQueryChange);
    
    return () => {
      mediaQuery.removeEventListener('change', handleMediaQueryChange);
    };
  }, []);

  // Usar useCallback para evitar recrear funciones en cada renderizado
  const handleMouseEnter = useCallback(async () => {
    if (animating || isMobile) return; // No animar en dispositivos móviles
    
    setAnimating(true);
    
    if (position === 0) {
      // Mover a la izquierda
      await controls.start({
        x: -60,
        transition: {
          type: "spring",
          stiffness: 300,
          damping: 20,
          duration: 0.6
        }
      });
      setPosition(1);
    } else {
      // Volver a la posición original
      await controls.start({
        x: 0,
        transition: {
          type: "spring",
          stiffness: 300,
          damping: 20,
          duration: 0.6
        }
      });
      setPosition(0);
    }
    
    setAnimating(false);
  }, [animating, position, controls, isMobile]);

  // Usar useCallback para evitar recrear funciones en cada renderizado
  const handleSetActive = useCallback((title) => {
    setActive(title);
  }, []);

  // Usar useCallback para evitar recrear funciones en cada renderizado
  const handleToggle = useCallback(() => {
    setToggle(prev => !prev);
  }, []);

  // Usar useCallback para evitar recrear funciones en cada renderizado
  const handleMobileNavClick = useCallback((title) => {
    setToggle(false);
    setActive(title);
  }, []);

  // Usar useCallback para evitar recrear funciones en cada renderizado
  const handleLogoClick = useCallback(() => {
    setActive('');
    window.scrollTo(0, 0);
  }, []);

  return (
    <nav
      className={`${styles.paddingX} w-full flex items-center py-2 fixed 
      top-0 z-20 bg-flashWhite sm:opacity-[0.97] xxs:h-[12vh]`}>
      <div className="w-full flex justify-between items-center max-w-7xl mx-auto">
        <Link
          to="/"
          className="flex items-center gap-2"
          onClick={handleLogoClick}>
          <div className="flex items-center gap-2">
            <motion.img
              src="/logo.png"
              alt="logo"
              className="sm:w-[50px] sm:h-[50px] w-[45px] h-[45px] object-contain"
              onMouseEnter={handleMouseEnter}
              animate={controls}
              initial={{ x: 0 }}
              loading="eager" // Cargar la imagen del logo de forma prioritaria
            />

            <span className="text-eerieBlack font-bold text-[24px]">
              OTTY
            </span>
          </div>
        </Link>
        
        {/* Desktop navigation */}
        <ul className="list-none hidden sm:flex flex-row gap-14 mt-2">
          {navLinks.map((nav) => (
            <NavLink 
              key={nav.id} 
              nav={nav} 
              active={active} 
              onClick={handleSetActive} 
            />
          ))}
        </ul>

        {/* Mobile */}
        <div className="sm:hidden flex flex-1 w-screen justify-end items-center">
          {toggle ? (
            <>
              {/* Overlay oscuro */}
              <div 
                className="fixed inset-0 bg-black bg-opacity-50 z-10 overlay overlay-visible"
                onClick={handleToggle}
              />
              {/* Menú móvil */}
              <div
                className={`bg-flashWhite absolute 
                  top-0 right-0 w-[55%] max-w-[220px] h-screen z-20 shadow-xl menu ${
                    toggle ? 'menu-open' : 'menu-close'
                  }`}>
                <div className="flex justify-end items-center p-4 border-b border-gray-200">
                  <img
                    src={close}
                    alt="close"
                    className="w-[18px] h-[18px] object-contain cursor-pointer"
                    onClick={handleToggle}
                    loading="eager"
                  />
                </div>
                <div className="px-4 py-4">
                  <ul className="list-none flex flex-col space-y-1">
                    {navLinks.map((nav) => (
                      <MobileNavLink 
                        key={nav.id} 
                        nav={nav} 
                        active={active} 
                        onClick={handleMobileNavClick} 
                      />
                    ))}
                  </ul>
                </div>
              </div>
            </>
          ) : (
            <img
              src={menu}
              alt="menu"
              className="w-[24px] h-[24px] object-contain cursor-pointer"
              onClick={handleToggle}
              loading="eager"
            />
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
