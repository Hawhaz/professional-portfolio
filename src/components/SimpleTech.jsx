import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

// Importar las imágenes correctamente desde assets
import html from '../assets/tech/html.png';
import css from '../assets/tech/css.png';
import javascript from '../assets/tech/javascript.png';
import typescript from '../assets/tech/typescript.png';
import reactjs from '../assets/tech/reactjs.png';
import redux from '../assets/tech/redux.png';
import tailwind from '../assets/tech/tailwind.png';
import nodejs from '../assets/tech/nodejs.png';
import git from '../assets/tech/git.png';
import figma from '../assets/tech/figma.png';
import docker from '../assets/tech/docker.png';
import nextjs from '../assets/tech/nextjs.png';
import mui from '../assets/tech/mui.png';
import framer from '../assets/tech/framer.png';
import antdesign from '../assets/tech/new/antdesign-white.svg';

// Importar logos adicionales (usando SVG en línea para simplificar)
const angularLogo = "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-plain.svg";
const vueLogo = "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-plain.svg";
const bootstrapLogo = "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-plain.svg";
const foundationLogo = "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/foundation/foundation-plain.svg";
const gsapLogo = "https://cdn.worldvectorlogo.com/logos/gsap-greensock.svg";
const threejsLogo = "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/threejs/threejs-original.svg";

// Lista de tecnologías con sus iconos
const technologies = [
  { name: 'HTML', icon: html },
  { name: 'CSS', icon: css },
  { name: 'JavaScript', icon: javascript },
  { name: 'TypeScript', icon: typescript },
  { name: 'React', icon: reactjs },
  { name: 'Angular', icon: angularLogo },
  { name: 'Vue.js', icon: vueLogo },
  { name: 'Redux', icon: redux },
  { name: 'Tailwind CSS', icon: tailwind },
  { name: 'Bootstrap', icon: bootstrapLogo },
  { name: 'Material-UI', icon: mui },
  { name: 'Foundation', icon: foundationLogo },
  { name: 'Node.js', icon: nodejs },
  { name: 'Next.js', icon: nextjs },
  { name: 'Framer Motion', icon: framer },
  { name: 'Three.js', icon: threejsLogo },
  { name: 'Git', icon: git },
  { name: 'Docker', icon: docker },
  { name: 'GSAP', icon: gsapLogo },
  { name: 'Ant Design', icon: antdesign },
];

// Componente para cada icono de tecnología
const TechIcon = ({ name, icon, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  // Verificar si es el logo de Next.js para aplicar estilos específicos
  const isNextJs = name === 'Next.js';
  // Verificar si es el logo de Ant Design
  const isAntDesign = name === 'Ant Design';
  // Verificar si es una URL externa
  const isExternalUrl = typeof icon === 'string' && (icon.startsWith('http') || icon.startsWith('https'));
  
  return (
    <motion.div
      className="relative flex flex-col items-center justify-center m-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Efecto de resplandor */}
      <motion.div
        className="absolute inset-0 rounded-full bg-white opacity-0"
        animate={{ 
          opacity: isHovered ? 0.15 : 0,
          scale: isHovered ? 1.2 : 1
        }}
        transition={{ duration: 0.3 }}
      />
      
      {/* Contenedor del icono con efecto metálico */}
      <motion.div
        className="relative z-10 w-20 h-20 flex items-center justify-center rounded-lg bg-gradient-to-b from-gray-700 to-gray-900 shadow-lg"
        whileHover={{ 
          scale: 1.15,
          boxShadow: "0 0 20px rgba(255, 255, 255, 0.2)"
        }}
        transition={{ 
          type: 'spring', 
          stiffness: 300, 
          damping: 10 
        }}
      >
        <motion.img 
          src={icon} 
          alt={name} 
          className={`w-12 h-12 object-contain ${
            isNextJs 
              ? "invert" 
              : isAntDesign
                ? "w-14 h-14 brightness-0 invert"
                : "brightness-0 invert"
          }`}
          initial={{ scale: 0.9, opacity: 0.9 }}
          animate={{ 
            scale: isHovered ? 1.1 : 1, 
            opacity: 1,
            filter: isHovered 
              ? "drop-shadow(0 0 8px rgba(255, 255, 255, 0.7))" 
              : "drop-shadow(0 0 2px rgba(255, 255, 255, 0.3))"
          }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>
    </motion.div>
  );
};

const SimpleTech = () => {
  // Referencia al contenedor para la detección de intersección
  const techRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  
  // Configurar el observador de intersección para la animación de entrada
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    
    if (techRef.current) {
      observer.observe(techRef.current);
    }
    
    return () => {
      if (techRef.current) {
        observer.disconnect();
      }
    };
  }, []);
  
  return (
    <div className="py-16 px-8" ref={techRef}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto"
      >
        <div className="text-left mb-16">
          <h2 className="text-4xl font-bold text-white">
            MY SKILLS
          </h2>
          <h3 className="text-2xl text-gray-400 mt-2">
            Technologies
          </h3>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-8">
          {/* Primeros 18 elementos (3 filas completas de 6 en xl) */}
          {technologies.slice(0, 18).map((tech, index) => (
            <TechIcon 
              key={tech.name}
              name={tech.name}
              icon={tech.icon}
              index={index}
            />
          ))}
          
          {/* Últimos 2 elementos centrados */}
          <div className="hidden xl:block col-span-1"></div>
          <div className="hidden xl:block col-span-1"></div>
          {technologies.slice(18).map((tech, index) => (
            <TechIcon 
              key={tech.name}
              name={tech.name}
              icon={tech.icon}
              index={index + 18}
            />
          ))}
          <div className="hidden xl:block col-span-1"></div>
          <div className="hidden xl:block col-span-1"></div>
        </div>
      </motion.div>
    </div>
  );
};

export default SimpleTech; 