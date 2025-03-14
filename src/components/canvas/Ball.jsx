import React, { Suspense, useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import {
  Decal,
  Float,
  OrbitControls,
  Preload,
  useTexture,
} from '@react-three/drei';
import Loader from '../Loader';
import { getPerformanceConfig } from '../../utils/performance';

// Optimizado con React.memo para evitar re-renderizados innecesarios
const Ball = React.memo((props) => {
  const [decal] = useTexture([props.imgUrl]);
  const meshRef = useRef();
  const [isHovered, setIsHovered] = useState(false);
  const [performanceConfig, setPerformanceConfig] = useState(null);
  
  // Obtener la configuración de rendimiento
  useEffect(() => {
    setPerformanceConfig(getPerformanceConfig());
  }, []);
  
  // Usar useFrame para controlar la rotación solo cuando es necesario
  useFrame((state, delta) => {
    if (meshRef.current && isHovered) {
      // Reducir la velocidad de rotación en dispositivos de bajo rendimiento
      const rotationSpeed = performanceConfig?.animations?.quality === 'low' ? 0.1 : 
                           performanceConfig?.animations?.quality === 'medium' ? 0.15 : 0.25;
      
      meshRef.current.rotation.x += delta * rotationSpeed;
      meshRef.current.rotation.y += delta * rotationSpeed;
    }
  });

  // Ajustar la intensidad de la animación según la configuración de rendimiento
  const getFloatConfig = () => {
    if (!performanceConfig) return { speed: 1.75, rotationIntensity: 0.5, floatIntensity: 1 };
    
    const { animations } = performanceConfig;
    
    if (animations.quality === 'low') {
      return { speed: 1, rotationIntensity: 0.2, floatIntensity: 0.5 };
    } else if (animations.quality === 'medium') {
      return { speed: 1.5, rotationIntensity: 0.3, floatIntensity: 0.75 };
    } else {
      return { speed: 1.75, rotationIntensity: 0.5, floatIntensity: 1 };
    }
  };
  
  const floatConfig = getFloatConfig();

  return (
    <Float 
      speed={floatConfig.speed} 
      rotationIntensity={floatConfig.rotationIntensity} 
      floatIntensity={floatConfig.floatIntensity}
    >
      <ambientLight intensity={0.15} />
      <directionalLight position={[0, 0, 0.05]} intensity={0.5} />
      <mesh 
        ref={meshRef}
        castShadow 
        receiveShadow 
        scale={2.75}
        onPointerOver={() => setIsHovered(true)}
        onPointerOut={() => setIsHovered(false)}
      >
        <icosahedronGeometry args={[1, performanceConfig?.animations?.quality === 'low' ? 0 : 1]} />
        <meshStandardMaterial
          color="#3d3d3d"
          polygonOffset
          polygonOffsetFactor={-5}
          flatShading
        />
        <Decal
          position={[0, 0, 1]}
          rotation={[2 * Math.PI, 0, 6.25]}
          flatShading
          map={decal}
        />
      </mesh>
    </Float>
  );
});

const BallCanvas = ({ icon }) => {
  const [performanceConfig, setPerformanceConfig] = useState(null);
  
  // Obtener la configuración de rendimiento
  useEffect(() => {
    setPerformanceConfig(getPerformanceConfig());
  }, []);
  
  if (!performanceConfig) {
    return <Loader />;
  }
  
  return (
    <Canvas 
      frameloop={performanceConfig.three.frameloop}
      dpr={performanceConfig.three.dpr}
      gl={{ 
        preserveDrawingBuffer: true, 
        antialias: performanceConfig.three.antialias,
        powerPreference: "high-performance"
      }}
    >
      <Suspense fallback={<Loader />}>
        <OrbitControls 
          enableZoom={false} 
          enablePan={false}
          enableRotate={false}
        />
        <Ball imgUrl={icon} />
      </Suspense>
      <Preload all />
    </Canvas>
  );
};

export default BallCanvas;
