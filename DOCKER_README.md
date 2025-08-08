# Docker Setup para Cajas Navidad

Este proyecto incluye configuración Docker para ejecutar tanto la API FastAPI como la aplicación React con TypeScript y Vite.

## Estructura de archivos Docker

```
├── docker-compose.yml          # Producción completa (API + Frontend)
├── docker-compose.dev.yml      # Desarrollo completo (API + Frontend)
├── docker-compose.react.yml    # Solo React (Producción)
├── docker-compose.react-dev.yml # Solo React (Desarrollo)
├── FastApi/
│   └── Dockerfile              # API FastAPI
├── react-app/
│   ├── Dockerfile              # Frontend producción
│   ├── Dockerfile.dev          # Frontend desarrollo
│   ├── nginx.conf              # Configuración Nginx
│   └── .dockerignore          # Archivos a ignorar
```

## Comandos Docker

### Para Producción Completa (API + Frontend)

```bash
# Construir y ejecutar todos los servicios
docker-compose up --build

# Ejecutar en segundo plano
docker-compose up -d --build

# Parar los servicios
docker-compose down
```

### Para Desarrollo Completo (API + Frontend)

```bash
# Construir y ejecutar en modo desarrollo (con hot reload)
docker-compose -f docker-compose.dev.yml up --build

# Ejecutar en segundo plano
docker-compose -f docker-compose.dev.yml up -d --build

# Parar los servicios de desarrollo
docker-compose -f docker-compose.dev.yml down
```

### Para Solo React - Producción

```bash
# Construir y ejecutar solo React en modo producción
docker-compose -f docker-compose.react.yml up --build

# Ejecutar en segundo plano
docker-compose -f docker-compose.react.yml up -d --build

# Parar el servicio
docker-compose -f docker-compose.react.yml down
```

### Para Solo React - Desarrollo

```bash
# Construir y ejecutar solo React en modo desarrollo (con hot reload)
docker-compose -f docker-compose.react-dev.yml up --build

# Ejecutar en segundo plano
docker-compose -f docker-compose.react-dev.yml up -d --build

# Parar el servicio
docker-compose -f docker-compose.react-dev.yml down
```

## Puertos

### Producción Completa
- **Frontend**: http://localhost:3000
- **API**: http://localhost:8000

### Desarrollo Completo
- **Frontend**: http://localhost:5173 (con hot reload)
- **API**: http://localhost:8000

### Solo React - Producción
- **Frontend**: http://localhost:3000

### Solo React - Desarrollo
- **Frontend**: http://localhost:5173 (con hot reload)

## Servicios

### Frontend (React + Vite + TypeScript)
- **Producción**: Utiliza un build multi-stage con Nginx para servir archivos estáticos
- **Desarrollo**: Utiliza el servidor de desarrollo de Vite con hot reload

### Backend (FastAPI)
- Ejecuta la API FastAPI con Uvicorn
- Puerto 8000 expuesto
- Hot reload habilitado

## Características

- **Multi-stage build** para optimizar el tamaño de la imagen de producción
- **Hot reload** en modo desarrollo
- **Nginx** configurado para SPAs
- **Networking** entre contenedores
- **Volúmenes** para desarrollo con cambios en tiempo real

## Comandos útiles

```bash
# Ver logs de todos los servicios (aplicación completa)
docker-compose logs -f

# Ver logs solo de React (usando el compose específico)
docker-compose -f docker-compose.react.yml logs -f
docker-compose -f docker-compose.react-dev.yml logs -f

# Ver logs de un servicio específico
docker-compose logs -f frontend

# Rebuild un servicio específico
docker-compose up --build frontend
docker-compose -f docker-compose.react.yml up --build frontend

# Ejecutar comandos dentro del contenedor de React
docker-compose exec frontend sh
docker-compose -f docker-compose.react-dev.yml exec frontend-dev sh

# Solo construir la imagen sin ejecutar
docker build -t react-app ./react-app

# Ejecutar el contenedor directamente
docker run -p 3000:80 react-app

# Limpiar todo (contenedores, redes, volúmenes)
docker-compose down -v --rmi all
docker-compose -f docker-compose.react.yml down -v --rmi all
```

## Opciones para levantar solo React

### 1. Con docker-compose (Recomendado)
```bash
# Producción
docker-compose -f docker-compose.react.yml up --build

# Desarrollo
docker-compose -f docker-compose.react-dev.yml up --build
```

### 2. Con Docker directamente
```bash
# Construir la imagen
docker build -t cajas-navidad-react ./react-app

# Ejecutar en producción
docker run -d -p 3000:80 --name react-app cajas-navidad-react

# Ejecutar en desarrollo
docker build -f ./react-app/Dockerfile.dev -t cajas-navidad-react-dev ./react-app
docker run -d -p 5173:5173 -v ${PWD}/react-app:/app --name react-app-dev cajas-navidad-react-dev
```

### 3. Usando solo servicios específicos del docker-compose completo
```bash
# Solo levantar el frontend del compose completo
docker-compose up frontend

# Solo levantar el frontend de desarrollo
docker-compose -f docker-compose.dev.yml up frontend-dev
```
