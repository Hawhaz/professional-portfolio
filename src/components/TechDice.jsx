import React, { useRef, useState, useEffect, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { PerspectiveCamera, RoundedBox } from '@react-three/drei';
import * as THREE from 'three';
import './TechDice.css';

// Componente para el dado optimizado con bordes redondeados
const Dice = ({ icon, isHovered }) => {
  const meshRef = useRef();
  const [targetRotation, setTargetRotation] = useState([0, 0, 0]);
  
  // Crear un material simple y ligero para el dado
  const createMaterial = (iconUrl) => {
    // Crear un material base más ligero
    const material = new THREE.MeshStandardMaterial({
      color: '#333',
      metalness: 0.8,
      roughness: 0.2,
    });
    
    // Crear una textura procedural con el logo
    const canvas = document.createElement('canvas');
    canvas.width = 256; // Reducir tamaño para mejor rendimiento
    canvas.height = 256;
    const ctx = canvas.getContext('2d');
    
    // Fondo metálico
    ctx.fillStyle = '#333';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Crear un patrón simple para mostrar mientras se carga la imagen
    ctx.fillStyle = '#555';
    ctx.fillRect(64, 64, 128, 128);
    
    const texture = new THREE.CanvasTexture(canvas);
    texture.minFilter = THREE.LinearFilter; // Optimización de filtrado
    texture.generateMipmaps = false; // Desactivar mipmaps para mejor rendimiento
    material.map = texture;
    
    // Cargar la imagen real
    if (iconUrl) {
      const img = new Image();
      img.crossOrigin = "Anonymous";
      img.src = iconUrl;
      
      img.onload = () => {
        // Limpiar el canvas
        ctx.fillStyle = '#333';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Dibujar el logo en blanco
        const size = Math.min(canvas.width, canvas.height) * 0.7;
        const x = (canvas.width - size) / 2;
        const y = (canvas.height - size) / 2;
        
        ctx.globalCompositeOperation = 'lighter';
        ctx.drawImage(img, x, y, size, size);
        
        // Actualizar la textura
        texture.needsUpdate = true;
      };
      
      img.onerror = () => {
        // Dibujar un placeholder en caso de error
        ctx.fillStyle = '#333';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#777';
        ctx.font = '48px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('?', canvas.width/2, canvas.height/2);
        texture.needsUpdate = true;
      };
    }
    
    return material;
  };
  
  // Crear materiales para cada cara usando useMemo para evitar recreaciones
  const materials = useMemo(() => {
    // Crear un único material para todas las caras para mejor rendimiento
    return new THREE.MeshStandardMaterial({
      color: '#333',
      metalness: 0.8,
      roughness: 0.2,
      map: createMaterial(icon).map
    });
  }, [icon]);
  
  // Actualizar la rotación del dado cuando el mouse está encima
  useEffect(() => {
    if (isHovered) {
      // Simplificar la rotación para mejor rendimiento
      setTargetRotation([
        Math.PI / 4 * (Math.random() > 0.5 ? 1 : -1),
        Math.PI / 4 * (Math.random() > 0.5 ? 1 : -1),
        0
      ]);
    } else {
      // Volver a la posición inicial suavemente
      setTargetRotation([0, 0, 0]);
    }
  }, [isHovered]);
  
  // Animar la rotación del dado con suavidad
  useFrame(() => {
    if (meshRef.current) {
      // Aplicar interpolación para suavizar la animación
      meshRef.current.rotation.x = THREE.MathUtils.lerp(
        meshRef.current.rotation.x,
        targetRotation[0],
        0.1 // Aumentar velocidad de interpolación
      );
      meshRef.current.rotation.y = THREE.MathUtils.lerp(
        meshRef.current.rotation.y,
        targetRotation[1],
        0.1
      );
      
      // Rotación constante muy ligera
      meshRef.current.rotation.y += 0.0005;
    }
  });
  
  return (
    <group ref={meshRef} scale={[1.2, 1.2, 1.2]}>
      {/* Dado con bordes redondeados */}
      <RoundedBox args={[2, 2, 2]} radius={0.15} smoothness={4} material={materials} />
    </group>
  );
};

// Componente de escena 3D optimizado
const DiceScene = ({ icon, isHovered }) => {
  return (
    <div className="dice-scene-wrapper">
      <Canvas 
        dpr={[1, 1.5]} // Reducir DPR para mejor rendimiento
        shadows={false} // Desactivar sombras para mejor rendimiento
        gl={{ 
          antialias: true, 
          powerPreference: 'high-performance', 
          alpha: true, // Activar alpha para transparencia real
          stencil: false,
          depth: true,
          premultipliedAlpha: true,
          preserveDrawingBuffer: false
        }} // Optimizaciones de WebGL
        style={{
          background: 'transparent',
        }}
        className="tech-dice-canvas"
      >
        <color attach="background" args={['transparent']} />
        <PerspectiveCamera makeDefault position={[0, 0, 6]} fov={40} />
        
        {/* Iluminación simplificada */}
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} intensity={0.9} />
        
        <Dice icon={icon} isHovered={isHovered} />
      </Canvas>
    </div>
  );
};

// Componente principal que se exporta
const TechDice = ({ icon, name, isHovered, index = 0 }) => {
  return (
    <div 
      className="tech-dice-container relative dice-appear"
      style={{ 
        width: '112px', 
        height: '112px', 
        animationDelay: `${index * 0.05}s`,
      }}
    >
      <DiceScene icon={icon} isHovered={isHovered} />
      <div className="tech-name">{name}</div>
    </div>
  );
};

export default TechDice; 