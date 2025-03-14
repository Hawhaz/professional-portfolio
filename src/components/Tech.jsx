import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import CSS3DDice from './CSS3DDice';

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

// Lista de tecnologías con sus iconos (usando las importaciones)
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

// Componente optimizado para cada tecnología
const TechItem = ({ tech, index, isVisible }) => {
  // Solo renderizar el dado si es visible
  if (!isVisible) return null;
  
  return (
    <motion.div
      key={tech.name}
      className="flex flex-col items-center justify-center"
      style={{ background: 'transparent' }}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, delay: index * 0.03 }}
    >
      <CSS3DDice 
        icon={tech.icon} 
        name={tech.name} 
        index={index}
      />
    </motion.div>
  );
};

const Tech = () => {
  // Referencia al contenedor para la detección de intersección
  const techRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  
  // Estado para controlar qué tecnologías se han cargado
  const [loadedTechs, setLoadedTechs] = useState([]);
  
  // Configurar el observador de intersección para la animación de entrada
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
          
          // Cargar tecnologías en lotes para mejor rendimiento
          const loadTechnologies = () => {
            // Cargar primero 8 tecnologías
            setLoadedTechs(technologies.slice(0, 8));
            
            // Cargar el segundo lote después de un breve retraso
            setTimeout(() => {
              setLoadedTechs(technologies.slice(0, 16));
              
              // Cargar el resto después de otro breve retraso
              setTimeout(() => {
                setLoadedTechs(technologies);
              }, 300);
            }, 300);
          };
          
          loadTechnologies();
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
    <div className="py-12 px-6 bg-transparent" ref={techRef} style={{ background: 'transparent' }}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="max-w-7xl mx-auto"
        style={{ background: 'transparent' }}
      >
        <div className="text-left mb-12">
          <h2 className="text-4xl font-bold text-white">
            MY SKILLS
          </h2>
          <h3 className="text-2xl text-gray-400 mt-2">
            Technologies
          </h3>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-8 mb-12 sm:mb-16 md:mb-20" style={{ background: 'transparent' }}>
          {/* Primeros 18 elementos (3 filas completas de 6 en xl) */}
          {technologies.slice(0, 18).map((tech, index) => (
            <TechItem
              key={tech.name}
              tech={tech}
              index={index}
              isVisible={loadedTechs.includes(tech)}
            />
          ))}
          
          {/* Últimos 2 elementos centrados */}
          <div className="hidden xl:block"></div>
          <div className="hidden xl:block"></div>
          {technologies.slice(18).map((tech, index) => (
            <TechItem
              key={tech.name}
              tech={tech}
              index={index + 18}
              isVisible={loadedTechs.includes(tech)}
            />
          ))}
          <div className="hidden xl:block"></div>
          <div className="hidden xl:block"></div>
        </div>
      </motion.div>
    </div>
  );
};

export default Tech;
