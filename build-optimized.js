/**
 * Script para construir el proyecto optimizado
 */

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

// Colores para la consola
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  dim: '\x1b[2m',
  underscore: '\x1b[4m',
  blink: '\x1b[5m',
  reverse: '\x1b[7m',
  hidden: '\x1b[8m',
  
  fg: {
    black: '\x1b[30m',
    red: '\x1b[31m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    magenta: '\x1b[35m',
    cyan: '\x1b[36m',
    white: '\x1b[37m',
    crimson: '\x1b[38m'
  },
  
  bg: {
    black: '\x1b[40m',
    red: '\x1b[41m',
    green: '\x1b[42m',
    yellow: '\x1b[43m',
    blue: '\x1b[44m',
    magenta: '\x1b[45m',
    cyan: '\x1b[46m',
    white: '\x1b[47m',
    crimson: '\x1b[48m'
  }
};

// Función para imprimir mensajes con formato
const log = {
  info: (message) => console.log(`${colors.fg.blue}${colors.bright}[INFO]${colors.reset} ${message}`),
  success: (message) => console.log(`${colors.fg.green}${colors.bright}[SUCCESS]${colors.reset} ${message}`),
  warning: (message) => console.log(`${colors.fg.yellow}${colors.bright}[WARNING]${colors.reset} ${message}`),
  error: (message) => console.log(`${colors.fg.red}${colors.bright}[ERROR]${colors.reset} ${message}`),
};

// Función para ejecutar comandos
const runCommand = (command) => {
  try {
    log.info(`Ejecutando: ${command}`);
    execSync(command, { stdio: 'inherit' });
    return true;
  } catch (error) {
    log.error(`Error al ejecutar: ${command}`);
    log.error(error.message);
    return false;
  }
};

// Función para asegurarse de que existan los directorios y archivos necesarios
const ensureRequiredFiles = () => {
  log.info('Verificando archivos necesarios...');
  
  // Asegurarse de que exista el directorio de iconos
  if (!fs.existsSync('public/icons')) {
    log.info('Creando directorio de iconos...');
    fs.mkdirSync('public/icons', { recursive: true });
  }
  
  // Lista de archivos que deben existir
  const requiredFiles = [
    'public/icons/icon-192x192.png',
    'public/icons/icon-512x512.png',
    'public/icons/apple-touch-icon.png',
    'public/manifest.json'
  ];
  
  // Verificar cada archivo
  requiredFiles.forEach(file => {
    if (!fs.existsSync(file)) {
      log.warning(`El archivo ${file} no existe. Creando un archivo vacío...`);
      
      // Si es un archivo JSON, crear un objeto vacío
      if (file.endsWith('.json')) {
        fs.writeFileSync(file, '{}');
      } else {
        // Si es una imagen, crear un archivo vacío
        fs.writeFileSync(file, '');
      }
    }
  });
  
  log.success('Todos los archivos necesarios están disponibles.');
};

// Función principal
const main = () => {
  log.info('Iniciando proceso de construcción optimizada...');
  
  // Verificar que las dependencias estén instaladas
  log.info('Verificando dependencias...');
  if (!runCommand('npm install')) {
    log.error('Error al instalar dependencias. Abortando.');
    process.exit(1);
  }
  
  // Asegurarse de que existan los archivos necesarios
  ensureRequiredFiles();
  
  // Limpiar la carpeta dist
  log.info('Limpiando carpeta dist...');
  if (fs.existsSync('dist')) {
    try {
      fs.rmSync('dist', { recursive: true });
      log.success('Carpeta dist eliminada correctamente.');
    } catch (error) {
      log.warning('No se pudo eliminar la carpeta dist. Continuando de todos modos.');
    }
  }
  
  // Construir el proyecto
  log.info('Construyendo el proyecto...');
  if (!runCommand('npm run build:optimized')) {
    log.error('Error al construir el proyecto. Abortando.');
    process.exit(1);
  }
  
  // Verificar que la carpeta dist existe
  if (!fs.existsSync('dist')) {
    log.error('La carpeta dist no existe después de la construcción. Algo salió mal.');
    process.exit(1);
  }
  
  log.success('Proyecto construido correctamente.');
  log.info('Puedes encontrar los archivos optimizados en la carpeta dist.');
  log.info('Para probar el proyecto, ejecuta: npm run preview');
};

// Ejecutar la función principal
main(); 