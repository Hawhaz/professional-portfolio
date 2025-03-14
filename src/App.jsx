import { BrowserRouter } from 'react-router-dom';
import { Suspense, lazy, useState, useEffect } from 'react';
import Loader from './components/Loader';

// Importar Navbar y Hero normalmente ya que son críticos para la carga inicial
import Navbar from './components/Navbar';
import Hero from './components/Hero';
// Importar Tech directamente para evitar problemas con la carga perezosa
import Tech from './components/Tech';

// Cargar el resto de componentes de forma perezosa con un tiempo de espera mínimo
const loadComponent = (importFunc) => {
  return lazy(() => 
    Promise.all([
      importFunc(),
      // Esperar al menos 300ms para evitar parpadeos
      new Promise(resolve => setTimeout(resolve, 300))
    ])
    .then(([moduleExports]) => moduleExports)
  );
};

const About = loadComponent(() => import('./components/About'));
const Projects = loadComponent(() => import('./components/Projects'));
const Experience = loadComponent(() => import('./components/Experience'));
const Contact = loadComponent(() => import('./components/Contact'));

// Componente de error para Suspense
const ErrorFallback = () => (
  <div className="flex items-center justify-center min-h-screen bg-night text-white p-4 text-center">
    <div>
      <h2 className="text-xl font-bold mb-2">Error al cargar el componente</h2>
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

const App = () => {
  const [isMobile, setIsMobile] = useState(false);
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
    }, 800);
    
    return () => {
      mediaQuery.removeEventListener('change', handleMediaQueryChange);
      clearTimeout(timer);
    };
  }, []);
  
  if (isLoading) {
    return <Loader />;
  }
  
  return (
    <BrowserRouter>
      <div className="relative z-0">
        <div>
          <Navbar />
          <Hero />
        </div>

        <Suspense fallback={<Loader />}>
          <div className="bg-about bg-cover bg-center bg-no-repeat">
            <About />
          </div>
        </Suspense>

        {/* Usamos Tech directamente sin Suspense */}
        <div className="bg-tech bg-cover bg-center bg-no-repeat pb-10">
          <Tech />
        </div>

        {/* Spacer div for mobile devices - negative margin to pull up Projects section */}
        <div className="-mt-4 md:mt-0 bg-transparent"></div>

        <Suspense fallback={<Loader />}>
          <Projects />
        </Suspense>

        <Suspense fallback={<Loader />}>
          <div
            className="bg-experience bg-cover bg-center bg-no-repeat 
              rounded-tl-[150px] rounded-br-[150px]">
            <div
              className="bg-experienceLight bg-cover bg-center 
              bg-no-repeat rounded-tl-[150px] rounded-br-[130px]">
              <Experience />
            </div>
          </div>
        </Suspense>
        
        {/* Spacer div for mobile devices between Experience and Contact */}
        <div className="h-8 md:h-16 lg:h-8 bg-transparent"></div>
        
        <Suspense fallback={<Loader />}>
          <div className="relative z-0">
            <Contact />
          </div>
        </Suspense>
      </div>
    </BrowserRouter>
  );
};

export default App;
